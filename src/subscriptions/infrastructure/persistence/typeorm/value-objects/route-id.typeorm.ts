import { Column } from 'typeorm';

export class RouteIdTypeorm {
  @Column('bigint', { name: 'route_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): RouteIdTypeorm {
    return new RouteIdTypeorm(value);
  }
}