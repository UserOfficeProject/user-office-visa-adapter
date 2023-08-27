export class Role {
  constructor(
    public id: number,
    public description: string,
    public name: string
  ) {}
}

export class UserRole {
  constructor(public userId: number, public roleId: number) {}
}
