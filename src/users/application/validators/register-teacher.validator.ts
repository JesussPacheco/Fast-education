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
    let notification: AppNotification = new AppNotification();
    const name: string = registerTeacherRequest.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    const ruc: string = registerTeacherRequest.ruc.trim();
    if (ruc.length <= 0) {
      notification.addError('ruc is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const user: UserTypeORM = await this.teacherRepository.createQueryBuilder().where("ruc = :ruc", { ruc }).getOne();
    if (user != null) {
      notification.addError('ruc is taken', null);
    }
    return notification;
  }
}