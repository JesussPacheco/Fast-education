import { Module } from '@nestjs/common';
import { CustomersController } from './api/customers.controller';
import { TeacherApplicationService } from './application/services/teacher-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterEstudentValidator } from './application/validators/register-estudent.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTeacherHandler } from './application/handlers/commands/register-teacher.handler';
import { EstudentRegisteredHandler } from './application/handlers/events/estudent-registered.handler';
import { GetCustomersEstudentHandler } from './application/handlers/queries/get-customers-estudent.handler';
import { EstudentApplicationService } from './application/services/estudent-application.service';
import { RegisterTeacherValidator } from './application/validators/register-teacher.validator';
import { RegisterEstudentHandler } from './application/handlers/commands/register-estudent.handler';
import { TeacherTypeORM } from './infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { EstudentTypeORM } from './infrastructure/persistence/typeorm/entities/estudent.typeorm';
import { CustomerTypeORM } from './infrastructure/persistence/typeorm/entities/customer.typeorm';
import { TeacherRegisteredHandler } from './application/handlers/events/teacher-registered.handler';
import { GetCustomersTeacherHandler } from './application/handlers/queries/get-customers-teacher.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [RegisterEstudentHandler, RegisterTeacherHandler];
export const EventHandlers = [EstudentRegisteredHandler, TeacherRegisteredHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetCustomersEstudentHandler, GetCustomersTeacherHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CustomerTypeORM, EstudentTypeORM, TeacherTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [CustomersController],
  providers: [
    EstudentApplicationService,
   TeacherApplicationService,
    RegisterEstudentValidator,
    RegisterTeacherValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class CustomersModule {}
