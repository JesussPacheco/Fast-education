export class FeedbackId {
  private readonly value: number;
  private constructor(value: number) {
    this.value = value;
  }
  public static create(value: number) {
    return new FeedbackId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
