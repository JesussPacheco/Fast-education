import { Column, Unique } from 'typeorm';

export class RouteGradeIdTypeorm {
  @Column('varchar', { name: 'grade_id', length: 8, nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): RouteGradeIdTypeorm {
    return new RouteGradeIdTypeorm(value);
  }
}