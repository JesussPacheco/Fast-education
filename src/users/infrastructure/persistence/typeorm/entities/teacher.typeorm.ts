import { ChildEntity, Column, Unique } from 'typeorm';
import { TeacherNameTypeORM } from '../value-objects/teacher-name.typeorm';

import { UserType } from '../../../../domain/enums/user-type.enum';
import { UserTypeORM } from './user.typeorm';
import { SpecialityTypeORM } from '../value-objects/speciality.typeorm';

@ChildEntity(UserType.COMPANY)
@Unique('UQ_users_teacher_name', ['teacherName.value'])
export class TeacherTypeORM extends UserTypeORM {
  @Column((type) => TeacherNameTypeORM, { prefix: false })
  public teacherName: TeacherNameTypeORM;

  @Column((type) => SpecialityTypeORM, { prefix: false })
  public speciality: SpecialityTypeORM;
}
