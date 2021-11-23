
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetStudentsPersonDto } from '../../dtos/queries/get-students-person.dto';
import { GetStudentsPersonQuery } from "../../queries/get-students-person.query";



@QueryHandler(GetStudentsPersonQuery)
export class GetStudentsPersonHandler implements IQueryHandler<GetStudentsPersonQuery> {
  constructor() {}

  async execute(query: GetStudentsPersonQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      students
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const ormStudents = await manager.query(sql);
    if (ormStudents.length <= 0) {
      return [];
    }
    const students: GetStudentsPersonDto[] = ormStudents.map(function (ormStudent) {
      let studentDto = new GetStudentsPersonDto();
      studentDto.id = Number(ormStudent.id);
      studentDto.firstName = ormStudent.firstName;
      studentDto.lastName = ormStudent.lastName;
      studentDto.dni = ormStudent.dni;
      return studentDto;
    });
    return students;
  }
}