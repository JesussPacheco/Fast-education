import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { CompanyApplicationService } from './application/services/company-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterStudentValidator } from './application/validators/register-student.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { StudentRegisteredHandler } from './application/handlers/events/student-registered.handler';
import { GetUsersStudentHandler } from './application/handlers/queries/get-users-student.handler';
import { StudentApplicationService } from './application/services/student-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { RegisterStudentHandler } from './application/handlers/commands/register-student.handler';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { StudentTypeORM } from './infrastructure/persistence/typeorm/entities/student.typeorm';

import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { GetUsersCompanyHandler } from './application/handlers/queries/get-users-company.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
import { UserTypeORM } from "./infrastructure/persistence/typeorm/entities/user.typeorm";

export const CommandHandlers = [RegisterStudentHandler, RegisterCompanyHandler];
export const EventHandlers = [StudentRegisteredHandler, CompanyRegisteredHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetUsersStudentHandler, GetUsersCompanyHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserTypeORM, StudentTypeORM, CompanyTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    StudentApplicationService,
    CompanyApplicationService,
    RegisterStudentValidator,
    RegisterCompanyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}