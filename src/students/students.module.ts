import { Module } from '@nestjs/common';
import { StudentsController } from './api/students.controller';
import { CompanyApplicationService } from './application/services/company-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterPersonValidator } from './application/validators/register-person.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterCompanyHandler } from './application/handlers/commands/register-company.handler';
import { PersonRegisteredHandler } from './application/handlers/events/person-registered.handler';
import { GetStudentsPersonHandler } from './application/handlers/queries/get-students-person.handler';
import { PersonApplicationService } from './application/services/person-application.service';
import { RegisterCompanyValidator } from './application/validators/register-company.validator';
import { RegisterPersonHandler } from './application/handlers/commands/register-person.handler';
import { CompanyTypeORM } from './infrastructure/persistence/typeorm/entities/company.typeorm';
import { PersonTypeORM } from './infrastructure/persistence/typeorm/entities/person.typeorm';
import { StudentTypeORM } from './infrastructure/persistence/typeorm/entities/student.typeorm';
import { CompanyRegisteredHandler } from './application/handlers/events/company-registered.handler';
import { GetStudentsCompanyHandler } from './application/handlers/queries/get-students-company.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [RegisterPersonHandler, RegisterCompanyHandler];
export const EventHandlers = [PersonRegisteredHandler, CompanyRegisteredHandler, MoneyTransferredHandler];
export const QueryHandlers = [GetStudentsPersonHandler, GetStudentsCompanyHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([StudentTypeORM, PersonTypeORM, CompanyTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [StudentsController],
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
export class StudentsModule {}