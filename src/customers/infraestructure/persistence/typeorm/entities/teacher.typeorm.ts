import { ChildEntity, Column, Unique } from 'typeorm';
import { CustomerTypeORM } from './customer.typeorm';
import { TeacherNameTypeORM } from '../value-objects/teacher-name.typeorm';
import { CustomerType } from '../../../../domain/enums/customer-type.enum';

@ChildEntity(CustomerType.TEACHER)
@Unique('UQ_customers_teacher_name', ['teacherName.value'])
export class TeacherTypeORM extends CustomerTypeORM {
  @Column((type) => TeacherNameTypeORM, { prefix: false })
  public companyName: TeacherNameTypeORM;

  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}
