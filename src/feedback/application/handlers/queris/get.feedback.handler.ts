import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetFeedbacksQuery } from '../../queris/get.feedbacks.query';
import { GetFeedbackDto } from '../../dtos/queris/get.feedback.dto';

@QueryHandler(GetFeedbacksQuery)
export class GetFeedbackHandler implements IQueryHandler<GetFeedbacksQuery> {
  constructor() {}
  async execute(query: GetFeedbacksQuery) {
    const manager = getManager();
    const sql = `SELECT id,name ,teacher_id,student_id,route_id FROM feedbacks ORDER BY id;`;
    const ormFeedbacks = await manager.query(sql);
    if (ormFeedbacks.length <= 0) {
      return [];
    }

    const feedbacks: GetFeedbackDto[] = ormFeedbacks.map(function(ormFeedbacks){
      let feedbackDto = new GetFeedbackDto();
      feedbackDto.id = Number(ormFeedbacks.id);
      feedbackDto.name = ormFeedbacks.name;
      feedbackDto.teacherId = Number(ormFeedbacks.teacherId);
      feedbackDto.studentId = Number(ormFeedbacks.studentId);
      feedbackDto.routerId =Number(ormFeedbacks.routerId);
      return feedbackDto;
    });
    return feedbacks;
  }
}
