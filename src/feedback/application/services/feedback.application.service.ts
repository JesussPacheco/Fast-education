import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterFeedbackValidator } from '../validators/register.route.validator';
import { RegisterFeedbackResponseDto } from '../dtos/response/register.feedback.response.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterFeedbackCommand } from '../commands/register.feedback.command';
import { RegisterFeedbackRequestDto } from '../dtos/request/register.feedback.request.dto';

@Injectable()
export class FeedbackApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerFeedbackValidator: RegisterFeedbackValidator,
  ) {}
  async register(
    registerFeedbackRequestDTO: RegisterFeedbackRequestDto,
  ): Promise<Result<AppNotification, RegisterFeedbackResponseDto>> {
    console.log('registerFeedbackRequestDTO');
    console.log(registerFeedbackRequestDTO);
    const notification: AppNotification =
      await this.registerFeedbackValidator.validate(registerFeedbackRequestDTO);
    console.log('pasa la ´prueba?');

    if (notification.hasErrors()) {
      console.log('entra has erros');
      return Result.error(notification);
    }

    const registerFeedbackCommand: RegisterFeedbackCommand =
      new RegisterFeedbackCommand(
        registerFeedbackRequestDTO.name,
        registerFeedbackRequestDTO.teacherId,
        registerFeedbackRequestDTO.studentId,
        registerFeedbackRequestDTO.routerId,
      );
    const feedbackId: number = await this.commandBus.execute(
      registerFeedbackCommand,
    );
    console.log('El id generado');
    console.log(registerFeedbackCommand);
    const registerFeedbackResponseDto: RegisterFeedbackResponseDto =
      new RegisterFeedbackResponseDto(
        feedbackId,
        registerFeedbackRequestDTO.name,
        registerFeedbackRequestDTO.teacherId,
        registerFeedbackRequestDTO.studentId,
        registerFeedbackRequestDTO.routerId,
      );
    return Result.ok(registerFeedbackResponseDto);
  }
}
