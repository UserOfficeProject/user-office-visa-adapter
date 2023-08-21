export class User {
  constructor(
    public id: number,
    public user_title: string,
    public firstname: string,
    public middlename: string | undefined,
    public lastname: string,
    public username: string,
    public preferredname: string | undefined,
    public oidcSub: string | null,
    public oauthRefreshToken: string | null,
    public oauthAccessToken: string | null,
    public oauthIssuer: string | null,
    public gender: string,
    public nationality: number,
    public birthdate: Date,
    public organisation: number,
    public department: string,
    public position: string,
    public email: string,
    public emailVerified: boolean,
    public telephone: string,
    public telephone_alt: string | undefined,
    public placeholder: boolean,
    public created: string,
    public updated: string
  ) {}
}
