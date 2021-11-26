import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterStudentRequest } from '../application/dtos/request/register-student-request.dto';
import { RegisterStudentResponse } from '../application/dtos/response/register-student-response.dto';
import { TeacherApplicationService } from '../application/services/teacher-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersStudentQuery } from '../application/queries/get-users-student.query';
import { StudentApplicationService } from '../application/services/student-application.service';
import { RegisterTeacherRequest } from '../application/dtos/request/register-teacher-request.dto';
import { RegisterTeacherResponse } from '../application/dtos/response/register-teacher-response.dto';
import { GetUsersTeacherQuery } from '../application/queries/get-users-teacher.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly studentApplicationService: StudentApplicationService,
    private readonly teacherApplicationService: TeacherApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/student')
  async registerStudent(
    @Body() registerStudentRequest: RegisterStudentRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterStudentResponse> = await this.studentApplicationService.register(registerStudentRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Post('/teacher')
  async registerTeacher(
    @Body() registerTeacherRequest: RegisterTeacherRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterTeacherResponse> = await this.teacherApplicationService.register(registerTeacherRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/student')
  async getUsersStudent(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const users = await this.queryBus.execute(new GetUsersStudentQuery());
      return ApiController.ok(response, users);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/teacher')
  async getUsersTeacher(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const users = await this.queryBus.execute(new GetUsersTeacherQuery());

      return ApiController.ok(response, users);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}