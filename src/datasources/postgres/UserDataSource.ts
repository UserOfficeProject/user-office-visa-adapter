import { Employer } from '../../models/Employer';
import { User } from '../../models/User';
import { ProposerPayload } from '../../types/proposal';
import {
  EmployerRecord,
  UserRecord,
  createEmployerObject,
  createUserObject,
} from '../../types/records';
import { UserUpdationEventPayload } from '../../types/user';
import { UserDataSource } from '../UserDataSource';
import database from './database';

export default class PostgresUserDataSource implements UserDataSource {
  private TABLE_NAME = 'users';
  private EMPLOYER_TABLE_NAME = 'employer';
  async create(user: ProposerPayload): Promise<User> {
    const userExists = await database(this.TABLE_NAME)
      .where({
        id: user.email,
      })
      .first()
      .then((user: UserRecord) => {
        return user ? createUserObject(user) : null;
      });
    // Create an Employer, if it does not exist
    let employer: Employer;
    const employerExists = await database(this.EMPLOYER_TABLE_NAME)
      .where({
        name: user.institution.name,
      })
      .first()
      .then((employer: EmployerRecord) => {
        return employer ? createEmployerObject(employer) : null;
      });

    if (employerExists) {
      employer = employerExists;
    } else {
      employer = await database(this.EMPLOYER_TABLE_NAME)
        .insert({
          id: user.institution.id,
          name: user.institution.name,
          // country_code: user.country.country ?? '',
        })
        .returning(['*'])
        .then((employer: EmployerRecord[]) => {
          return createEmployerObject(employer[0]);
        });
    }
    if (userExists) {
      // Update user table if the institution_id is different
      if (userExists.affiliationId !== employer.id) {
        return await database(this.TABLE_NAME)
          .where({
            email: user.email,
          })
          .update({
            affiliation_id: employer.id,
          })
          .returning(['*'])
          .then((user: UserRecord[]) => {
            return createUserObject(user[0]);
          });
      } else {
        return userExists;
      }
    } else {
      // Insert into users table
      return await database(this.TABLE_NAME)
        .insert({
          id: user.email,
          email: user.email,
          first_name: user.firstName ?? '',
          last_name: user.lastName ?? '',
          instance_quota: 1,
          affiliation_id: employer.id,
        })
        .returning(['*'])
        .then((user: UserRecord[]) => {
          return createUserObject(user[0]);
        });
    }
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
