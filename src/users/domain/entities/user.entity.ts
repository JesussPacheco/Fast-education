import { AggregateRoot } from '@nestjs/cqrs';
import { UserId } from '../value-objects/user-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { UserType } from '../enums/user-type.enum';

export class User extends AggregateRoot {
  protected id: UserId;
  protected type: UserType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: UserType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): UserId {
    return this.id;
  }

  public getType(): UserType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: UserId) {
    this.id = id;
  }
}