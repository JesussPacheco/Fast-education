export class TransferResponseDto {
  constructor(
    public readonly subscriptionId: number,
    public readonly subscriptionType: string,
    public readonly fromAccountNumber: string,
    public readonly toAccountNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string
  ) {
  }
}