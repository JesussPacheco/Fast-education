
import { RouteIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/route.id.typeorm';
import { RouteTypeorm } from '../../infrastructure/persistence/typeorm/entities/route.typeorm';
import { RouteUniversityIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/route-university.id.typeorm';
import { RouteGradeIdTypeorm } from '../../infrastructure/persistence/typeorm/entities/route-grade.id.typeorm';
import { RouteNameTypeorm } from '../../infrastructure/persistence/typeorm/entities/route-name.typeorm';
import { Route } from '../../domain/entities/routes.entity';

export class RouteMapper {
  public static toTypeORM(route: Route): RouteTypeorm {
    const routeTypeORM: RouteTypeorm = new RouteTypeorm();
    routeTypeORM.id = RouteIdTypeORM.from(route.getId().getValue());
    routeTypeORM.name = RouteNameTypeorm.from(route.getName().getValue());
    routeTypeORM.universityId=RouteUniversityIdTypeorm.from(route.getUniversityId().getValue());
    routeTypeORM.gradeId=RouteGradeIdTypeorm.from(route.getGradeId().getValue());
    return routeTypeORM;
  }
}