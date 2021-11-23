import { StudentRegistered } from './student-registered.event';

export class PersonRegistered extends StudentRegistered {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
  ) {
    super(id);
  }
}