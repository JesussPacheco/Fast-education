export class OpenAccountRequest {
  constructor(
    public readonly studentId: number,
    public readonly number: string
  ) {
  }
}