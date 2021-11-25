import { UserId } from '../value-objects/user-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Teacher } from '../entities/teacher.entity';
import { TeacherName } from "../../../common/domain/value-objects/teacher-name.value";
import { Speciality } from "../value-objects/speciality.value";


export class TeacherFactory {
  public static createFrom(
    name: TeacherName,
    auditTrail: AuditTrail,
    speciality: Speciality,
  ): Teacher {
    return new Teacher(name, auditTrail, speciality);
  }
}