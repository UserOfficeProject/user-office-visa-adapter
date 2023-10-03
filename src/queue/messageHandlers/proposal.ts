import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { ExperimentDataSource } from '../../datasources/ExperimentDataSource';
import { ExperimentUserDataSource } from '../../datasources/ExperimentUserDataSource';
import { ProposalDataSource } from '../../datasources/ProposalDataSource';
import { UserDataSource } from '../../datasources/UserDataSource';
import {
  ProposalDeletionEventPayload,
  ProposalInstrumentSelectedPayload,
  ProposalStatusChangedEventPayload,
  ProposalSubmissionEventPayload,
  ProposalUpdationEventPayload,
  ProposerPayload,
} from '../../types/proposal';

const proposalDatasource = container.resolve<ProposalDataSource>(
  Tokens.ProposalDataSource
);
const userDataSource = container.resolve<UserDataSource>(Tokens.UserDataSource);

const experimentDataSource = container.resolve<ExperimentDataSource>(
  Tokens.ExperimentDataSource
);

const experimentUserDataSource = container.resolve<ExperimentUserDataSource>(
  Tokens.ExperimentUserDataSource
);
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

async function createUserAndAssignToExperiment(
  user: ProposerPayload,
  proposalPk: number
) {
  const createdUser = await userDataSource.create(user);
  const experiment = await experimentDataSource.getByProposalId(proposalPk);

  if (experiment) {
    await experimentUserDataSource.create({
      experimentId: experiment.id,
      userId: createdUser.id,
    });
  }
}

const handleProposalStatusChanged: ConsumerCallback = async (
  _type,
  message
) => {
  const proposalWithNewStatus =
    message as unknown as ProposalStatusChangedEventPayload;
  if (!['ALLOCATED', 'SCHEDULING'].includes(proposalWithNewStatus.newStatus))
    return;
  // Create new user for the proposer
  if (proposalWithNewStatus.proposer) {
    await createUserAndAssignToExperiment(
      proposalWithNewStatus.proposer,
      proposalWithNewStatus.proposalPk
    );
  }
  // Create new user for the co-proposer
  const members = proposalWithNewStatus.members;
  for (const member of members) {
    await createUserAndAssignToExperiment(
      member,
      proposalWithNewStatus.proposalPk
    );
  }
};

const handleProposalInstrumentSelected: ConsumerCallback = async (
  _type,
  message
) => {
  const { instrumentId, proposalPks } =
    message as unknown as ProposalInstrumentSelectedPayload;

  for (const proposalPk of proposalPks) {
    await experimentDataSource.create({
      proposalPk,
      instrumentId,
    });
  }
};

export {
  handleProposalSubmitted,
  handleProposalUpdated,
  handleProposalDeleted,
  handleProposalStatusChanged,
  handleProposalInstrumentSelected,
};
