import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterFeedbackCommand } from '../../commands/register.feedback.command';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedbackTypeorm } from '../../../infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { Repository } from 'typeorm';
import { FeedbackName } from '../../../domain/value-objects/feedback-name.value';
import { TeacherId } from '../../../domain/value-objects/teacher-id.value';
import { StudentId } from '../../../domain/value-objects/student-id.value';
import { RouteId } from '../../../domain/value-objects/router-id.value';
import { Feedback } from '../../../domain/entities/feedback.entity';
import { FeedbackFactory } from '../../../domain/factories/feedback.factory';
import { FeedbackMapper } from '../../mappers/feedback.mapper';
import { FeedbackId } from '../../../domain/value-objects/feedback-id.value';

@CommandHandler(RegisterFeedbackCommand)
export class RegisterFeedbackHandler
  implements ICommandHandler<RegisterFeedbackCommand>
{
  constructor(
    @InjectRepository(FeedbackTypeorm)
    private feedbackRepository: Repository<FeedbackTypeorm>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterFeedbackCommand) {
    console.log('sign execute');
    const nameResult = FeedbackName.create(command.name);
    const teacherIdResult = TeacherId.create(command.teacherId);
    const studentIdResult = StudentId.create(command.studentId);
    const routeIdResult = RouteId.create(command.routerId);
    console.log(nameResult);
    console.log(teacherIdResult);
    console.log(studentIdResult);
    console.log(routeIdResult);
    let feedback: Feedback = FeedbackFactory.createFrom(
      nameResult,
      teacherIdResult,
      studentIdResult,
      routeIdResult,
    );
    console.log(feedback);
    let feedbackTypeORM = FeedbackMapper.toTypeORM(feedback);
    feedbackTypeORM = await this.feedbackRepository.save(feedbackTypeORM);
    if (feedbackTypeORM == null) {
      return 0;
    }
    const feedbackId = Number(feedbackTypeORM.id);
    feedback.changeId(FeedbackId.create(feedbackId));
    feedback = this.publisher.mergeObjectContext(feedback);
    feedback.register();
    feedback.commit();
    return feedbackId;
  }
}