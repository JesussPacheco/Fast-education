export class RegisterTeacherRequest {
  constructor(
    public readonly name: string,
    public readonly hour: number,
  ) {}
}
