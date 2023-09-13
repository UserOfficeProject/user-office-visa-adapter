import { ExperimentUser } from '../../models/ExperimentUser';
import {
  ExperimentUserRecord,
  createExperimentUserObject,
} from '../../types/records';
import { ExperimentUserDataSource } from '../ExperimentUserDataSource';
import database from './database';

export default class PostgresExperimentUserDataSource
  implements ExperimentUserDataSource
{
  private TABLE_NAME = 'experiment_user';
  async create({
    experimentId,
    userId,
  }: {
    experimentId: string;
    userId: string;
  }): Promise<ExperimentUser> {
    const experimentUserExists = await database(this.TABLE_NAME).where({
      experiment_id: experimentId,
      user_id: userId,
    });

    if (experimentUserExists.length > 0) {
      return experimentUserExists[0];
    }

    return await database(this.TABLE_NAME)
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
