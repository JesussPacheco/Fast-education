export class AccountOpened {
  constructor(
    public readonly id: number,
    public readonly number: string,
    public readonly userId: number,
    public readonly balance:number
  ) {
  }
}