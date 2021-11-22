import { Column, Unique } from 'typeorm';

export class RouteUniversityIdTypeorm {
  @Column('varchar', { name: 'university_id', length: 8, nullable: false })
  value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): RouteUniversityIdTypeorm {
    return new RouteUniversityIdTypeorm(value);
  }
}