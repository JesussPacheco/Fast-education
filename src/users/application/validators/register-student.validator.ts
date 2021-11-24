import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterStudentRequest } from '../dtos/request/register-student-request.dto';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { StudentTypeORM } from '../../infrastructure/persistence/typeorm/entities/student.typeorm';

@Injectable()
export class RegisterStudentValidator {
  constructor(
    @InjectRepository(StudentTypeORM)
    private studentRepository: Repository<StudentTypeORM>,
  ) {
  }

  public async validate(
    registerStudentRequest: RegisterStudentRequest,
  ): Promise<AppNotification> {
    console.log(registerStudentRequest)
    const notification: AppNotification = new AppNotification();
    const firstName: string = registerStudentRequest.firstName ? registerStudentRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerStudentRequest.lastName ? registerStudentRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerStudentRequest.dni ? registerStudentRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const user: UserTypeORM = await this.studentRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    if (user != null) {
      notification.addError('dni is taken', null);
    }
    return notification;
  }
}