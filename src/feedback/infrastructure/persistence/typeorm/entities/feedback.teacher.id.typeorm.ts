import { Column } from 'typeorm';

export class FeedbackTeacherIdTypeorm {
  @Column({ type: 'bigint', name: 'teacher_id', nullable: false })
  public  value: number;
  private constructor(value: number) {
    this.value =Number(value);
  }

  public static from(value: number): FeedbackTeacherIdTypeorm {
    return new FeedbackTeacherIdTypeorm(value);
  }
}
