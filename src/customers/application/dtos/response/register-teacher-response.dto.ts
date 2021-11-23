export class RegisterTeacherResponse {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly hours: number,
  ) {}
}
