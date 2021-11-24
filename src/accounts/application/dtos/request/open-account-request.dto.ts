export class OpenAccountRequest {
  constructor(
    public readonly userId: number,
    public readonly number: string
  ) {
  }
}