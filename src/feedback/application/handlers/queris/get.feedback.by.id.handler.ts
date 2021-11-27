import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';

import { GetFeedbackDto } from '../../dtos/queris/get.feedback.dto';
import { GetFeedbackByIdQuery } from '../../queris/get.feedback.by.id.query';

@QueryHandler(GetFeedbackByIdQuery)
export class GetFeedbackByIdHandler implements IQueryHandler<GetFeedbackByIdQuery> {
  constructor() {}
  async execute(query: GetFeedbackByIdQuery) {
    const manager = getManager();
    const sql = `SELECT id,name ,teacher_id,student_id,route_id FROM feedbacks WHERE id = ?;`;
    const ormFeedbacks = await manager.query(sql, [query.feedbackId]);
    if (ormFeedbacks.length <= 0) {
      return [];
    }

    const feedbacks = ormFeedbacks[0]
      let feedbackDto = new GetFeedbackDto();
      feedbackDto.id = Number(feedbacks.id);
      feedbackDto.name = feedbacks.name;
      feedbackDto.teacherId = Number(feedbacks.teacherId);
      feedbackDto.studentId = Number(feedbacks.studentId);
      feedbackDto.routerId =Number(feedbacks.routerId);
      return feedbacks;
  }
}
