import { InjectRepository } from '@nestjs/typeorm';//vacan
import { RouteTypeorm } from '../../infrastructure/persistence/typeorm/entities/route.typeorm';//vacan
import { Repository } from 'typeorm';//vacan
import { RegisterRouteRequestDto } from '../dtos/request/register-route-request.dti';//vacan
import { AppNotification } from '../../../common/application/app.notification';//vacan
import { Injectable } from "@nestjs/common";//vacan

@Injectable()
export class RegisterRouteValidator {
  constructor(
    @InjectRepository(RouteTypeorm)
    private routeRepository: Repository<RouteTypeorm>,
  ) {}
  public async validate(
    registerRouteRequestDto: RegisterRouteRequestDto,
  ): Promise<AppNotification> {
    console.log(registerRouteRequestDto)
    console.log("failed in validate")
    const notification: AppNotification = new AppNotification();
    const name: string = registerRouteRequestDto.name?registerRouteRequestDto.name.trim():' ';
    if (name.length <= 0) {
      notification.addError('Student name is required', null);
    }
    return notification;
  }
}
