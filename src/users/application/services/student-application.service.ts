import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterStudentRequest } from '../dtos/request/register-student-request.dto';
import { RegisterStudentResponse } from '../dtos/response/register-student-response.dto';
import { RegisterStudentValidator } from '../validators/register-student.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterStudent } from '../commands/register-student.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class StudentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerStudentValidator: RegisterStudentValidator,
  ) {}

  async register(
    registerStudentRequest: RegisterStudentRequest,
  ): Promise<Result<AppNotification, RegisterStudentResponse>> {
    const notification: AppNotification = await this.registerStudentValidator.validate(registerStudentRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerStudent: RegisterStudent = new RegisterStudent(
      registerStudentRequest.firstName,
      registerStudentRequest.lastName,
      registerStudentRequest.dni,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const userId: number = await this.commandBus.execute(registerStudent);
    const registerResponse: RegisterStudentResponse = new RegisterStudentResponse(
      userId,
      registerStudentRequest.firstName,
      registerStudentRequest.lastName,
      registerStudentRequest.dni,
    );
    return Result.ok(registerResponse);
  }
}