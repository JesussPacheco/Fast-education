import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompleteSubscription } from '../../commands/complete-subscriptions.command';
import { SubscriptionStatus } from "../../../domain/enums/subscriptions.status.enum";
import { SubscriptionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/subscription.typeorm';


@CommandHandler(CompleteSubscription)
export class CompleteSubscriptionHandler
  implements ICommandHandler<CompleteSubscription> {
  constructor(
    @InjectRepository(SubscriptionTypeORM)
    private subscriptionRepository: Repository<SubscriptionTypeORM>
  ) {
  }

  async execute(command: CompleteSubscription) {
    const subscriptionId: number = command.subscriptionId;
    let subscriptionTypeORM: SubscriptionTypeORM = await this.subscriptionRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", subscriptionId)
      .getOne();
    if (subscriptionTypeORM == null) {
      return false;
    }
    subscriptionTypeORM.status = SubscriptionStatus.COMPLETED;
    subscriptionTypeORM = await this.subscriptionRepository.save(subscriptionTypeORM);
    if (subscriptionTypeORM == null) {
      return false;
    }
    return true;
  }
}