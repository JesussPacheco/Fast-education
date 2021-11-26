import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';

import { Money } from '../../../common/domain/value-objects/money.value';
import { SubscriptionStatus } from '../enums/subscriptions.status.enum';
import { Subscription } from '../entities/subscriptions.entity';
import { RouteId } from '../../../routes/domain/value-objects/route-id.value';
import { SubscriptionsMembership } from '../enums/subscriptions-membership.enum';

export class SubscriptionFactory {
  public static createFrom(
    status: SubscriptionStatus,
    accountIdFrom: AccountId,
    amount: Money,
    routeId: RouteId,
    membership: SubscriptionsMembership,
    auditTrail: AuditTrail,
  ): Subscription {
    return new Subscription(
      status,
      accountIdFrom,
      amount,
      routeId,
      membership,
      auditTrail,
    );
  }
}
