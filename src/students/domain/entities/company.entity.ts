import { StudentId } from '../value-objects/student-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Student } from './student.entity';
import { Ruc } from '../value-objects/ruc.value';
import { StudentType } from '../enums/student-type.enum';
import { CompanyRegistered } from '../events/company-registered.event';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';

export class Company extends Student {
  private name: CompanyName;
  private ruc: Ruc;

  public constructor(name: CompanyName, ruc: Ruc, auditTrail: AuditTrail) {
    super(StudentType.COMPANY, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new CompanyRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }

  public getId(): StudentId {
    return this.id;
  }

  public getName(): CompanyName {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public changeName(name: CompanyName): void {
    this.name = name;
  }

  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}