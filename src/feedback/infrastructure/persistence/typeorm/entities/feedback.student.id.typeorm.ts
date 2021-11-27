import { Column } from 'typeorm';

export class feedbackStudentIdTypeorm {
  @Column( { type: 'bigint', name: 'student_id',  nullable: false })
  public value: number;
  private constructor(value: number) {
    this.value = Number (value);
  }

  public static from(value: number): feedbackStudentIdTypeorm {
    return new feedbackStudentIdTypeorm(value);
  }
}
