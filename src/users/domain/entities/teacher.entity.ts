import { UserId } from '../value-objects/user-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { User } from './user.entity';
import { Ruc } from '../value-objects/ruc.value';
import { UserType } from '../enums/user-type.enum';
import { TeacherRegistered } from '../events/teacher-registered.event';
import { TeacherName } from "../../../common/domain/value-objects/teacher-name.value";



export class Teacher extends User {
  private name: TeacherName;
  private ruc: Ruc;

  public constructor(name: TeacherName, ruc: Ruc, auditTrail: AuditTrail) {
    super(UserType.COMPANY, auditTrail);
    this.name = name;
    this.ruc = ruc;
  }

  public register() {
    const event = new TeacherRegistered(this.id.getValue(), this.name.getValue(), this.ruc.getValue());
    this.apply(event);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): TeacherName {
    return this.name;
  }

  public getRuc(): Ruc {
    return this.ruc;
  }

  public changeName(name: TeacherName): void {
    this.name = name;
  }

  public changeRuc(ruc: Ruc): void {
    this.ruc = ruc;
  }
}