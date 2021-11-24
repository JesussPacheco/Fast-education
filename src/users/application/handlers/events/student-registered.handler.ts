import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { StudentRegistered } from '../../../domain/events/student-registered.event';

@EventsHandler(StudentRegistered)
export class StudentRegisteredHandler implements IEventHandler<StudentRegistered> {
  constructor() {}

  handle(event: StudentRegistered) {
    console.log('handle logic for StudentRegistered');
    console.log(event);
  }
}