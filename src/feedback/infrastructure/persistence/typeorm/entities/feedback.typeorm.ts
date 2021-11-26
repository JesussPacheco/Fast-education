import { Column, Entity } from 'typeorm';
import { FeedbackIdTypeorm } from './feedback.id.typeorm';
import { FeedbackNameTypeorm } from './feedback.name.typeorm';
import { FeedbackTeacherIdTypeorm } from './feedback.teacher.id.typeorm';
import { feedbackStudentIdTypeorm } from './feedback.student.id.typeorm';
import { FeedbackRouterIdTypeorm } from './feedback.router.id.typeorm';
@Entity('Feedbacks')
export class FeedbackTypeorm {
  @Column(() => FeedbackIdTypeorm, { prefix: false })
  public id: FeedbackIdTypeorm;
  @Column(() => FeedbackNameTypeorm, { prefix: false })
  public name: FeedbackNameTypeorm;
  @Column(() => FeedbackTeacherIdTypeorm, { prefix: false })
  public teacherId: FeedbackTeacherIdTypeorm;
  @Column(() => feedbackStudentIdTypeorm, { prefix: false })
  public studentId: feedbackStudentIdTypeorm;
  @Column(() => FeedbackRouterIdTypeorm, { prefix: false })
  public routerId: FeedbackRouterIdTypeorm;

  static id: FeedbackIdTypeorm;
}
