import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { TransferMoney } from '../../commands/transfer-money.command';
import { AccountId } from '../../../../accounts/domain/value-objects/account-id.value';
import { SubscriptionFactory } from '../../../domain/factories/subscriptions.factory';
import { SubscriptionStatus } from '../../../domain/enums/subscriptions.status.enum';
import { Subscription } from '../../../domain/entities/subscriptions.entity';
import { SubscriptionId } from '../../../domain/value-objects/subscriptions-id.value';
import { SubscriptionMapper } from '../../mappers/subscriptions.mapper';
import { SubscriptionType } from '../../../domain/enums/subscriptions-type.enum';
import { SubscriptionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/subscription.typeorm';

@CommandHandler(TransferMoney)
export class TransferMoneyHandler implements ICommandHandler<TransferMoney> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(SubscriptionTypeORM)
    private subscriptionRepository: Repository<SubscriptionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: TransferMoney) {
    let subscriptionId = 0;
    const fromAccountNumber: string = command.fromAccountNumber.trim();
    const fromAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', fromAccountNumber)
      .getOne();
    if (fromAccountTypeORM == null) {
      return subscriptionId;
    }
    const toAccountNumber: string = command.toAccountNumber.trim();
    const toAccountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', toAccountNumber)
      .getOne();
    if (toAccountTypeORM == null) {
      return subscriptionId;
    }
    const accountIdFrom: AccountId = AccountId.of(fromAccountTypeORM.id);
    const accountIdTo: AccountId = AccountId.of(toAccountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let subscription: Subscription = SubscriptionFactory.createFrom(
      SubscriptionType.TRANSFER,
      SubscriptionStatus.STARTED,
      accountIdFrom,
      accountIdTo,
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
    subscription.transfer();
    subscription.commit();
    return subscriptionId;
  }
}
