import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { ProposalDataSource } from '../../datasources/ProposalDataSource';
import { UserDataSource } from '../../datasources/UserDataSource';
import { Instrument } from '../../models/Instrument';
import {
  Proposal,
  ProposalStatusDefaultShortCodes,
} from '../../models/Proposal';
import { User } from '../../models/User';

export interface ProposalWithNewStatus {
  proposalPk: Proposal['proposalPk'];
  shortCode: Proposal['shortCode'];
  instrument: Instrument;
  title: Proposal['title'];
  abstract: Proposal['abstract'];
  callId: number;
  allocatedTime: number;
  instrumentId: Instrument['id'];
  members: User[];
  newStatus: ProposalStatusDefaultShortCodes;
  submitted: Proposal['submitted'];
}

const ds = container.resolve<ProposalDataSource>(Tokens.ProposalDataSource);
const userDataSource = container.resolve<UserDataSource>(Tokens.UserDataSource);

const handleProposalSubmitted: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as Proposal;
  await ds.create(proposal);
};

const handleProposalUpdated: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as Proposal;
  await ds.update(proposal);
};

const handleProposalDeleted: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as Proposal;
  await ds.delete(proposal.proposalPk);
};

const handleProposalStatusChanged: ConsumerCallback = async (
  _type,
  message
) => {
  const ProposalWithNewStatus = message as unknown as ProposalWithNewStatus;
  const members = ProposalWithNewStatus.members;
  // Create new user for the members
  for (const member of members) {
    await userDataSource.create(member);
  }
};

export {
  handleProposalSubmitted,
  handleProposalUpdated,
  handleProposalDeleted,
  handleProposalStatusChanged,
};
