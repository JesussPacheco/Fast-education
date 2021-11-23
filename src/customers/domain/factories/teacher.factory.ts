import { CustomerId } from '../value-objects/customer-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { TeacherName } from '../../../common/domain/value-objects/teacher-name.value';
import { Teacher } from '../entities/company.entity';
import { Ruc } from '../value-objects/ruc.value';

export class TeacherFactory {
  public static createFrom(name: TeacherName, auditTrail: AuditTrail): Teacher {
    return new Teacher(name, auditTrail);
  }
}
