import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { FeedbackRegisterEvents } from '../../../domain/events/feedback-register.events';

@EventsHandler(FeedbackRegisterEvents)
export class FeedbackRegisteredHandler
  implements IEventHandler<FeedbackRegisterEvents>
{
  constructor() {}

  handle(event: FeedbackRegisterEvents) {
    console.log('handle logic for RouteRegisteredEvent');
    console.log(event);
  }
}
