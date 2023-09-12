import { Proposal } from '../../models/Proposal';
import {
  ProposalSubmissionEventPayload,
  ProposalUpdationEventPayload,
} from '../../types/proposal';
import { ProposalDataSource } from '../ProposalDataSource';

export default class MockProposalDataSource implements ProposalDataSource {
  async create(proposal: ProposalSubmissionEventPayload): Promise<Proposal> {
    throw new Error('Method not implemented.');
  }

  async update(proposal: ProposalUpdationEventPayload): Promise<Proposal> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
