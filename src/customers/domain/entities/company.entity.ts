import { CustomerId } from '../value-objects/customer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Customer } from './customer.entity';
import { Ruc } from '../value-objects/ruc.value';
import { CustomerType } from '../enums/customer-type.enum';
import { TeacherRegistered } from '../events/teacher-registered.event';
import { TeacherName } from '../../../common/domain/value-objects/teacher-name.value';

export class Teacher extends Customer {
  private name: TeacherName;
  private ruc: Ruc;

  public constructor(name: TeacherName, auditTrail: AuditTrail) {
    super(CustomerType.TEACHER, auditTrail);
    this.name = name;
  }

  public register() {
    const event = new TeacherRegistered(this.id.getValue(), this.name.getValue());
    this.apply(event);
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getName(): TeacherName {
    return this.name;
  }
  public changeName(name: TeacherName): void {
    this.name = name;
  }
}
