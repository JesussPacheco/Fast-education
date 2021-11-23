import { StudentRegistered } from './student-registered.event';

export class CompanyRegistered extends StudentRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}