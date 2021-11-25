
import { AccountIdFromTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';
import { Subscription } from '../../domain/entities/subscriptions.entity';
import { SubscriptionTypeORM } from '../../infrastructure/persistence/typeorm/entities/subscription.typeorm';

export class SubscriptionMapper {
  public static toTypeORM(subscription: Subscription): SubscriptionTypeORM {
    const subscriptionTypeORM: SubscriptionTypeORM = new SubscriptionTypeORM();
    subscriptionTypeORM.type = subscription.getType();
    subscriptionTypeORM.status = subscription.getStatus();
    subscriptionTypeORM.accountIdFrom = AccountIdFromTypeORM.from(subscription.getAccountFrom().getValue());
    subscriptionTypeORM.accountIdTo = subscription.getAccountTo() != null ? AccountIdFromTypeORM.from(subscription.getAccountTo().getValue()) : null;
    subscriptionTypeORM.amount = AmountTypeORM.from(subscription.getAmount().getAmount(), subscription.getAmount().getCurrency());
    return subscriptionTypeORM;
  }
}