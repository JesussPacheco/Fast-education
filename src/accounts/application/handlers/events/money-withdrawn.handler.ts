import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/account.typeorm';
import { Repository } from 'typeorm';
import { AccountMapper } from '../../mappers/account.mapper';
import { Account } from '../../../domain/entities/account.entity';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { AccountNumber } from '../../../domain/value-objects/account-number.value';
import { AccountFactory } from '../../../domain/factories/account.factory';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';

import { AccountId } from '../../../domain/value-objects/account-id.value';
import { MoneyWithdrawn } from '../../../../subscriptions/domain/events/money-withdrawn.event';
import { UserId } from '../../../../users/domain/value-objects/user-id.value';
import { CompleteSubscription } from "../../../../subscriptions/application/commands/complete-subscriptions.command";

@EventsHandler(MoneyWithdrawn)
export class MoneyWithdrawnHandler implements IEventHandler<MoneyWithdrawn> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private commandBus: CommandBus
  ) {}

  async handle(event: MoneyWithdrawn) {
    let accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.accountIdFrom))
      .getOne();
    if (accountTypeORM == null) {
      console.log('MoneyWithdrawn accountTypeORM not found');
      return;
    }
    const accountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(accountTypeORM.number.value);
    if (accountNumberResult.isFailure()) {
      return;
    }
    const accountAmount: Money = Money.create(accountTypeORM.balance.balance, accountTypeORM.balance.currency);
    let account: Account = AccountFactory.withId(AccountId.of(accountTypeORM.id), accountNumberResult.value, accountAmount, UserId.of(accountTypeORM.userId.value), null);
    const withdrawAmount: Money = Money.create(event.amount, Currency.SOLES);
    const depositResult: Result<AppNotification, Account> = account.withdraw(withdrawAmount);
    if (depositResult.isFailure()) {
      console.log('MoneyWithdrawn error');
      return;
    }
    accountTypeORM = AccountMapper.toTypeORM(account);
    accountTypeORM = await this.accountRepository.save(accountTypeORM);
    if (accountTypeORM == null) {
      console.log('MoneyWithdrawn error');
      return;
    }
    const completeSubscription: CompleteSubscription = new CompleteSubscription(event.subscriptionId);
    await this.commandBus.execute(completeSubscription);
  }
}