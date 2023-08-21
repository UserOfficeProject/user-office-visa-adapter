import { Proposal } from '../models/Proposal';

export interface ProposalDataSource {
  create(proposal: Proposal): Promise<Proposal>;
  update(proposal: Proposal): Promise<Proposal>;
  delete(id: number): Promise<number>;
}
