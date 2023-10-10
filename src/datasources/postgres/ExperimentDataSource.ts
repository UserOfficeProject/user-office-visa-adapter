import { Knex } from 'knex';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { Experiment } from '../../models/Experiment';
import { ExperimentRecord, createExperimentObject } from '../../types/records';
import { ExperimentDataSource } from '../ExperimentDataSource';
import Database from './database/index';
export default class PostgresExperimentDataSource
  implements ExperimentDataSource
{
  private TABLE_NAME = 'experiment';
  private database: Knex;
  constructor() {
    const databaseInstance = container.resolve<Database>(Tokens.Database);
    (async () => {
      this.database = await databaseInstance.connect();
    })();
  }
  async getByProposalId(proposalPk: number): Promise<Experiment | null> {
    return await this.database(this.TABLE_NAME)
      .where({
        proposal_id: proposalPk,
      })
      .first()
      .then((experiment: ExperimentRecord | null) => {
        return experiment ? createExperimentObject(experiment) : null;
      });
  }

  async create({
    proposalPk,
    instrumentId,
  }: {
    proposalPk: number;
    instrumentId: number;
  }): Promise<Experiment> {
    const experimentExists = await this.database(this.TABLE_NAME).where({
      proposal_id: proposalPk,
    });

    if (experimentExists.length > 0) {
      return await this.database(this.TABLE_NAME)
        .where({
          proposal_id: proposalPk,
        })
        .update({
          instrument_id: instrumentId,
        })
        .returning(['*'])
        .then((experiment: ExperimentRecord[]) => {
          return createExperimentObject(experiment[0]);
        });
    }

    return await this.database(this.TABLE_NAME)
      .insert({
        id: proposalPk,
        proposal_id: proposalPk,
        instrument_id: instrumentId,
        start_date: '2022-01-01 00:00:00',
        end_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
      })
      .returning(['*'])
      .then(async (experiment: ExperimentRecord[]) => {
        return createExperimentObject(experiment[0]);
      });
  }
}
