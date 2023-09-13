export class Experiment {
  constructor(
    public id: string,
    public startDate: string,
    public endDate: string,
    public instrumentId: number,
    public proposalId: number
  ) {}
}
