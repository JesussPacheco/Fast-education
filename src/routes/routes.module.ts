import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteTypeorm } from './infrastructure/persistence/typeorm/entities/route.typeorm';
import { RoutesController } from './api/routes.controller';
import { RoutesApplicationService } from './Application/services/routes-application.service';
import { RegisterRouteValidator } from './Application/validators/register-route.validator';
import { RouteRegisteredHandler } from './Application/handlers/events/route-registered.handler';
import { RegisterRouteHandler } from './Application/handlers/commands/register-route.handler';
import { GetRoutesHandler } from './Application/handlers/queris/get-routes.handler';

export const CommandHandlers = [RegisterRouteHandler];
export const EventHandlers = [RouteRegisteredHandler];
export const QueryHandlers = [GetRoutesHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([RouteTypeorm])],
  controllers: [RoutesController],
  providers: [
    RoutesApplicationService,
    RegisterRouteValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class RoutesModule {}
