import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { SubscriptionsApplicationService } from '../application/services/subscriptions-application.service';
import { DepositRequestDto } from '../application/dtos/request/deposit-request.dto';
import { DepositResponseDto } from '../application/dtos/response/deposit-response.dto';
import { WithdrawRequestDto } from '../application/dtos/request/withdraw-request.dto';
import { TransferRequestDto } from '../application/dtos/request/transfer-request.dto';
import { TransferResponseDto } from '../application/dtos/response/transfer-response.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private readonly subscriptionsApplicationService: SubscriptionsApplicationService,
    private readonly queryBus: QueryBus
  ) {
  }

  @Post('/withdraw')
  async withdraw(
    @Body() withdrawRequestDto: WithdrawRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, DepositResponseDto> = await this.subscriptionsApplicationService.withdraw(withdrawRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}