
export class UniversityName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    return new UniversityName(value);
  }

  public getValue(): string {
    return this.value;
  }
}