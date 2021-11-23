import { AggregateRoot } from '@nestjs/cqrs';
import { StudentId } from '../value-objects/student-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { StudentType } from '../enums/student-type.enum';

export class Student extends AggregateRoot {
  protected id: StudentId;
  protected type: StudentType;
  protected readonly auditTrail: AuditTrail;

  public constructor(type: StudentType, auditTrail: AuditTrail) {
    super();
    this.type = type;
    this.auditTrail = auditTrail;
  }

  public getId(): StudentId {
    return this.id;
  }

  public getType(): StudentType {
    return this.type;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: StudentId) {
    this.id = id;
  }
}