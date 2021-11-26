import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsApplicationService } from './application/services/subscriptions-application.service';
import { SubscriptionsController } from './api/subscriptions.controller';
import { WithdrawMoneyValidator } from './application/validators/withdraw-money.validator';
import { WithdrawMoneyHandler } from './application/handlers/commands/withdraw-money.handler';
import { AccountTypeORM } from '../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { CompleteSubscriptionHandler } from './application/handlers/commands/complete-subscriptions.handler';
import { SubscriptionTypeORM } from './infrastructure/persistence/typeorm/entities/subscription.typeorm';

export const CommandHandlers = [
  WithdrawMoneyHandler,
  CompleteSubscriptionHandler,
];
export const EventHandlers = [];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([SubscriptionTypeORM, AccountTypeORM]),
  ],
  controllers: [SubscriptionsController],
  providers: [
    SubscriptionsApplicationService,
    WithdrawMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class SubscriptionsModule {}
