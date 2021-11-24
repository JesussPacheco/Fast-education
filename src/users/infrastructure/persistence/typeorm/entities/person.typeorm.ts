import { ChildEntity, Column, Unique } from 'typeorm';
import { UserTypeORM } from './user.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';

@ChildEntity(UserType.PERSON)
@Unique('UQ_users_dni', ['dni.value'])
export class PersonTypeORM extends UserTypeORM {
  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}