export class RegisterFeedbackResponseDto {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly teacherId: number,
    public readonly studentId: number,
    public readonly routerId: number,
  ) {}
}
