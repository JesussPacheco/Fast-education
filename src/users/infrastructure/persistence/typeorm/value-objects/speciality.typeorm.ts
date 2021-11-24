import { Column, Unique } from 'typeorm';

export class SpecialityTypeORM {
  @Column('varchar', { name: 'speciality', length: 11, nullable: true })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): SpecialityTypeORM {
    return new SpecialityTypeORM(value);
  }
}