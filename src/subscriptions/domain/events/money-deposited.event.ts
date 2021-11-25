import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SubscriptionStatus } from "../enums/subscriptions.status.enum";

export class MoneyDeposited {
  constructor(
    public readonly subscriptionId: number,
    public readonly accountIdFrom: number,
    public readonly amount: number,
    public readonly status: SubscriptionStatus,
    public readonly createdAt: DateTime
  ) {
  }
}