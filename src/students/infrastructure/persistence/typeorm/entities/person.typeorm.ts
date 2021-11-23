import { ChildEntity, Column, Unique } from 'typeorm';
import { StudentTypeORM } from './student.typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/person-name.typeorm';
import { StudentType } from '../../../../domain/enums/student-type.enum';

@ChildEntity(StudentType.PERSON)
@Unique('UQ_students_dni', ['dni.value'])
export class PersonTypeORM extends StudentTypeORM {
  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
}