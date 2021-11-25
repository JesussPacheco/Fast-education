import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { MoneyTransferred } from '../../../../subscriptions/domain/events/money-transferred.event';

@EventsHandler(MoneyTransferred)
export class MoneyTransferredHandler implements IEventHandler<MoneyTransferred> {
  constructor(
  ) {}

  async handle(event: MoneyTransferred) {
    console.log('Subscription BC - handle MoneyTransferred');
  }
}