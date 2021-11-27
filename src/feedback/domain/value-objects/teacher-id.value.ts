export class TeacherId {
  private readonly value: number;

  private constructor(value: number) {
    this.value =Number(value);
  }

  public static create(value: number) : TeacherId{
    return new TeacherId(value);
  }

  public getValue(): number {
    return Number( this.value);
  }
}
