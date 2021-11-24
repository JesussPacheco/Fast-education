import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { CompanyApplicationService } from './application/services/company-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetUsersPersonHandler } from './application/handlers/queries/get-users-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';

import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { GetUsersCompanyHandler } from './application/handlers/queries/get-users-company.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
import { UserTypeORM } from "./infrastructure/persistence/typeorm/entities/user.typeorm";

export const CommandHandlers = [RegisterPersonHandler, RegisterCompanyHandler];
export const EventHandlers = [PersonRegisteredHandler, CompanyRegisteredHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetUsersPersonHandler, GetUsersCompanyHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserTypeORM, PersonTypeORM, CompanyTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    PersonApplicationService,
    CompanyApplicationService,
    RegisterPersonValidator,
    RegisterCompanyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}