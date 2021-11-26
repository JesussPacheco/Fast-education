import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetFeedbacksQuery } from '../../queris/get.feedbacks.query';
import { GetFeedbackDto } from '../../dtos/queris/get.feedback.dto';

@QueryHandler(GetFeedbacksQuery)
export class GetFeedbackHandler implements IQueryHandler<GetFeedbacksQuery> {
  constructor() {}
  async execute(query: GetFeedbacksQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      name ,
      teacher_id,
      student_id,
      route_id
    FROM 
      feedbacks
    ORDER BY
     id;`;
    const ormFeedbacks = await manager.query(sql);
    if (ormFeedbacks.length <= 0) {
      return [];
    }
    const feedbacks: GetFeedbackDto[] = ormFeedbacks.map(function(ormFeedbacks){
      const routesDto = new GetFeedbackDto();
      routesDto.id = Number(ormFeedbacks.id);
      routesDto.name = ormFeedbacks.name;
      routesDto.teacherId = Number(ormFeedbacks.teacherId);
      routesDto.studentId = Number(ormFeedbacks.studentId);
      routesDto.routerId =Number(ormFeedbacks.routerId);
      return routesDto;
    });
  }
}
