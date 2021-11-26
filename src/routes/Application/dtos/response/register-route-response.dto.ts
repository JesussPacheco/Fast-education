export class RegisterRouteResponseDto {
  constructor(
    public id: number,
    public readonly name: string,
    public readonly universityId: number,
    public readonly gradeId: number,
  ) {}
}
