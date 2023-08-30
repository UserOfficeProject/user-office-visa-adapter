export class User {
  constructor(
    public id: string,
    public activatedAt: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public instanceQuota: string,
    public lastSeenAt: string,
    public affiliationId: number
  ) {}
}
