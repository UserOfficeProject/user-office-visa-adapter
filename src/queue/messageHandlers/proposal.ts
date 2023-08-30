import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { ProposalDataSource } from '../../datasources/ProposalDataSource';
import { UserDataSource } from '../../datasources/UserDataSource';
import {
  ProposalDeletionEventPayload,
  ProposalStatusChangedEventPayload,
  ProposalSubmissionEventPayload,
  ProposalUpdationEventPayload,
} from '../../types/proposal';

const proposalDatasource = container.resolve<ProposalDataSource>(
  Tokens.ProposalDataSource
);
const userDataSource = container.resolve<UserDataSource>(Tokens.UserDataSource);

const handleProposalSubmitted: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as ProposalSubmissionEventPayload;
  await proposalDatasource.create(proposal);
};

const handleProposalUpdated: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as ProposalUpdationEventPayload;
  await proposalDatasource.update(proposal);
};

const handleProposalDeleted: ConsumerCallback = async (_type, message) => {
  const proposal = message as unknown as ProposalDeletionEventPayload;
  await proposalDatasource.delete(proposal.proposalPk);
};

const handleProposalStatusChanged: ConsumerCallback = async (
  _type,
  message
) => {
  const proposalWithNewStatus =
    message as unknown as ProposalStatusChangedEventPayload;

  if (!['ALLOCATED', 'SCHEDULING'].includes(proposalWithNewStatus.newStatus))
    return;
  // Create new user for the proposer
  const proposer = proposalWithNewStatus.proposer;
  await userDataSource.create(proposer);

  // Create new user for the co-proposer
  const members = proposalWithNewStatus.members;
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
