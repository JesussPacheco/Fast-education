import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';

import { Money } from '../../../common/domain/value-objects/money.value';
import { SubscriptionStatus } from "../enums/subscriptions.status.enum";
import { SubscriptionType } from "../enums/subscriptions-type.enum";
import { Subscription } from "../entities/subscriptions.entity";



export class SubscriptionFactory {
  public static createFrom(
    type: SubscriptionType, status: SubscriptionStatus, accountIdFrom: AccountId, accountIdTo: AccountId, amount: Money, auditTrail: AuditTrail): Subscription {
    return new Subscription(type, status, accountIdFrom, accountIdTo, amount, auditTrail);
  }
}