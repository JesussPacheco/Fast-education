export class RegisterFeedbackRequestDto {
  constructor(
    public readonly name: string,
    public readonly teacherId: number,
    public readonly studentId: number,
    public readonly routerId: number,
  ) {}
}
