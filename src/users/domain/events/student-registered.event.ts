import { UserRegistered } from './user-registered.event';

export class StudentRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
  ) {
    super(id);
  }
}