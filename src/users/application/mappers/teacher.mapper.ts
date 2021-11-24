import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Teacher } from '../../domain/entities/teacher.entity';
import { TeacherTypeORM } from '../../infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { TeacherNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/teacher-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class TeacherMapper {
  public static toTypeORM(teacher: Teacher): TeacherTypeORM {
    const teacherTypeORM: TeacherTypeORM = new TeacherTypeORM();
    teacherTypeORM.teacherName = TeacherNameTypeORM.from(teacher.getName().getValue());
    teacherTypeORM.ruc = RucTypeORM.from(teacher.getRuc().getValue());
    const createdAt: string = teacher.getAuditTrail() != null && teacher.getAuditTrail().getCreatedAt() != null ? teacher.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = teacher.getAuditTrail() != null && teacher.getAuditTrail().getCreatedBy() != null ? teacher.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = teacher.getAuditTrail() != null && teacher.getAuditTrail().getUpdatedAt() != null ? teacher.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = teacher.getAuditTrail() != null && teacher.getAuditTrail().getUpdatedBy() != null ? teacher.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    teacherTypeORM.auditTrail = auditTrailTypeORM;
    return teacherTypeORM;
  }
}