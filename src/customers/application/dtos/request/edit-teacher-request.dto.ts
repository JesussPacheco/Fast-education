export class EditTeacherRequest {
  constructor(
    public readonly name: string,
    public readonly hours: number,
    public readonly grade: number,
  ) {}
}
