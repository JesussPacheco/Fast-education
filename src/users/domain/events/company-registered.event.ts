import { UserRegistered } from './user-registered.event';

export class CompanyRegistered extends UserRegistered {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly ruc: string,
  ) {
    super(id);
  }
}