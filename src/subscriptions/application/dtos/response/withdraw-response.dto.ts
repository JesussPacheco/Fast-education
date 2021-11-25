export class WithdrawResponseDto {
  constructor(
    public readonly subscriptionId: number,
    public readonly subscriptionType: string,
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly routeId: number,
    public readonly membership: string,
    public readonly status: string,
    public readonly createdAt: string
    
  ) {
  }
}