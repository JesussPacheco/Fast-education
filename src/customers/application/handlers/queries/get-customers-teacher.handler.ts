import { GetCustomersTeacherQuery } from '../../queries/get-customers-teacher.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetCustomersTeacherDto } from '../../dtos/queries/get-customers-teacher.dto';

@QueryHandler(GetCustomersTeacherQuery)
export class GetCustomersTeacherHandler implements IQueryHandler<GetCustomersTeacherQuery> {
  constructor() {}

  async execute(query: GetCustomersTeacherQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      teacher_name as teacherName,
      ruc
    FROM 
      customers
    WHERE
      type = 'C'
    ORDER BY
      teacher_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const customers: GetCustomersTeacherDto[] = ormCustomers.map(function (ormCustomer) {
      let customerDto = new GetCustomersTeacherDto();
      customerDto.id = Number(ormCustomer.id);
      customerDto.teacherName = ormCustomer.teacherName;
      customerDto.ruc = ormCustomer.ruc;
      return customerDto;
    });
    return customers;
  }
}
