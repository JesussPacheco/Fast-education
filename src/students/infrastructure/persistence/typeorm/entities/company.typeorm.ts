import { ChildEntity, Column, Unique } from 'typeorm';

import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { CompanyNameTypeORM } from '../value-objects/company-name.typeorm';


import { StudentType } from "../../../../domain/enums/student-type.enum";
import { StudentTypeORM } from "./student.typeorm";




@ChildEntity(StudentType.COMPANY)
@Unique('UQ_students_company_name', ['companyName.value'])
@Unique('UQ_students_ruc', ['ruc.value'])
export class CompanyTypeORM extends StudentTypeORM {
  @Column((type) => CompanyNameTypeORM, { prefix: false })
  public companyName: CompanyNameTypeORM;
  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}