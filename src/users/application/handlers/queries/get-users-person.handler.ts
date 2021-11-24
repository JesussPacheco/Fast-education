
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersPersonDto } from '../../dtos/queries/get-users-person.dto';
import { GetUsersPersonQuery } from "../../queries/get-users-person.query";



@QueryHandler(GetUsersPersonQuery)
export class GetUsersPersonHandler implements IQueryHandler<GetUsersPersonQuery> {
  constructor() {}

  async execute(query: GetUsersPersonQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      users
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersPersonDto[] = ormUsers.map(function (ormUser) {
      let userDto = new GetUsersPersonDto();
      userDto.id = Number(ormUser.id);
      userDto.firstName = ormUser.firstName;
      userDto.lastName = ormUser.lastName;
      userDto.dni = ormUser.dni;
      return userDto;
    });
    return users;
  }
}