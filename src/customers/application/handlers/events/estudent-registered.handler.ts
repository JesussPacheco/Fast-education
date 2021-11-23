import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { EstudentRegistered } from '../../../domain/events/estudent-registered.event';

@EventsHandler(EstudentRegistered)
export class EstudentRegisteredHandler implements IEventHandler<EstudentRegistered> {
  constructor() {}

  handle(event: EstudentRegistered) {
    console.log('handle logic for EstudentRegistered');
    console.log(event);
  }
}
