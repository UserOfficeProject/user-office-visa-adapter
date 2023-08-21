import { Proposal } from '../../models/Proposal';
import { ProposalDataSource } from '../ProposalDataSource';

export default class MockProposalDataSource implements ProposalDataSource {
  update(proposal: Proposal): Promise<Proposal> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async create(proposal: Proposal): Promise<Proposal> {
    return proposal;
  }
}
