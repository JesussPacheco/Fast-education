import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackTypeorm } from './infrastructure/persistence/typeorm/entities/feedback.typeorm';
import { GetFeedbackHandler } from './application/handlers/queris/get.feedback.handler';
import { FeedbackRegisteredHandler } from './application/handlers/events/feedback.registered.handler';
import { RegisterFeedbackHandler } from './application/handlers/commands/register.feedback.handler';
import { FeedbackController } from './api/feedback.controller';
import { FeedbackApplicationService } from './application/services/feedback.application.service';
import { RegisterFeedbackValidator } from './application/validators/register.route.validator';
import { RouteRegisteredHandler } from './application/handlers/events/route.registered.handler';
import { GetFeedbackByIdHandler } from './application/handlers/queris/get.feedback.by.id.handler';

export const CommandHandlers = [RegisterFeedbackHandler];
export const EventHandlers = [FeedbackRegisteredHandler, RouteRegisteredHandler];
export const QueryHandlers = [GetFeedbackHandler, GetFeedbackByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([FeedbackTypeorm])],
  controllers: [FeedbackController],
  providers: [
    FeedbackApplicationService,
    RegisterFeedbackValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class FeedbackModule {}
