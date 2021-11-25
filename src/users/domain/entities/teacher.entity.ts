import { UserId } from '../value-objects/user-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { User } from './user.entity';
import { Ruc } from '../value-objects/ruc.value';
import { UserType } from '../enums/user-type.enum';
import { TeacherRegistered } from '../events/teacher-registered.event';
import { TeacherName } from "../../../common/domain/value-objects/teacher-name.value";

import { Speciality } from "../value-objects/speciality.value";



export class Teacher extends User {
  private name: TeacherName;
  private speciality: Speciality;
  public constructor(name: TeacherName, auditTrail: AuditTrail,speciality:Speciality) {
    super(UserType.COMPANY, auditTrail);
    this.name = name;
    this.speciality = speciality;
  }

  public register() {
    const event = new TeacherRegistered(this.id.getValue(), this.name.getValue(),this.speciality.getValue());
    this.apply(event);
  }

  public getId(): UserId {
    return this.id;
  }

  public getName(): TeacherName {
    return this.name;
  }

  public getSpeciality(): Speciality {
    return this.speciality
  }

  public changeName(name: TeacherName): void {
    this.name = name;
  }

}