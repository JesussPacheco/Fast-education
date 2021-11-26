export class FeedbackName {
  private readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string) {
    return new FeedbackName(value);
  }
  public gwtValue(): string{
    return this.value;
  }
}
