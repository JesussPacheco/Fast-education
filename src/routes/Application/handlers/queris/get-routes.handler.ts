
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetRoutesDto } from '../../dtos/queris/get-routes.dto';
import { GetRoutesQuery } from "../../queris/get-routes.query";


@QueryHandler(GetRoutesQuery)
export class GetRoutesHandler implements IQueryHandler<GetRoutesQuery> {
  constructor() {}

  async execute(query: GetRoutesQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      name as name ,
      university_id as university_id,
      grade_id as grade_id
    FROM 
      routes
    ORDER BY
     id;`;
    const ormRoutes = await manager.query(sql);
    if (ormRoutes.length <= 0) {
      return [];
    }
    const routes: GetRoutesDto[] = ormRoutes.map(function (ormRoutes) {
      const routesDto = new GetRoutesDto();
      routesDto.id = Number(ormRoutes.id);
      routesDto.name = ormRoutes.name;
      routesDto.universityId = ormRoutes.universityId;
      routesDto.gradeId = ormRoutes.gradeId;
      return routesDto;
    });
    return routes;
  }
}