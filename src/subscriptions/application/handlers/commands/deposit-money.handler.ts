import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DepositMoney } from '../../commands/deposit-money.command';
import { AccountTypeORM } from '../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { AccountId } from '../../../../accounts/domain/value-objects/account-id.value';
import { SubscriptionFactory } from '../../../domain/factories/subscriptions.factory';
import { Subscription } from '../../../domain/entities/subscriptions.entity';
import { SubscriptionStatus } from '../../../domain/enums/subscriptions.status.enum';
import { SubscriptionId } from '../../../domain/value-objects/subscriptions-id.value';
import { SubscriptionMapper } from '../../mappers/subscriptions.mapper';
import { SubscriptionTypeORM } from "../../../infrastructure/persistence/typeorm/entities/subscription.typeorm";
import { SubscriptionType } from "../../../domain/enums/subscriptions-type.enum";

@CommandHandler(DepositMoney)
export class DepositMoneyHandler implements ICommandHandler<DepositMoney> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(SubscriptionTypeORM)
    private subscriptionRepository: Repository<SubscriptionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: DepositMoney) {
    let subscriptionId = 0;
    const accountNumber: string = command.accountNumber.trim();
    const accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', accountNumber)
      .getOne();
    if (accountTypeORM == null) {
      return subscriptionId;
    }
    const accountFromId: AccountId = AccountId.of(accountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let subscription: Subscription = SubscriptionFactory.createFrom(
      SubscriptionType.DEPOSIT,
      SubscriptionStatus.STARTED,
      accountFromId,
      null,
      amount,
      null,
    );
    let subscriptionTypeORM: SubscriptionTypeORM =
      SubscriptionMapper.toTypeORM(subscription);
    subscriptionTypeORM = await this.subscriptionRepository.save(
      subscriptionTypeORM,
    );
    if (subscriptionTypeORM == null) {
      return subscriptionId;
    }
    subscriptionId = Number(subscriptionTypeORM.id);
    subscription.changeId(SubscriptionId.of(subscriptionId));
    subscription = this.publisher.mergeObjectContext(subscription);
    subscription.deposit();
    subscription.commit();
    return subscriptionId;
  }
}
