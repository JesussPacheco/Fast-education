export class OpenAccount {
  constructor(
    public readonly userId: number,
    public readonly number: string,
    public readonly balance:number
  ) {}
}