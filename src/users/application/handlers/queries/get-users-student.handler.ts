
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetUsersStudentQuery } from "../../queries/get-users-student.query";
import { GetUsersStudentDto } from "../../dtos/queries/get-users-students.dto";



@QueryHandler(GetUsersStudentQuery)
export class GetUsersStudentHandler implements IQueryHandler<GetUsersStudentQuery> {
  constructor() {}

  async execute(query: GetUsersStudentQuery) {
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
      type = 'S'
    ORDER BY
      last_name, first_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersStudentDto[] = ormUsers.map(function (ormUser) {
      let userDto = new GetUsersStudentDto();
      userDto.id = Number(ormUser.id);
      userDto.firstName = ormUser.firstName;
      userDto.lastName = ormUser.lastName;
      userDto.dni = ormUser.dni;
      return userDto;
    });
    return users;
  }
}