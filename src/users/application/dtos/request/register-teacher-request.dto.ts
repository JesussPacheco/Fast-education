export class RegisterTeacherRequest {
  constructor(
    public readonly name: string,
    public readonly ruc: string,
    public readonly speciality: string,
  ) {}
}