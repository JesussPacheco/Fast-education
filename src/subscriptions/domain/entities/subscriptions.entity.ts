import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';

import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { SubscriptionStatus } from '../enums/subscriptions.status.enum';
import { SubscriptionId } from '../value-objects/subscriptions-id.value';
import { RouteId } from '../../../routes/domain/value-objects/route-id.value';
import { SubscriptionsMembership } from '../enums/subscriptions-membership.enum';

export class Subscription extends AggregateRoot {
  private id: SubscriptionId;
  private readonly status: SubscriptionStatus;
  private readonly accountFrom: AccountId;
  private readonly amount: Money;
  private readonly routeId: RouteId;
  private readonly membership: SubscriptionsMembership;
  private readonly auditTrail: AuditTrail;
  public constructor(
    status: SubscriptionStatus,
    accountFrom: AccountId,
    amount: Money,
    routeId: RouteId,
    membership: SubscriptionsMembership,
    auditTrail: AuditTrail,
  ) {
    super();
    this.status = status;
    this.accountFrom = accountFrom;
    this.amount = amount;
    this.routeId = routeId;
    this.membership = membership;
    this.auditTrail = auditTrail;
  }


  public charge() {
    const event = new MoneyWithdrawn(
      this.id.getValue(),
      this.accountFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }


  public getId(): SubscriptionId {
    return this.id;
  }



  public getStatus(): SubscriptionStatus {
    return this.status;
  }
  public getRouteId(): RouteId {
    return this.routeId
  }
  public getMembership(): SubscriptionsMembership {
    return this.membership
 }
  public getAccountFrom(): AccountId {
    return this.accountFrom;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: SubscriptionId) {
    this.id = id;
  }
}
