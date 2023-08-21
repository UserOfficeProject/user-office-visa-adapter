import { User } from '../../models/User';
import { UserDataSource } from '../UserDataSource';
import database from './database';

export default class PostgresUserDataSource implements UserDataSource {
  private TABLE_NAME = 'users';

  async create(user: User): Promise<User> {
    const userExists = await database(this.TABLE_NAME).where({
      email: user.email,
    });

    if (userExists.length > 0) {
      return userExists[0];
    }

    // Insert into users table
    await database(this.TABLE_NAME).insert({
      id: user.email,
      email: user.email,
      first_name: user.firstname ?? '',
      last_name: user.lastname ?? '',
      instance_quota: 1,
    });

    return user;
  }
  async update(user: User): Promise<User> {
    const userExists = await database(this.TABLE_NAME).where({
      email: user.email,
    });

    // Update only if the User exists and submitted
    if (userExists) {
      await database(this.TABLE_NAME)
        .where({
          email: user.email,
        })
        .update({
          first_name: user.firstname ?? '',
          last_name: user.lastname ?? '',
        });
    }

    return user;
  }

  async delete(id: number) {
    await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .delete();

    return id;
  }
}
