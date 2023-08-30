export interface InstitutionPayload {
  id: number;
  name: string;
  country?: number;
  verified: boolean;
}

export interface CountryPayload {
  countryId?: number;
  country?: string;
}

export interface ProposerPayload {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  oidcSub: string;
  oauthIssuer: string;
  institution: InstitutionPayload;
  country: CountryPayload;
}

export interface ProposalSubmissionEventPayload {
  proposalPk: number;
  shortCode: string;
  title: string;
  abstract: string;
  callId: number;
  allocatedTime: number;
  members: ProposerPayload[];
  newStatus: 'DRAFT';
  submitted: boolean;
  proposer: ProposerPayload;
}

export type ProposalUpdationEventPayload = ProposalSubmissionEventPayload;

export type ProposalDeletionEventPayload = ProposalSubmissionEventPayload;

export type ProposalStatusChangedEventPayload = ProposalSubmissionEventPayload;
