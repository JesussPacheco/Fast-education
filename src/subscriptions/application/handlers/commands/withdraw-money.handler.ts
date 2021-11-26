import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountTypeORM } from "../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { Currency } from "../../../../common/domain/enums/currency.enum";
import { WithdrawMoney } from "../../commands/withdraw-money.command";
import { AccountId } from "../../../../accounts/domain/value-objects/account-id.value";
import { Subscription } from "../../../domain/entities/subscriptions.entity";
import { SubscriptionFactory } from "../../../domain/factories/subscriptions.factory";
import { SubscriptionStatus } from "../../../domain/enums/subscriptions.status.enum";
import { SubscriptionTypeORM } from "../../../infrastructure/persistence/typeorm/entities/subscription.typeorm";
import { SubscriptionMapper } from "../../mappers/subscriptions.mapper";
import { SubscriptionId } from "../../../domain/value-objects/subscriptions-id.value";
import { RouteId } from "../../../../routes/domain/value-objects/route-id.value";

@CommandHandler(WithdrawMoney)
export class WithdrawMoneyHandler implements ICommandHandler<WithdrawMoney> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(SubscriptionTypeORM)
    private subscriptionRepository: Repository<SubscriptionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: WithdrawMoney) {
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
    const accountFrom: AccountId = AccountId.of(accountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    const routeId: RouteId = RouteId.create(command.routeId);
    let subscription: Subscription = SubscriptionFactory.createFrom(
      SubscriptionStatus.STARTED,
      accountFrom,
      amount,
      routeId,
      command.membership,
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
    subscription.withdraw();
    subscription.commit();
    return subscriptionId;
  }
}
