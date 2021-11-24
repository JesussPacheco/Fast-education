import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../value-objects/dni.value';
import { Student } from '../entities/student.entity';
import { StudentName } from "../../../common/domain/value-objects/person-name.value";


export class StudentFactory {
  public static createFrom(name: StudentName, dni: Dni, auditTrail: AuditTrail): Student {
    return new Student(name, dni, auditTrail);
  }
}