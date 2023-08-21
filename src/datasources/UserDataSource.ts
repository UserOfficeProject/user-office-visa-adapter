import { Role } from '../models/Role';
import { User } from '../models/User';

export interface UserLinkResponse {
  user: User;
  link: string;
}

export interface EmailInviteResponse {
  userId: number;
  inviterId: number;
  role: Role;
}

export interface UserDataSource {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(userId: number): Promise<number>;
}
