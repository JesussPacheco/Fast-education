import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';

import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { MoneyDeposited } from '../events/money-deposited.event';
import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';
import { SubscriptionStatus } from '../enums/subscriptions.status.enum';
import { SubscriptionId } from '../value-objects/subscriptions-id.value';
import { SubscriptionType } from '../enums/subscriptions-type.enum';
import { RouteId } from '../../../routes/domain/value-objects/route-id.value';
import { SubscriptionsMembership } from '../enums/subscriptions-membership.enum';
import { Route } from "../../../routes/domain/entities/routes.entity";

export class Subscription extends AggregateRoot {
  private id: SubscriptionId;
  private readonly type: SubscriptionType;
  private readonly status: SubscriptionStatus;
  private readonly accountFrom: AccountId;
  private readonly amount: Money;
  private readonly routeId: RouteId;
  private readonly membership: SubscriptionsMembership;
  private readonly auditTrail: AuditTrail;
  public constructor(
    type: SubscriptionType,
    status: SubscriptionStatus,
    accountFrom: AccountId,
    amount: Money,
    routeId: RouteId,
    membership: SubscriptionsMembership,
    auditTrail: AuditTrail,
  ) {
    super();
    this.type = type;
    this.status = status;
    this.accountFrom = accountFrom;
    this.amount = amount;
    this.routeId = routeId;
    this.membership = membership;
    this.auditTrail = auditTrail;
  }

  public deposit() {
    const event = new MoneyDeposited(
      this.id.getValue(),
      this.accountFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  public withdraw() {
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

  public getType(): SubscriptionType {
    return this.type;
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
