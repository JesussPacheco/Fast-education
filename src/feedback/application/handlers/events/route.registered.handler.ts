import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RouteRegisterEvent } from '../../../../routes/domain/events/route-register.event';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackTypeorm } from '../../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { Repository } from 'typeorm';
import { AppNotification } from '../../../../common/application/app.notification';
import { Result } from 'typescript-result';
import { Feedback } from '../../../domain/entities/feedback.entity';
import { FeedbackFactory } from '../../../domain/factories/feedback.factory';
import { FeedbackName } from '../../../domain/value-objects/feedback-name.value';
import { FeedbackMapper } from '../../mappers/feedback.mapper';
import { TeacherId } from '../../../domain/value-objects/teacher-id.value';
import { StudentId } from '../../../domain/value-objects/student-id.value';
import { RouteId } from '../../../domain/value-objects/router-id.value';


@EventsHandler(RouteRegisterEvent)
export class RouteRegisteredHandler implements IEventHandler<RouteRegisterEvent> {
  constructor(
    @InjectRepository(FeedbackTypeorm) private feedbackRepository: Repository<FeedbackTypeorm>,
    private commandBus: CommandBus
  )
  {}
  async handle(event: RouteRegisterEvent){
    let routeId =  Number (event.id)
    let name="Started route number : " + routeId;
    const nameResult = FeedbackName.create(name);
    const teacherIdResult = TeacherId.create(0);
    const studentIdResult =StudentId.create(0);
    const routeIdResult = RouteId.create(routeId);
    let feedback: Feedback = FeedbackFactory.createFrom(nameResult,teacherIdResult, studentIdResult, routeIdResult,);
    let feedbackTypeORM: FeedbackTypeorm = FeedbackMapper.toTypeORM(feedback);
    feedbackTypeORM = await this.feedbackRepository.save(feedbackTypeORM);
    if (feedbackTypeORM == null) {
      return 0;
    }
    feedback.commit();

  }
}
