import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountIdFromTypeORM } from '../value-objects/account-id-from.typeorm';
import { AmountTypeORM } from '../value-objects/amount.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { SubscriptionStatus } from "../../../../domain/enums/subscriptions.status.enum";
import { SubscriptionsMembership } from "../../../../domain/enums/subscriptions-membership.enum";
import { RouteIdTypeorm } from '../value-objects/route-id.typeorm';
@Entity('subscriptions')
export class SubscriptionTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;
  @Column((type) => AccountIdFromTypeORM, { prefix: false })
  public accountIdFrom: AccountIdFromTypeORM;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', { name: 'status', width: 2, unsigned: true, nullable: false, })
  public status: SubscriptionStatus;

   @Column((type)=>RouteIdTypeorm,{prefix:false})
   public routeId:RouteIdTypeorm

  @Column('varchar', { name: 'membership', length: 10, nullable: false })
  public subscriptionsMembership: SubscriptionsMembership;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;


}