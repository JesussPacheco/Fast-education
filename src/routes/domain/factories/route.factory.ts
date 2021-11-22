import { RouteName } from '../value-objects/route-name.value';
import { UniversityId } from '../value-objects/university-id.value';
import { Route } from '../entities/routes.entity';
import { GradeId } from '../value-objects/grade-id.value';
import { RouteId } from '../value-objects/route-id.value';
export class RouteFactory {
  public static createFrom(
    name: RouteName,
    universityId: UniversityId,
    gradeId: GradeId,
  ): Route {
    return new Route(RouteId.create(0), name, universityId, gradeId);
  }
  public static withId(
    routeId: RouteId,
    name: RouteName,
    universityId: UniversityId,
    gradeId: GradeId,
  ): Route {
    return new Route(routeId, name, universityId, gradeId);
  }
}