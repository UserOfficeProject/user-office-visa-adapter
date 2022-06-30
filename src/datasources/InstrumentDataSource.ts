import { Instrument } from '../models/Instrument';

export interface InstrumentDataSource {
  create(instrument: Instrument): Promise<Instrument>;
  update(instrument: Instrument): Promise<Instrument>;
  delete(id: number): Promise<number>;
}
