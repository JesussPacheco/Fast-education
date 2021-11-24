import { ChildEntity, Column, Unique } from 'typeorm';

import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { TeacherNameTypeORM } from '../value-objects/teacher-name.typeorm';

import { UserType } from '../../../../domain/enums/user-type.enum';
import { UserTypeORM } from './user.typeorm';
import { SpecialityTypeORM } from '../value-objects/speciality.typeorm';

@ChildEntity(UserType.COMPANY)
@Unique('UQ_users_teacher_name', ['teacherName.value'])
@Unique('UQ_users_ruc', ['ruc.value'])
export class TeacherTypeORM extends UserTypeORM {
  @Column((type) => TeacherNameTypeORM, { prefix: false })
  public teacherName: TeacherNameTypeORM;
  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;

  @Column((type) => SpecialityTypeORM, { prefix: false })
  public speciality: SpecialityTypeORM;
}
