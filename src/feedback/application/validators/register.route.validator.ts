import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { Repository } from 'typeorm';
import { RegisterFeedbackRequestDto } from '../dtos/request/register.feedback.request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class RegisterFeedbackValidator {
  constructor(
    @InjectRepository(FeedbackTypeorm)
    private feedbackRepository: Repository<FeedbackTypeorm>,
  ) {}

  public async validate(
    registerFeedbackRequestDto: RegisterFeedbackRequestDto,
  ): Promise<AppNotification> {
    console.log(RegisterFeedbackRequestDto);
    console.log('failed in validate');
    const notification: AppNotification = new AppNotification();
    const name: string = registerFeedbackRequestDto.name
      ? registerFeedbackRequestDto.name.trim()
      : ' ';
    if (name.length <= 0) {
      notification.addError('Student name is required', null);
    }
    return notification;
  }
}
