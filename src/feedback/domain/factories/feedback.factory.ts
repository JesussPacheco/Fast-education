import { Feedback } from '../entities/feedback.entity';
import { FeedbackName } from '../value-objects/feedback-name.value';
import { TeacherId } from '../value-objects/teacher-id.value';
import { StudentId } from '../value-objects/student-id.value';
import { RouteId } from '../value-objects/router-id.value';
import { FeedbackId } from '../value-objects/feedback-id.value';

export class FeedbackFactory {
  public static createFrom(
    name: FeedbackName,
    teacherId: TeacherId,
    studentId: StudentId,
    routeId: RouteId,
  ): Feedback {
    return new Feedback(
      FeedbackId.create(0),
      name,
      teacherId,
      studentId,
      routeId,
    );
  }
  public static withId(
    id: FeedbackId,
    name: FeedbackName,
    teacherId: TeacherId,
    studentId: StudentId,
    routeId: RouteId,
  ): Feedback {
    return new Feedback(id, name, teacherId, studentId, routeId);
  }
}
