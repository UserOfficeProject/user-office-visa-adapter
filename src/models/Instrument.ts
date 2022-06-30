export class Instrument {
  constructor(
    public id: number,
    public name: string,
    public shortCode: string,
    public description: string,
    public managerUserId: number
  ) {}
}
