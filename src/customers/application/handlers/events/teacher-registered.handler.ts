import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { TeacherRegistered } from '../../../domain/events/teacher-registered.event';

@EventsHandler(TeacherRegistered)
export class TeacherRegisteredHandler implements IEventHandler<TeacherRegistered> {
  constructor() {}

  handle(event: TeacherRegistered) {
    console.log('handle logic for TeacherRegistered');
    console.log(event);
  }
