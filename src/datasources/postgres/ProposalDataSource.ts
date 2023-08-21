import { Proposal } from '../../models/Proposal';
import { ProposalDataSource } from '../ProposalDataSource';
import database from './database';

export default class PostgresProposalDataSource implements ProposalDataSource {
  private TABLE_NAME = 'proposal';

  async create(proposal: Proposal): Promise<Proposal> {
    await database(this.TABLE_NAME).insert({
      id: proposal.proposalPk,
      identifier: proposal.shortCode,
      title: proposal.title,
      summary: proposal.abstract,
    });

    return proposal;
  }

  async update(proposal: Proposal): Promise<Proposal> {
    const proposalExists = await database(this.TABLE_NAME)
      .where({
        id: proposal.proposalPk,
      })
      .first();

    // Update only if the Proposal exists and submitted
    if (proposalExists && proposal.submitted) {
      await database(this.TABLE_NAME)
        .where({
          id: proposal.proposalPk,
        })
        .update({
          identifier: proposal.proposalId,
          title: proposal.title,
          summary: proposal.abstract,
        });
    }

    return proposal;
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
