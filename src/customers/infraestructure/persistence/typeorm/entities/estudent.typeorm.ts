import { ChildEntity, Column, Unique } from 'typeorm';
import { CustomerTypeORM } from './customer.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { EstudentNameTypeORM } from '../value-objects/estudent-name.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';

@ChildEntity(CustomerType.ESTUDENT)
@Unique('UQ_customers_dni', ['dni.value'])
export class EstudentTypeORM extends CustomerTypeORM {
  @Column((type) => EstudentNameTypeORM, { prefix: false })
  public name: EstudentNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}
