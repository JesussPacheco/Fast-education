import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { SubscriptionStatus } from '../../domain/enums/subscriptions.status.enum';

import { SubscriptionsMembership } from '../../domain/enums/subscriptions-membership.enum';

export class WithdrawMoney {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly routeId: number,
    public readonly membership: SubscriptionsMembership,
    public readonly status: SubscriptionStatus,
    public readonly createdAt: DateTime
  ) {}
}