import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterCompany } from 'src/customers/application/commands/register-teacher.command';
import { Repository } from 'typeorm';
import { CustomerId } from '../../../domain/value-objects/customer-id.value';
import { Ruc } from '../../../domain/value-objects/ruc.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { TeacherMapper } from '../../mappers/teacher.mapper';
import { TeacherName } from '../../../../common/domain/value-objects/teacher-name.value';
import { TeacherFactory } from '../../../domain/factories/teacher.factory';
import { Teacher } from '../../../domain/entities/teacher.entity';
import { TeacherTypeORM } from '../../../infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterTeacher)
export class RegisterTeacherHandler
  implements ICommandHandler<RegisterTeacher> {
  constructor(
    @InjectRepository(TeacherTypeORM)
    private TeacherRepository: Repository<TeacherTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterTeacher) {
    let customerId: number = 0;
    const TeacherNameResult: Result<AppNotification, TeacherName> = TeacherName.create(command.name);
    if (TeacherNameResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let Teacher: Teacher = TeacherFactory.createFrom(TeacherNameResult.value, rucResult.value, auditTrail);
    let TeacherTypeORM: TeacherTypeORM = TeacherMapper.toTypeORM(Teacher);
    TeacherTypeORM = await this.TeacherRepository.save(TeacherTypeORM);
    if (TeacherTypeORM == null) {
      return customerId;
    }
    customerId = Number(TeacherTypeORM.id);
    Teacher.changeId(CustomerId.of(customerId));
    Teacher = this.publisher.mergeObjectContext(Teacher);
    Teacher.register();
    Teacher.commit();
    return customerId;
  }
}
