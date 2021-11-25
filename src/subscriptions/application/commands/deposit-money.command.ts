import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SubscriptionStatus } from "../../domain/enums/subscriptions.status.enum";

export class DepositMoney {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: SubscriptionStatus,
    public readonly createdAt: DateTime
  ) {}
}