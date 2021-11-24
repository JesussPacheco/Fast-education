import { GetUsersTeacherQuery } from '../../queries/get-users-teacher.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetUsersTeacherDto } from '../../dtos/queries/get-users-teacher.dto';

@QueryHandler(GetUsersTeacherQuery)
export class GetUsersTeacherHandler implements IQueryHandler<GetUsersTeacherQuery> {
  constructor() {}

  async execute(query: GetUsersTeacherQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      teacher_name as teacherName,
      ruc
    FROM 
      users
    WHERE
      type = 'C'
    ORDER BY
      teacher_name;`;
    const ormUsers = await manager.query(sql);
    if (ormUsers.length <= 0) {
      return [];
    }
    const users: GetUsersTeacherDto[] = ormUsers.map(function (ormUser) {
      let userDto = new GetUsersTeacherDto();
      userDto.id = Number(ormUser.id);
      userDto.teacherName = ormUser.teacherName;
      userDto.ruc = ormUser.ruc;
      return userDto;
    });
    return users;
  }
}