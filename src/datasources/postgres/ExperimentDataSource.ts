import { Experiment } from '../../models/Experiment';
import { ExperimentRecord, createExperimentObject } from '../../types/records';
import { ExperimentDataSource } from '../ExperimentDataSource';
import database from './database';

export default class PostgresExperimentDataSource
  implements ExperimentDataSource
{
  private TABLE_NAME = 'experiment';

  async getByProposalId(proposalPk: number): Promise<Experiment | null> {
    return await database(this.TABLE_NAME)
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
    const experimentExists = await database(this.TABLE_NAME).where({
      proposal_id: proposalPk,
    });

    if (experimentExists.length > 0) {
      return await database(this.TABLE_NAME)
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

    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);

    return await database(this.TABLE_NAME)
      .insert({
        id: proposalPk,
        proposal_id: proposalPk,
        instrument_id: instrumentId,
        start_date: now,
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
