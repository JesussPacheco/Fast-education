import { UserId } from '../value-objects/user-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { User } from './user.entity';
import { Ruc } from '../value-objects/ruc.value';
import { UserType } from '../enums/user-type.enum';
import { CompanyRegistered } from '../events/company-registered.event';
import { CompanyName } from '../../../common/domain/value-objects/company-name.value';

export class Company extends User {
  private name: CompanyName;
  private ruc: Ruc;

  public constructor(name: CompanyName, ruc: Ruc, auditTrail: AuditTrail) {
    super(UserType.COMPANY, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new CompanyRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }

  public getId(): UserId {
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