import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { UserDataSource } from '../../datasources/UserDataSource';
import {
  UserDeletionEventPayload,
  UserUpdationEventPayload,
} from '../../types/user';

const userDataSource = container.resolve<UserDataSource>(Tokens.UserDataSource);

const handleUserUpdated: ConsumerCallback = async (_type, message) => {
  const user = message as unknown as UserUpdationEventPayload;
  await userDataSource.update(user);
};

const handleUserDeleted: ConsumerCallback = async (_type, message) => {
  const user = message as unknown as UserDeletionEventPayload;
  await userDataSource.delete(user.id);
};

export { handleUserUpdated, handleUserDeleted };
