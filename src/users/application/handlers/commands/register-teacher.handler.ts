import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterTeacher } from 'src/users/application/commands/register-teacher.command';
import { Repository } from 'typeorm';
import { UserId } from '../../../domain/value-objects/user-id.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { TeacherMapper } from '../../mappers/teacher.mapper';
import { TeacherFactory } from '../../../domain/factories/teacher.factory';
import { Teacher } from '../../../domain/entities/teacher.entity';
import { TeacherTypeORM } from '../../../infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { TeacherName } from '../../../../common/domain/value-objects/teacher-name.value';
import { Speciality } from '../../../domain/value-objects/speciality.value';

@CommandHandler(RegisterTeacher)
export class RegisterTeacherHandler
  implements ICommandHandler<RegisterTeacher>
{
  constructor(
    @InjectRepository(TeacherTypeORM)
    private teacherRepository: Repository<TeacherTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterTeacher) {
    let userId = 0;
    const teacherNameResult: Result<AppNotification, TeacherName> =
      TeacherName.create(command.name);
    if (teacherNameResult.isFailure()) {
      return userId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null,
    );
    const specialityResult: Speciality = Speciality.create(command.speciality);
    let teacher: Teacher = TeacherFactory.createFrom(
      teacherNameResult.value,
      auditTrail,
      specialityResult
    );
    let teacherTypeORM: TeacherTypeORM = TeacherMapper.toTypeORM(teacher);
    teacherTypeORM = await this.teacherRepository.save(teacherTypeORM);
    if (teacherTypeORM == null) {
      return userId;
    }
    userId = Number(teacherTypeORM.id);
    teacher.changeId(UserId.of(userId));
    teacher = this.publisher.mergeObjectContext(teacher);
    teacher.register();
    teacher.commit();
    return userId;
  }
}
