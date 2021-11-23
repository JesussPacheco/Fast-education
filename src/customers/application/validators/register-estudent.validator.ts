import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterEstudentRequest } from '../dtos/request/register-estudent-request.dto';
import { Repository } from 'typeorm';
import { CustomerTypeORM } from '../../infrastructure/persistence/typeorm/entities/customer.typeorm';
import { EstudentTypeORM } from '../../infrastructure/persistence/typeorm/entities/estudent.typeorm';

@Injectable()
export class RegisterEstudentValidator {
  constructor(
    @InjectRepository(EstudentTypeORM)
    private estudentRepository: Repository<EstudentTypeORM>,
  ) {
  }

  public async validate(
    registerEstudentRequest: RegisterEstudentRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerEstudentRequest.firstName ? registerEstudentRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerEstudentRequest.lastName ? registerEstudentRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerEstudentRequest.dni ? registerEstudentRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const customer: CustomerTypeORM = await this.estudentRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (customer != null) {
      notification.addError('dni is taken', null);
    }
    return notification;
  }
}
