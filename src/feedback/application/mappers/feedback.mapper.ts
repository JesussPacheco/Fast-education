import { Feedback } from '../../domain/entities/feedback.entity';
import { FeedbackIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.id.typeorm';
import { FeedbackTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { FeedbackNameTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.name.typeorm';
import { FeedbackRouterIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.router.id.typeorm';
import { FeedbackTeacherIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.teacher.id.typeorm';
import { feedbackStudentIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/feedback.student.id.typeorm';

export class FeedbackMapper {
  public static toTypeORM(feedback: Feedback): FeedbackTypeorm {
    const feedbackTypeOrm: FeedbackTypeorm = new FeedbackTypeorm();
    feedbackTypeOrm.id = FeedbackIdTypeorm.from(feedback.getId().getValue());
    feedbackTypeOrm.name = FeedbackNameTypeorm.from(feedback.getName().getValue(),);
    feedbackTypeOrm.teacherId = FeedbackTeacherIdTypeorm.from(feedback.getTeacherId().getValue(),);
    feedbackTypeOrm.studentId = feedbackStudentIdTypeorm.from(feedback.getStudentId().getValue());
    feedbackTypeOrm.routerId = FeedbackRouterIdTypeorm.from(feedback.getRouterId().getValue());
    return feedbackTypeOrm;
  }
}
