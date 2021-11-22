
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RouteRegisterEvent } from '../../../domain/events/route-register.event';

@EventsHandler(RouteRegisterEvent)
export class RouteRegisteredHandler implements IEventHandler<RouteRegisterEvent> {
  constructor() {}

  handle(event: RouteRegisterEvent) {
    console.log('handle logic for RouteRegisteredEvent');
    console.log(event);
  }
}