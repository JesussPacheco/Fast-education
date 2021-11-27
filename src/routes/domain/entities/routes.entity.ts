import { AggregateRoot } from '@nestjs/cqrs';
import { RouteId } from '../value-objects/route-id.value';
import { RouteName } from '../value-objects/route-name.value';
import { GradeId } from '../value-objects/grade-id.value';
import { UniversityId } from '../value-objects/university-id.value';
import { RouteRegisterEvent } from '../events/route-register.event';

export class Route extends AggregateRoot {
  private id: RouteId;
  private name: RouteName;
  private universityId: UniversityId;
  private gradeId: GradeId;
  public constructor(
    id: RouteId,
    name: RouteName,
    universityId: UniversityId,
    gradeId: GradeId,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.universityId = universityId;
    this.gradeId = gradeId;
  }
  public register() {
    const event = new RouteRegisterEvent(
      this.id.getValue(),
      this.name.getValue(),
      this.universityId.getValue(),
      this.gradeId.getValue(),
    );
    this.apply(event);
  }

  public getId(): RouteId {
    return this.id;
  }
  public getName(): RouteName {
    return this.name;
  }
  public getUniversityId(): UniversityId {
    return this.universityId;
  }
  public getGradeId(): GradeId {
    return this.gradeId;
  }
  public changeId(id: RouteId) {
    this.id = id;
  }
}
