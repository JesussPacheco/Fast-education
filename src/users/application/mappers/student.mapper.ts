import { StudentTypeORM } from '../../infrastructure/persistence/typeorm/entities/student.typeorm';
import { Student } from '../../domain/entities/student.entity';
import { StudentNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/student-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class StudentMapper {
  public static toTypeORM(student: Student): StudentTypeORM {
    const studentTypeORM: StudentTypeORM = new StudentTypeORM();
    studentTypeORM.name = StudentNameTypeORM.from(student.getName().getFirstName(), student.getName().getLastName());
    studentTypeORM.dni = DniTypeORM.from(student.getDni().getValue());
    const createdAt: string = student.getAuditTrail() != null && student.getAuditTrail().getCreatedAt() != null ? student.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = student.getAuditTrail() != null && student.getAuditTrail().getCreatedBy() != null ? student.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = student.getAuditTrail() != null && student.getAuditTrail().getUpdatedAt() != null ? student.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = student.getAuditTrail() != null && student.getAuditTrail().getUpdatedBy() != null ? student.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    studentTypeORM.auditTrail = auditTrailTypeORM;
    return studentTypeORM;
  }
}