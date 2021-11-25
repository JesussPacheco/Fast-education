import { ChildEntity, Column, Unique } from 'typeorm';
import { UserTypeORM } from './user.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { StudentNameTypeORM } from '../value-objects/student-name.typeorm';
import { UserType } from '../../../../domain/enums/user-type.enum';

@ChildEntity(UserType.STUDENT)
@Unique('UQ_users_dni', ['dni.value'])
export class StudentTypeORM extends UserTypeORM {
  @Column((type) => StudentNameTypeORM, { prefix: false })
  public name: StudentNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}