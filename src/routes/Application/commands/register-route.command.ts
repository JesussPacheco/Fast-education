export class RegisterRouteCommand {
  constructor(
    public readonly name: string,
    public readonly universityId : number,
    public readonly gradeId: number,
  ) {}
}