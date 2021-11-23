import { CustomerRegistered } from './customer-registered.event';

export class TeacherRegistered extends CustomerRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly hour: number,
  ) {
    super(id);
  }
}
