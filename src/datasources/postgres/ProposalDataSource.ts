import { Proposal } from '../../models/Proposal';
import {
  ProposalSubmissionEventPayload,
  ProposalUpdationEventPayload,
} from '../../types/proposal';
import { ProposalRecord, createProposalObject } from '../../types/records';
import { ProposalDataSource } from '../ProposalDataSource';
import database from './database';

export default class PostgresProposalDataSource implements ProposalDataSource {
  private TABLE_NAME = 'proposal';

  async get(id: number): Promise<Proposal | null> {
    return await database(this.TABLE_NAME)
      .where({
        id,
      })
      .first()
      .then((proposal: ProposalRecord | null) => {
        return proposal ? createProposalObject(proposal) : null;
      });
  }
  async create(proposal: ProposalSubmissionEventPayload): Promise<Proposal> {
    return await database(this.TABLE_NAME)
      .insert({
        id: proposal.proposalPk,
        identifier: proposal.shortCode,
        title: proposal.title,
        summary: proposal.abstract,
      })
      .returning(['*'])
      .then(async (proposal: ProposalRecord[]) => {
        return createProposalObject(proposal[0]);
      });
  }

  async update(proposal: ProposalUpdationEventPayload): Promise<Proposal> {
    const proposalExists = await database(this.TABLE_NAME)
      .where({
        id: proposal.proposalPk,
      })
      .first();

    // Update only if the Proposal exists and submitted
    if (proposalExists && proposal.submitted) {
      return await database(this.TABLE_NAME)
        .where({
          id: proposal.proposalPk,
        })
        .update({
          identifier: proposal.proposalPk,
          title: proposal.title,
          summary: proposal.abstract,
        })
        .returning(['*'])
        .then((proposal: ProposalRecord[]) => {
          return createProposalObject(proposal[0]);
        });
    } else return proposalExists;
  }

  async delete(id: number) {
    await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .delete()
      .returning(['*'])
      .then((proposal: ProposalRecord[]) => {
        return createProposalObject(proposal[0]);
      });

    return id;
  }
}
