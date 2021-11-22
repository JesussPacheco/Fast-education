import { Column } from 'typeorm';
export class RouteNameTypeorm {
  @Column('varchar', { name: 'name', length: 75, nullable: false })
  public firstName: string;

  private constructor(name: string) {
    this.firstName = name;
  }

  public static from(name): RouteNameTypeorm {
    return new RouteNameTypeorm(name);
  }
}