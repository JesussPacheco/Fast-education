import { Column, Entity, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';

@Entity('users')
@TableInheritance({ column: 'type', })
export class UserTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;

  @Column({ name: 'type', type: 'enum', enum: UserType, default: UserType.COMPANY })
  readonly type: UserType;

}