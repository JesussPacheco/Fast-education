import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DepositMoneyValidator } from '../validators/deposit-money.validator';
import { TransferMoneyValidator } from '../validators/transfer-money.validator';
import { WithdrawMoneyValidator } from '../validators/withdraw-money.validator';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { WithdrawRequestDto } from '../dtos/request/withdraw-request.dto';
import { WithdrawMoney } from '../commands/withdraw-money.command';
import { WithdrawResponseDto } from '../dtos/response/withdraw-response.dto';
import { SubscriptionStatus, SubscriptionStatusLabel } from "../../domain/enums/subscriptions.status.enum";
import { SubscriptionType } from '../../domain/enums/subscriptions-type.enum';
import {
  SubscriptionMembershipEnum,
  SubscriptionMembershipLabel,
} from "../../domain/enums/subscriptions-membership.enum";

@Injectable()
export class SubscriptionsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private depositValidator: DepositMoneyValidator,
    private withdrawValidator: WithdrawMoneyValidator,
    private transferValidator: TransferMoneyValidator
  ) {}
  async withdraw(
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
      SubscriptionType.WITHDRAW,
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