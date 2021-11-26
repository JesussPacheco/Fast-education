export class FeedbackRegisterEvents {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly teacherId: number,
    private readonly studentId: number,
    private readonly routerId: number,
  ) {}
}
