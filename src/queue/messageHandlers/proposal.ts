import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { ExperimentDataSource } from '../../datasources/ExperimentDataSource';
import { ExperimentUserDataSource } from '../../datasources/ExperimentUserDataSource';
import { InstrumentDataSource } from '../../datasources/InstrumentDataSource';
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

const instrumentDataSource = container.resolve<InstrumentDataSource>(
  Tokens.InstrumentDataSource
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
  // Create New Proposal
  let proposal = await proposalDatasource.get(proposalWithNewStatus.proposalPk);

  if (!proposal) {
    proposal = await proposalDatasource.create(proposalWithNewStatus);
  }

  // Get Instrument
  let instrument = await instrumentDataSource.get(
    proposalWithNewStatus.instrument.id
  );
  if (!instrument) {
    instrument = await instrumentDataSource.create({
      id: proposalWithNewStatus.instrument.id,
      name: proposalWithNewStatus.instrument.shortCode,
    });
  }
  // Assign Instrument to Proposal and create an Experiment
  await experimentDataSource.create({
    proposalPk: proposal.id,
    instrumentId: instrument.id,
  });

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
