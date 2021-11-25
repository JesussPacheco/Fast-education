import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentFactory } from '../../../domain/factories/student.factory';
import { UserId } from '../../../domain/value-objects/user-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';

import { RegisterStudent } from '../../commands/register-student.command';
import { Student } from '../../../domain/entities/student.entity';
import { StudentMapper } from '../../mappers/student.mapper';
import { StudentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/student.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { StudentName } from "../../../../common/domain/value-objects/student-name.value";

@CommandHandler(RegisterStudent)
export class RegisterStudentHandler
  implements ICommandHandler<RegisterStudent> {
  constructor(
    @InjectRepository(StudentTypeORM)
    private studentRepository: Repository<StudentTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterStudent) {
    let userId: number = 0;
    const studentNameResult: Result<AppNotification, StudentName> = StudentName.create(command.firstName, command.lastName);
    if (studentNameResult.isFailure()) {
      return userId;
    }
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return userId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let student: Student = StudentFactory.createFrom(
      studentNameResult.value,
      dniResult.value,
      auditTrail,
    );
    console.log(student);
    let studentTypeORM: StudentTypeORM = StudentMapper.toTypeORM(student);
    studentTypeORM = await this.studentRepository.save(studentTypeORM);
    if (studentTypeORM == null) {
      return userId;
    }
    userId = Number(studentTypeORM.id);
    student.changeId(UserId.of(userId));
    student = this.publisher.mergeObjectContext(student);
    student.register();
    student.commit();
    return userId;
  }
}