import { EstudentTypeORM } from '../../infrastructure/persistence/typeorm/entities/estudent.typeorm';
import { Estudent } from '../../domain/entities/estudent.entity';
import { EstudentNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/estudent-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class EstudentMapper {
  public static toTypeORM(estudent: Estudent): EstudentTypeORM {
    const estudentTypeORM: EstudentTypeORM = new EstudentTypeORM();
    estudentTypeORM.name = EstudentNameTypeORM.from(person.getName().getFirstName(), person.getName().getLastName());
    estudentTypeORM.dni = DniTypeORM.from(person.getDni().getValue());
    const createdAt: string = estudent.getAuditTrail() != null && estudent.getAuditTrail().getCreatedAt() != null ? estudent.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = estudent.getAuditTrail() != null && estudent.getAuditTrail().getCreatedBy() != null ? estudent.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = estudent.getAuditTrail() != null && estudent.getAuditTrail().getUpdatedAt() != null ? estudent.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = estudent.getAuditTrail() != null && estudent.getAuditTrail().getUpdatedBy() != null ? estudent.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    estudentTypeORM.auditTrail = auditTrailTypeORM;
    return estudentTypeORM;
  }
}
