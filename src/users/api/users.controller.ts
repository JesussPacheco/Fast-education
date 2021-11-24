import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterStudentRequest } from '../application/dtos/request/register-student-request.dto';
import { RegisterStudentResponse } from '../application/dtos/response/register-student-response.dto';
import { CompanyApplicationService } from '../application/services/company-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersStudentQuery } from '../application/queries/get-users-student.query';
import { StudentApplicationService } from '../application/services/student-application.service';
import { RegisterCompanyRequest } from '../application/dtos/request/register-company-request.dto';
import { RegisterCompanyResponse } from '../application/dtos/response/register-company-response.dto';
import { GetUsersCompanyQuery } from '../application/queries/get-users-company.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly studentApplicationService: StudentApplicationService,
    private readonly companyApplicationService: CompanyApplicationService,
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

  @Post('/company')
  async registerCompany(
    @Body() registerCompanyRequest: RegisterCompanyRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCompanyResponse> = await this.companyApplicationService.register(registerCompanyRequest);
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

  @Get('/company')
  async getUsersCompany(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const users = await this.queryBus.execute(new GetUsersCompanyQuery());

      return ApiController.ok(response, users);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}