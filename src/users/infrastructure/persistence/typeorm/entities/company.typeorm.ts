import { ChildEntity, Column, Unique } from 'typeorm';

import { RucTypeORM } from '../value-objects/ruc.typeorm';
import { CompanyNameTypeORM } from '../value-objects/company-name.typeorm';


import { UserType } from "../../../../domain/enums/user-type.enum";
import { UserTypeORM } from "./user.typeorm";




@ChildEntity(UserType.COMPANY)
@Unique('UQ_users_company_name', ['companyName.value'])
@Unique('UQ_users_ruc', ['ruc.value'])
export class CompanyTypeORM extends UserTypeORM {
  @Column((type) => CompanyNameTypeORM, { prefix: false })
  public companyName: CompanyNameTypeORM;
  @Column((type) => RucTypeORM, { prefix: false })
  public ruc: RucTypeORM;
}