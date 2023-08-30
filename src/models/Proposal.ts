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
    public id: number,
    public identifier: string,
    public publicAt: string,
    public summary: string,
    public title: string
  ) {}
}
