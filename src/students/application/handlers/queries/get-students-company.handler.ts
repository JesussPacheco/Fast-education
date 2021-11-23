import { GetStudentsCompanyQuery } from '../../queries/get-students-company.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetStudentsCompanyDto } from '../../dtos/queries/get-students-company.dto';

@QueryHandler(GetStudentsCompanyQuery)
export class GetStudentsCompanyHandler implements IQueryHandler<GetStudentsCompanyQuery> {
  constructor() {}

  async execute(query: GetStudentsCompanyQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      company_name as companyName,
      ruc
    FROM 
      students
    WHERE
      type = 'C'
    ORDER BY
      company_name;`;
    const ormStudents = await manager.query(sql);
    if (ormStudents.length <= 0) {
      return [];
    }
    const students: GetStudentsCompanyDto[] = ormStudents.map(function (ormStudent) {
      let studentDto = new GetStudentsCompanyDto();
      studentDto.id = Number(ormStudent.id);
      studentDto.companyName = ormStudent.companyName;
      studentDto.ruc = ormStudent.ruc;
      return studentDto;
    });
    return students;
  }
}