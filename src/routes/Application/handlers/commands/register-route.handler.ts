import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterRouteCommand } from '../../commands/register-route.command';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteTypeorm } from '../../../infrastructure/persistence/typeorm/entities/route.typeorm';
import { Repository } from 'typeorm';
import { Route } from '../../../domain/entities/routes.entity';

import { RouteMapper } from '../../mappers/route.mapper';
import { RouteId } from '../../../domain/value-objects/route-id.value';
import { RouteName } from '../../../domain/value-objects/route-name.value';
import { UniversityId } from '../../../domain/value-objects/university-id.value';
import { GradeId } from '../../../domain/value-objects/grade-id.value';
import { RouteFactory } from '../../../domain/factories/route.factory';

@CommandHandler(RegisterRouteCommand)
export class RegisterRouteHandler
  implements ICommandHandler<RegisterRouteCommand>
{
  constructor(
    @InjectRepository(RouteTypeorm)
    private routeRepository: Repository<RouteTypeorm>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterRouteCommand) {
    console.log("sign execute")
    const nameResult = RouteName.create(command.name);
    const universityIdResult = UniversityId.create(command.universityId);
    const gradeIdResult = GradeId.create(command.gradeId);
console.log(nameResult);
console.log(universityIdResult);
console.log(gradeIdResult);
    let route: Route = RouteFactory.createFrom(
      nameResult,
      universityIdResult,
      gradeIdResult,
    );
    console.log(route);
    let routeTypeORM = RouteMapper.toTypeORM(route);
    routeTypeORM = await this.routeRepository.save(routeTypeORM);
    if (routeTypeORM == null) {
      return 0;
    }
    console.log( "============typeof RouteTypeorm.id")
    console.log( typeof routeTypeORM.id)
    let routeId :number = 0;
    routeId = Number(routeTypeORM.id.value);
    route.changeId(RouteId.create(routeId));
    route = this.publisher.mergeObjectContext(route);
    route.register();
    route.commit();
    return routeId;
  }
}
