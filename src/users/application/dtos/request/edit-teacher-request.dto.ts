export class EditTeacherRequest {
  constructor(
    public readonly name: string,
    public readonly ruc: string,
    public readonly speciality:string
  ) {}
}