import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
import { DepositMoneyValidator } from '../validators/deposit-money.validator';
import { TransferMoneyValidator } from '../validators/transfer-money.validator';
import { WithdrawMoneyValidator } from '../validators/withdraw-money.validator';
import { DepositRequestDto } from '../dtos/request/deposit-request.dto';
import { DepositMoney } from '../commands/deposit-money.command';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { DepositResponseDto } from '../dtos/response/deposit-response.dto';
import { WithdrawRequestDto } from '../dtos/request/withdraw-request.dto';
import { WithdrawMoney } from '../commands/withdraw-money.command';
import { WithdrawResponseDto } from '../dtos/response/withdraw-response.dto';
import { TransferRequestDto } from '../dtos/request/transfer-request.dto';
import { TransferMoney } from '../commands/transfer-money.command';
import { TransferResponseDto } from '../dtos/response/transfer-response.dto';
import { SubscriptionStatus, SubscriptionStatusLabel } from "../../domain/enums/subscriptions.status.enum";
import { SubscriptionType } from '../../domain/enums/subscriptions-type.enum';

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
      withdrawRequestDto.membership,
      SubscriptionStatusLabel.get(SubscriptionStatus.STARTED),
      null
    );
    return Result.ok(withdrawResponseDto);
  }
  
}