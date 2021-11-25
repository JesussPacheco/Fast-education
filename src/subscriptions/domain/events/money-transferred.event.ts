import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SubscriptionStatus } from '../enums/subscriptions.status.enum';

export class MoneyTransferred {
  constructor(
    public readonly subscriptionId: number,
    public accountIdFrom: number,
    public accountIdTo: number,
    public amount: number,
    public status: SubscriptionStatus,
    public createdAt: DateTime
  ) {
  }
}