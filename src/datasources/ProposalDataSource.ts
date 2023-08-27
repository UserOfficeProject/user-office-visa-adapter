import { Proposal } from '../models/Proposal';
import {
  ProposalSubmissionEventPayload,
  ProposalUpdationEventPayload,
} from '../types/proposal';

export interface ProposalDataSource {
  create(proposal: ProposalSubmissionEventPayload): Promise<Proposal>;
  update(proposal: ProposalUpdationEventPayload): Promise<Proposal>;
  delete(id: number): Promise<number>;
}
