import { Column } from 'typeorm';

export class FeedbackRouterIdTypeorm {
  @Column({ type: 'bigint', name: 'route_id', nullable: false })
  public value: number;

  private constructor(value: number) {
    this.value = Number (value);
  }

  public static from(value: number): FeedbackRouterIdTypeorm {
    return new FeedbackRouterIdTypeorm(value);
  }
}
