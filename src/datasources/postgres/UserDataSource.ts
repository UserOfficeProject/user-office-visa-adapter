import { User } from '../../models/User';
import { ProposerPayload } from '../../types/proposal';
import { UserRecord, createUserObject } from '../../types/records';
import { UserUpdationEventPayload } from '../../types/user';
import { UserDataSource } from '../UserDataSource';
import database from './database';

export default class PostgresUserDataSource implements UserDataSource {
  private TABLE_NAME = 'users';

  async create(user: ProposerPayload): Promise<User> {
    const userExists = await database(this.TABLE_NAME).where({
      email: user.email,
    });

    if (userExists.length > 0) {
      return userExists[0];
    }

    // Create an Insitute, if it does not exist

    // Insert into users table
    return await database(this.TABLE_NAME)
      .insert({
        id: user.email,
        email: user.email,
        first_name: user.firstName ?? '',
        last_name: user.lastName ?? '',
        instance_quota: 1,
      })
      .returning(['*'])
      .then((user: UserRecord[]) => {
        return createUserObject(user[0]);
      });
  }

  async update(user: UserUpdationEventPayload): Promise<User> {
    const userExists = await database(this.TABLE_NAME).where({
      email: user.email,
    });

    // Update only if the User exists and submitted
    if (userExists) {
      return await database(this.TABLE_NAME)
        .where({
          email: user.email,
        })
        .update({
          first_name: user.firstname ?? '',
          last_name: user.lastname ?? '',
        })
        .returning(['*'])
        .then((user: UserRecord[]) => {
          return createUserObject(user[0]);
        });
    } else return userExists;
  }

  async delete(id: number) {
    await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .delete()
      .returning(['*'])
      .then((user: UserRecord[]) => {
        return createUserObject(user[0]);
      });

    return id;
  }
}
