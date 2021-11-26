import { UserRegistered } from './user-registered.event';

export class TeacherRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public  readonly speciality:string
  ) {
    super(id);
  }
}