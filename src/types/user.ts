export interface UserUpdationEventPayload {
  id: number;
  user_title: string;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  preferredname: string;
  oidcSub: string;
  oauthRefreshToken: string;
  oauthAccessToken: string;

  oauthIssuer: string;
  oauthgenderccessToken: string;
  nationality: number;
  birthdate: string;
  organisation: number;

  department: string;
  position: string;
  email: string;
  emailVerified: boolean;

  telephone: string;
  telephone_alt: string;
  placeholder: string;
  created: string;
  updated: string;
}

export type UserDeletionEventPayload = UserUpdationEventPayload;
