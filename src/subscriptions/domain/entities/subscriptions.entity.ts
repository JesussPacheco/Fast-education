import { Money } from '../../../common/domain/value-objects/money.value';
import { AggregateRoot } from '@nestjs/cqrs';

import { AccountId } from '../../../accounts/domain/value-objects/account-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';

import { MoneyDeposited } from '../events/money-deposited.event';
import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';
import { SubscriptionStatus } from "../enums/subscriptions.status.enum";
import { SubscriptionId } from "../value-objects/subscriptions-id.value";
import { SubscriptionType } from "../enums/subscriptions-type.enum";

export class Subscription extends AggregateRoot {
  private id: SubscriptionId;
  private readonly type: SubscriptionType;
  private readonly status: SubscriptionStatus;
  private readonly accountFrom: AccountId;
  private readonly accountTo: AccountId;
  private readonly amount: Money;
  private readonly auditTrail: AuditTrail;

  public constructor(type: SubscriptionType, status: SubscriptionStatus, accountFrom: AccountId, accountTo: AccountId, amount: Money, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.status = status;
    this.accountFrom = accountFrom;
    this.accountTo = accountTo;
    this.amount = amount;
    this.auditTrail = auditTrail;
  }

  public deposit() {
    const event = new MoneyDeposited(this.id.getValue(), this.accountFrom.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public withdraw() {
    const event = new MoneyWithdrawn(this.id.getValue(), this.accountFrom.getValue(), this.amount.getAmount(), this.status, null);
    this.apply(event);
  }

  public transfer() {
    const event = new MoneyTransferred(this.id.getValue(), this.accountFrom.getValue(), this.accountTo.getValue(), this.amount.getAmount(), this.status, null);
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

  public getAccountFrom(): AccountId {
    return this.accountFrom;
  }

  public getAccountTo(): AccountId {
    return this.accountTo;
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