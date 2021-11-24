import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterPersonRequest } from '../application/dtos/request/register-person-request.dto';
import { RegisterPersonResponse } from '../application/dtos/response/register-person-response.dto';
import { CompanyApplicationService } from '../application/services/company-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersPersonQuery } from '../application/queries/get-users-person.query';
import { PersonApplicationService } from '../application/services/person-application.service';
import { RegisterCompanyRequest } from '../application/dtos/request/register-company-request.dto';
import { RegisterCompanyResponse } from '../application/dtos/response/register-company-response.dto';
import { GetUsersCompanyQuery } from '../application/queries/get-users-company.query';

@Controller('users')
export class UsersController {
  constructor(
    private readonly personApplicationService: PersonApplicationService,
    private readonly companyApplicationService: CompanyApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/person')
  async registerPerson(
    @Body() registerPersonRequest: RegisterPersonRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPersonResponse> = await this.personApplicationService.register(registerPersonRequest);
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

  @Get('/person')
  async getUsersPerson(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const users = await this.queryBus.execute(new GetUsersPersonQuery());
      console.log("jjjj")
      console.log(users)
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