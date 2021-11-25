export class WithdrawRequestDto {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly routeId:string,
    public readonly membership:string
  ) {
  }
}