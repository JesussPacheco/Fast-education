import { Column } from 'typeorm';

export class TeacherNameTypeORM {
  @Column('varchar', { name: 'teacher_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): TeacherNameTypeORM {
    return new TeacherNameTypeORM(name);
  }
}
