import { User } from '../models/User';
import { ProposerPayload } from '../types/proposal';
import { UserUpdationEventPayload } from '../types/user';

export interface UserDataSource {
  create(user: ProposerPayload): Promise<User | null>;
  update(user: UserUpdationEventPayload): Promise<User>;
  delete(userId: number): Promise<number>;
}
