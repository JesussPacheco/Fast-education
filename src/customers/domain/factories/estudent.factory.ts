import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Dni } from '../value-objects/dni.value';
import { Estudent } from '../entities/estudent.entity';
import { EstudentName } from '../../../common/domain/value-objects/estudent-name.value';

export class PersonFactory {
  public static createFrom(name: PersonName, dni: Dni, auditTrail: AuditTrail): Person {
    return new Estudent(name, dni, auditTrail);
  }
}
