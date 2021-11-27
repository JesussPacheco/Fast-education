import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FeedbackApplicationService } from '../application/services/feedback.application.service';
import { RegisterFeedbackRequestDto } from '../application/dtos/request/register.feedback.request.dto';
import { RegisterFeedbackResponseDto } from '../application/dtos/response/register.feedback.response.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetFeedbacksQuery } from '../application/queris/get.feedbacks.query';
import { GetFeedbackByIdQuery } from '../application/queris/get.feedback.by.id.query';

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

  @Get('/:id')
  async getFeedbacksById(@Param('id') feedbackId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const feedbacks = await this.queryBus.execute(new GetFeedbackByIdQuery(feedbackId));
      return ApiController.ok(response, feedbacks);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
