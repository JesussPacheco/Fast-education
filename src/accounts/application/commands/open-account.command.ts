export class OpenAccount {
  constructor(
    public readonly customerId: number,
    public readonly number: string,
    public readonly expirationDate: string,
    public readonly securityCode: number
  ) {}
}
