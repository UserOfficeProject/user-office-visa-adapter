import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { UserDataSource } from '../../datasources/UserDataSource';
import { User } from '../../models/User';

const userDataSource = container.resolve<UserDataSource>(Tokens.UserDataSource);

const handleUserUpdated: ConsumerCallback = async (_type, message) => {
  const user = message as unknown as User;
  await userDataSource.update(user);
};

const handleUserDeleted: ConsumerCallback = async (_type, message) => {
  const user = message as unknown as User;
  await userDataSource.delete(user.id);
};

export { handleUserUpdated, handleUserDeleted };
