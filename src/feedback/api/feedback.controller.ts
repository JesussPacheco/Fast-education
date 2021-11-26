import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { FeedbackApplicationService } from '../application/services/feedback.application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterFeedbackRequestDto } from '../application/dtos/request/register.feedback.request.dto';
import { RegisterFeedbackResponseDto } from '../application/dtos/response/register.feedback.response.dto';
import { AppNotification } from '../../common/application/app.notification';
import { Result } from 'typescript-result';
import { ApiController } from '../../common/api/api.controller';
import { GetFeedbacksQuery } from '../application/queris/get.feedbacks.query';

@Controller('Feedbacks')
export class FeedbackController {
  constructor(
    private readonly feedbackApplicationService: FeedbackApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async register(
    @Body() registerFeedbackRequestDto: RegisterFeedbackRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      //console.log(registerFeedbackRequestDto);
      const result: Result<AppNotification, RegisterFeedbackResponseDto> =
        await this.feedbackApplicationService.register(
          registerFeedbackRequestDto,
        );
      console.log("desde POST controlle");
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.created(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getFeedbacks(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const feedbacks = await this.queryBus.execute(new GetFeedbacksQuery());
      return ApiController.ok(response, feedbacks);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
