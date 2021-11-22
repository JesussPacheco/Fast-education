import { Column, Entity, Unique } from 'typeorm';
import { RouteIdTypeORM } from './route.id.typeorm';
import { RouteNameTypeorm } from './route-name.typeorm';
import { RouteUniversityIdTypeorm } from './route-university.id.typeorm';
import { RouteGradeIdTypeorm } from './route-grade.id.typeorm';
@Entity('routes')
@Unique('UQ_routes_id', ['id.value'])
export class RouteTypeorm {
  @Column(() => RouteIdTypeORM, { prefix: false })
  public id: RouteIdTypeORM;

  @Column(() => RouteNameTypeorm, { prefix: false })
  public name: RouteNameTypeorm;

  @Column(() => RouteUniversityIdTypeorm, { prefix: false })
  public universityId: RouteUniversityIdTypeorm;

  @Column(() => RouteGradeIdTypeorm, { prefix: false })
  public gradeId: RouteGradeIdTypeorm;
  static id: RouteIdTypeORM;
}
