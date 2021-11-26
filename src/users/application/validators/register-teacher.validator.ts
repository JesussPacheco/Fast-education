import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { Repository } from 'typeorm';
import { UserTypeORM } from '../../infrastructure/persistence/typeorm/entities/user.typeorm';
import { TeacherTypeORM } from '../../infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { RegisterTeacherRequest } from '../dtos/request/register-teacher-request.dto';

@Injectable()
export class RegisterTeacherValidator {
  constructor(
    @InjectRepository(TeacherTypeORM)
    private teacherRepository: Repository<TeacherTypeORM>,
  ) {
  }

  public async validate(
    registerTeacherRequest: RegisterTeacherRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const name: string = registerTeacherRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}