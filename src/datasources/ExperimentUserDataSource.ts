import { ExperimentUser } from '../models/ExperimentUser';

export interface ExperimentUserDataSource {
  create({
    experimentId,
    userId,
  }: {
    experimentId: string;
    userId: string;
  }): Promise<ExperimentUser>;
}
