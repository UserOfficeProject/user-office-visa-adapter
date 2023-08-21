export class Role {
  constructor(
    public id: number,
    public shortCode: string,
    public title: string
  ) {}
}

export class RoleUser {
  constructor(
    public roleUserId: number,
    public userId: number,
    public roleId: number
  ) {}
}
