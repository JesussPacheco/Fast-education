import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterTeacherValidator } from '../validators/register-teacher.validator';
import { RegisterTeacher } from '../commands/register-teacher.command';
import { RegisterTeacherRequest } from '../dtos/request/register-teacher-request.dto';
import { RegisterTeacherResponse } from '../dtos/response/register-teacher-response.dto';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class TeacherApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerTeacherValidator: RegisterTeacherValidator,
  ) {}

  async register(
    registerTeacherRequest: RegisterTeacherRequest,
  ): Promise<Result<AppNotification, RegisterTeacherResponse>> {
    const notification: AppNotification = await this.registerTeacherValidator.validate(registerTeacherRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerTeacher: RegisterTeacher = new RegisterTeacher(
      registerTeacherRequest.name,
      registerTeacherRequest.ruc,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const userId = await this.commandBus.execute(registerTeacher);
    const registerTeacherResponse: RegisterTeacherResponse = new RegisterTeacherResponse(
      userId,
      registerTeacherRequest.name,
      registerTeacherRequest.ruc
    );
    return Result.ok(registerTeacherResponse);
  }
}