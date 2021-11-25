import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositMoneyHandler } from './application/handlers/commands/deposit-money.handler';
import { SubscriptionsApplicationService } from './application/services/subscriptions-application.service';
import { SubscriptionsController } from './api/subscriptions.controller';
import { DepositMoneyValidator } from './application/validators/deposit-money.validator';
import { WithdrawMoneyValidator } from './application/validators/withdraw-money.validator';
import { TransferMoneyValidator } from './application/validators/transfer-money.validator';
import { WithdrawMoneyHandler } from './application/handlers/commands/withdraw-money.handler';
import { TransferMoneyHandler } from './application/handlers/commands/transfer-money.handler';
import { AccountTypeORM } from '../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
import { CompleteSubscriptionHandler } from './application/handlers/commands/complete-subscriptions.handler';
import { SubscriptionTypeORM } from "./infrastructure/persistence/typeorm/entities/subscription.typeorm";

export const CommandHandlers = [
  DepositMoneyHandler,
  WithdrawMoneyHandler,
  TransferMoneyHandler,
  CompleteSubscriptionHandler,
];
export const EventHandlers = [MoneyTransferredHandler];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SubscriptionTypeORM, AccountTypeORM]),
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsApplicationService,
    DepositMoneyValidator,
    WithdrawMoneyValidator,
    TransferMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class SubscriptionsModule {}
