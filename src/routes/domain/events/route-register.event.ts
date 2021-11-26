export class RouteRegisterEvent {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly university: number,
    public readonly grade: number,
  ) {}
}
