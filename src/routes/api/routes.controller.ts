import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RoutesApplicationService } from '../Application/services/routes-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterRouteRequestDto } from '../Application/dtos/request/register-route-request.dti';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterRouteResponseDto } from '../Application/dtos/response/register-route-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetRoutesQuery } from '../Application/queris/get-routes.query';

@Controller('routes')
export class RoutesController{
  constructor(
    private readonly routesApplicationService: RoutesApplicationService,
    private readonly queryBus: QueryBus,
  ) {
  }
  @Post()
  async register(
    @Body() registerRouteRequestDto: RegisterRouteRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      console.log(registerRouteRequestDto);
      const result: Result<AppNotification, RegisterRouteResponseDto> =
        await this.routesApplicationService.register(registerRouteRequestDto);
      console.log(result)
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.created(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Get()
  async getRoutes(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const routes = await this.queryBus.execute(new GetRoutesQuery());
      console.log("response");
      console.log(routes)
      return ApiController.ok(response, routes);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
