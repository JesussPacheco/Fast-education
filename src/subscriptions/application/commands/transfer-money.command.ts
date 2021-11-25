import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SubscriptionStatus } from "../../domain/enums/subscriptions.status.enum";

export class TransferMoney {
  constructor(
    public fromAccountNumber: string,
    public toAccountNumber: string,
    public amount: number,
    public status: SubscriptionStatus,
    public createdAt: DateTime
  ) {}
}