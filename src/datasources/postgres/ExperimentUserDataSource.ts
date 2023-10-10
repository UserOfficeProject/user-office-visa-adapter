import { Knex } from 'knex';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { ExperimentUser } from '../../models/ExperimentUser';
import {
  ExperimentUserRecord,
  createExperimentUserObject,
} from '../../types/records';
import { ExperimentUserDataSource } from '../ExperimentUserDataSource';
import Database from './database/index';
export default class PostgresExperimentUserDataSource
  implements ExperimentUserDataSource
{
  private TABLE_NAME = 'experiment_user';
  private database: Knex;
  constructor() {
    const databaseInstance = container.resolve<Database>(Tokens.Database);
    (async () => {
      this.database = await databaseInstance.connect();
    })();
  }
  async create({
    experimentId,
    userId,
  }: {
    experimentId: string;
    userId: string;
  }): Promise<ExperimentUser> {
    const experimentUserExists = await this.database(this.TABLE_NAME).where({
      experiment_id: experimentId,
      user_id: userId,
    });

    if (experimentUserExists.length > 0) {
      return experimentUserExists[0];
    }

    return await this.database(this.TABLE_NAME)
      .insert({
        experiment_id: experimentId,
        user_id: userId,
      })
      .returning(['*'])
      .then((experimentUser: ExperimentUserRecord[]) => {
        return createExperimentUserObject(experimentUser[0]);
      });
  }
}
