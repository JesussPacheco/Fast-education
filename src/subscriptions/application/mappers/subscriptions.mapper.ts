
import { AccountIdFromTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';
import { Subscription } from '../../domain/entities/subscriptions.entity';
import { SubscriptionTypeORM } from '../../infrastructure/persistence/typeorm/entities/subscription.typeorm';
import { RouteIdTypeORM } from "../../../routes/infrastructure/persistence/typeorm/entities/route.id.typeorm";

export class SubscriptionMapper {
  public static toTypeORM(subscription: Subscription): SubscriptionTypeORM {
    const subscriptionTypeORM: SubscriptionTypeORM = new SubscriptionTypeORM();
    subscriptionTypeORM.status = subscription.getStatus();
    subscriptionTypeORM.accountIdFrom = AccountIdFromTypeORM.from(subscription.getAccountFrom().getValue());
    subscriptionTypeORM.amount = AmountTypeORM.from(subscription.getAmount().getAmount(), subscription.getAmount().getCurrency());
    subscriptionTypeORM.routeId= RouteIdTypeORM.from(subscription.getRouteId().getValue());
    subscriptionTypeORM.subscriptionsMembership = subscription.getMembership();
    return subscriptionTypeORM;
  }
}