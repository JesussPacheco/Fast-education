import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterEstudentRequest } from '../dtos/request/register-estudent-request.dto';
import { RegisterEstudentResponse } from '../dtos/response/register-estudent-response.dto';
import { RegisterEstudentValidator } from '../validators/register-estudent.validator';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterEstudent } from '../commands/register-estudent.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppSettings } from '../../../common/application/app-settings';

@Injectable()
export class EstudentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerEstudentValidator: RegisterEstudentValidator,
  ) {}

  async register(
    registerEstudentRequest: RegisterEstudentRequest,
  ): Promise<Result<AppNotification, RegisterEstudentResponse>> {
    const notification: AppNotification = await this.registerEstudentValidator.validate(registerEstudentRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerEstudent: RegisterEstudent = new RegisterEstudent(
      registerEstudentRequest.firstName,
      registerEstudentRequest.lastName,
      registerEstudentRequest.dni,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const customerId: number = await this.commandBus.execute(registerEstudent);
    const registerResponse: RegisterEstudentResponse = new RegisterEstudentResponse(
      customerId,
      registerEstudentRequest.firstName,
      registerEstudentRequest.lastName,
      registerEstudentRequest.dni,
    );
    return Result.ok(registerResponse);
  }
}
