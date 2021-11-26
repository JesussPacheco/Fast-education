import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { SubscriptionsApplicationService } from '../application/services/subscriptions-application.service';
import { WithdrawResponseDto } from '../application/dtos/response/withdraw-response.dto';
import { WithdrawRequestDto } from '../application/dtos/request/withdraw-request.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsApplicationService: SubscriptionsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('/charge')
  async charge(
    @Body() withdrawRequestDto: WithdrawRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, WithdrawResponseDto> =
        await this.subscriptionsApplicationService.charge(withdrawRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
