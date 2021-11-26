import { AggregateRoot } from '@nestjs/cqrs';
import { FeedbackId } from '../value-objects/feedback-id.value';
import { FeedbackName } from '../value-objects/feedback-name.value';
import { TeacherId } from '../value-objects/teacher-id.value';
import { StudentId } from '../value-objects/student-id.value';
import { RouteId } from '../value-objects/router-id.value';
import { FeedbackRegisterEvents } from '../events/feedback-register.events';

export class Feedback extends AggregateRoot {
  private id: FeedbackId;
  private name: FeedbackName;
  private teacherId: TeacherId;
  private studentId: StudentId;
  private routerId: RouteId;

  public constructor(
    id: FeedbackId,
    name: FeedbackName,
    teacherId: TeacherId,
    studentId: StudentId,
    routerId: RouteId,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.teacherId = teacherId;
    this.studentId = studentId;
    this.routerId = routerId;
  }
  public register() {
    const event = new FeedbackRegisterEvents(
      this.id.getValue(),
      this.name.gwtValue(),
      this.teacherId.getValue(),
      this.studentId.getValue(),
      this.routerId.getValue(),
    );
    this.apply(event);
  }


  public getId(): FeedbackId {
    return this.id;
  }

  public  changeId(value: FeedbackId) {
    this.id = value;
  }

  public getName(): FeedbackName {
    return this.name;
  }

  public changeName(value: FeedbackName) {
    this.name = value;
  }

  public getTeacherId(): TeacherId {
    return this.teacherId;
  }

  public changeTeacherId(value: TeacherId) {
    this.teacherId = value;
  }

  public getStudentId(): StudentId {
    return this.studentId;
  }

  public changeStudentId(value: StudentId) {
    this.studentId = value;
  }

  public getRouterId(): RouteId {
    return this.routerId;
  }

  public changeRouterId(value: RouteId) {
    this.routerId = value;
  }
}
