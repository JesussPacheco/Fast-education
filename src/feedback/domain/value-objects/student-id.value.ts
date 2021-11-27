export class StudentId {
  private readonly value: number;

  private constructor(value: number) {
    this.value =Number(value);
  }

  public static create(value: number):StudentId {
    return new StudentId(value);
  }

  public getValue(): number {
    return Number (this.value);
  }
}
