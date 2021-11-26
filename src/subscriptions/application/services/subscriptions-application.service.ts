import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

import { SubscriptionStatus, SubscriptionStatusLabel } from "../../domain/enums/subscriptions.status.enum";
import {
  SubscriptionMembershipEnum,
  SubscriptionMembershipLabel,
} from "../../domain/enums/subscriptions-membership.enum";
import { WithdrawMoneyValidator } from "../validators/withdraw-money.validator";
import { WithdrawRequestDto } from "../dtos/request/withdraw-request.dto";
import { WithdrawResponseDto } from "../dtos/response/withdraw-response.dto";
import { WithdrawMoney } from "../commands/withdraw-money.command";

@Injectable()
export class SubscriptionsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private withdrawValidator: WithdrawMoneyValidator,
  ) {}
  async charge(
    withdrawRequestDto: WithdrawRequestDto,
  ): Promise<Result<AppNotification, WithdrawResponseDto>> {
    const notification: AppNotification = await this.withdrawValidator.validate(
      withdrawRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const withdrawCommand: WithdrawMoney = new WithdrawMoney(
      withdrawRequestDto.accountNumber,
      withdrawRequestDto.amount,
      withdrawRequestDto.routeId,
      SubscriptionMembershipEnum.get(withdrawRequestDto.membership),
      SubscriptionStatus.STARTED,
      DateTime.utcNow()
    );
    const subscriptionId: number = await this.commandBus.execute(
      withdrawCommand,
    );
    const withdrawResponseDto: WithdrawResponseDto = new WithdrawResponseDto(
      subscriptionId,
      withdrawRequestDto.accountNumber,
      withdrawRequestDto.amount,
      withdrawRequestDto.routeId,
      SubscriptionMembershipLabel.get(withdrawRequestDto.membership),
      SubscriptionStatusLabel.get(SubscriptionStatus.STARTED),
      null
    );
    return Result.ok(withdrawResponseDto);
  }
  
}