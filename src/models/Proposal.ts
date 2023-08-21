export enum ProposalStatusDefaultShortCodes {
  DRAFT = 'DRAFT',
  FEASIBILITY_REVIEW = 'FEASIBILITY_REVIEW',
  NOT_FEASIBLE = 'NOT_FEASIBLE',
  SEP_SELECTION = 'SEP_SELECTION',
  SEP_REVIEW = 'SEP_REVIEW',
  ALLOCATED = 'ALLOCATED',
  NOT_ALLOCATED = 'NOT_ALLOCATED',
  SCHEDULING = 'SCHEDULING',
  EXPIRED = 'EXPIRED',
  EDITABLE_SUBMITTED = 'EDITABLE_SUBMITTED',
  EDITABLE_SUBMITTED_INTERNAL = 'EDITABLE_SUBMITTED_INTERNAL',
}

export class Proposal {
  constructor(
    public proposalPk: number,
    public shortCode: string,
    public title: string,
    public abstract: string,
    public proposerId: number,
    public statusId: number, // proposal status id while it moving though proposal workflow
    public created: Date,
    public updated: Date,
    public proposalId: string,
    public finalStatus: ProposalStatusDefaultShortCodes,
    public callId: number,
    public questionaryId: number,
    public commentForUser: string,
    public commentForManagement: string,
    public notified: boolean,
    public submitted: boolean,
    public referenceNumberSequence: number,
    public managementTimeAllocation: number,
    public managementDecisionSubmitted: boolean
  ) {}
}
