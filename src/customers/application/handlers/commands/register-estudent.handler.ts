import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudentFactory } from '../../../domain/factories/person.factory';
import { CustomerId } from '../../../domain/value-objects/customer-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { EstudentName } from '../../../../common/domain/value-objects/estudent-name.value';
import { RegisterEstudent } from '../../commands/register-estudent.command';
import { Estudent } from '../../../domain/entities/estudent.entity';
import { EstudentMapper } from '../../mappers/estudent.mapper';
import { EstudentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/estudent.typeorm';
import { AuditTrail } from '../../../../common/domain/value-objects/audit-trail.value';
import { DateTime } from '../../../../common/domain/value-objects/date-time.value';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterEstudent)
export class RegisterEstudentHandler
  implements ICommandHandler<RegisterEstudent> {
  constructor(
    @InjectRepository(EstudentTypeORM)
    private EstudentRepository: Repository<EstudentTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterEstudent) {
    let customerId: number = 0;
    const EstudentNameResult: Result<AppNotification, EstudentName> = EstudentName.create(command.firstName, command.lastName);
    if (EstudentNameResult.isFailure()) {
      return customerId;
    }
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return customerId;
    }
    const auditTrail: AuditTrail = AuditTrail.from(
      command.createdAt != null ? DateTime.fromString(command.createdAt) : null,
      command.createdBy != null ? UserId.of(command.createdBy) : null,
      command.updatedAt != null ? DateTime.fromString(command.updatedAt) : null,
      command.updatedBy != null ? UserId.of(command.updatedBy) : null
    );
    let Estudent: Estudent = EstudentFactory.createFrom(EstudentNameResult.value, dniResult.value, auditTrail);
    let EstudentTypeORM: EstudentTypeORM = EstudentMapper.toTypeORM(Estudent);
   EstudentTypeORM = await this.EstudentRepository.save(EstudentTypeORM);
    if (EstudentTypeORM == null) {
      return customerId;
    }
    customerId = Number(EstudentTypeORM.id);
    Estudent.changeId(CustomerId.of(customerId));
    Estudent = this.publisher.mergeObjectContext(Estudent);
    Estudent.register();
    Estudent.commit();
    return customerId;
  }
}
