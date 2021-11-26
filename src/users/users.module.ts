import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { TeacherApplicationService } from './application/services/teacher-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterStudentValidator } from './application/validators/register-student.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTeacherHandler } from './application/handlers/commands/register-teacher.handler';
import { StudentRegisteredHandler } from './application/handlers/events/student-registered.handler';
import { GetUsersStudentHandler } from './application/handlers/queries/get-users-student.handler';
import { StudentApplicationService } from './application/services/student-application.service';
import { RegisterTeacherValidator } from './application/validators/register-teacher.validator';
import { RegisterStudentHandler } from './application/handlers/commands/register-student.handler';
import { TeacherTypeORM } from './infrastructure/persistence/typeorm/entities/teacher.typeorm';
import { StudentTypeORM } from './infrastructure/persistence/typeorm/entities/student.typeorm';

import { TeacherRegisteredHandler } from './application/handlers/events/teacher-registered.handler';
import { GetUsersTeacherHandler } from './application/handlers/queries/get-users-teacher.handler';
import { UserTypeORM } from './infrastructure/persistence/typeorm/entities/user.typeorm';

export const CommandHandlers = [RegisterStudentHandler, RegisterTeacherHandler];
export const EventHandlers = [StudentRegisteredHandler, TeacherRegisteredHandler];
export const QueryHandlers = [GetUsersStudentHandler, GetUsersTeacherHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserTypeORM, StudentTypeORM, TeacherTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [
    StudentApplicationService,
    TeacherApplicationService,
    RegisterStudentValidator,
    RegisterTeacherValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}