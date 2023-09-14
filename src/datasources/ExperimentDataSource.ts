import { Experiment } from '../models/Experiment';

export interface ExperimentDataSource {
  getByProposalId(proposalId: number): Promise<Experiment | null>;
  create({
    proposalPk,
    instrumentId,
  }: {
    proposalPk: number;
    instrumentId: number;
  }): Promise<Experiment>;
}
