export class RouteId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static create(value: number):RouteId {
    return new RouteId(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}
