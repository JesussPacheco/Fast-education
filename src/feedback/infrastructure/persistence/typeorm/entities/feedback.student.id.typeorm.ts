import { Column } from 'typeorm';

export class feedbackStudentIdTypeorm {
  @Column( { type: 'bigint', name: 'student_id',  nullable: false })
  value: number;
  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): feedbackStudentIdTypeorm {
    return new feedbackStudentIdTypeorm(value);
  }
}
