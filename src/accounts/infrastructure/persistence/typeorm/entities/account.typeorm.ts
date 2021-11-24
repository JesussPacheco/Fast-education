import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountNumberTypeORM } from '../value-objects/account-number.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { UserIdTypeORM } from "../value-objects/student-id.typeorm";


@Entity('accounts')
@Unique('UQ_accounts_number', ['number.value'])
export class AccountTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AccountNumberTypeORM, { prefix: false })
  public number: AccountNumberTypeORM;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => UserIdTypeORM, { prefix: false })
  public userId: UserIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}