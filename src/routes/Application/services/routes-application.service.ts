import { CommandBus } from '@nestjs/cqrs';
import { RegisterRouteValidator } from '../validators/register-route.validator';
import { RegisterRouteRequestDto } from '../dtos/request/register-route-request.dti';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterRouteResponseDto } from '../dtos/response/register-route-response.dto';
import { RegisterRouteCommand } from '../commands/register-route.command';
import { Injectable } from '@nestjs/common';
@Injectable()
export class RoutesApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerRouteValidator: RegisterRouteValidator,
  ) {}
  async register(
    registerRouteRequestDTO: RegisterRouteRequestDto,
  ): Promise<Result<AppNotification, RegisterRouteResponseDto>> {
    console.log("aqui?")
    console.log(registerRouteRequestDTO)
    const notification: AppNotification =
      await this.registerRouteValidator.validate(registerRouteRequestDTO);
    console.log("pasa la ´rueba?")
    if (notification.hasErrors()) {
      console.log("entra has erros")
      return Result.error(notification);
    }
    const registerRouterCommand: RegisterRouteCommand =
      new RegisterRouteCommand(
        registerRouteRequestDTO.name,
        registerRouteRequestDTO.universityId,
        registerRouteRequestDTO.gradeId,
      );
    const routeId = await this.commandBus.execute(registerRouterCommand);
    const registerRouteResponseDto: RegisterRouteResponseDto =
      new RegisterRouteResponseDto(
        routeId,
        registerRouteRequestDTO.name,
        registerRouteRequestDTO.universityId,
        registerRouteRequestDTO.gradeId,
      );
    return Result.ok(registerRouteResponseDto);
  }
}
