export class Speciality {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    return new Speciality(value);
  }

  public getValue(): string {
    return this.value;
  }
}