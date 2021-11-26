export class RouteName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    return new RouteName(value);
  }

  public getValue(): string {
    return this.value;
  }
}