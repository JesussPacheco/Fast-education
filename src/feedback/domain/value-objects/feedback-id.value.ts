export class FeedbackId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static create(value: number): FeedbackId {

    return new FeedbackId(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}
