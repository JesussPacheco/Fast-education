export class UniversityId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number) {
    return new UniversityId(value);
  }

  public getValue(): number {
    return this.value;
  }
}