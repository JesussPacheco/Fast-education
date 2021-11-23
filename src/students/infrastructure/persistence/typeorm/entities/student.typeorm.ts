import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { StudentType } from '../../../../domain/enums/student-type.enum';

@Entity('students')
@TableInheritance({ column: 'type', })
export class StudentTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({ name: 'type', type: 'enum', enum: StudentType, default: StudentType.COMPANY })
  readonly type: StudentType;
}