import { GetUsersCompanyQuery } from '../../queries/get-users-company.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersCompanyDto } from '../../dtos/queries/get-users-company.dto';

@QueryHandler(GetUsersCompanyQuery)
export class GetUsersCompanyHandler implements IQueryHandler<GetUsersCompanyQuery> {
  constructor() {}

  async execute(query: GetUsersCompanyQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      company_name as companyName,
      ruc
    FROM 
      users
    WHERE
      type = 'C'
    ORDER BY
      company_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersCompanyDto[] = ormUsers.map(function (ormUser) {
      let userDto = new GetUsersCompanyDto();
      userDto.id = Number(ormUser.id);
      userDto.companyName = ormUser.companyName;
      userDto.ruc = ormUser.ruc;
      return userDto;
    });
    return users;
  }
}