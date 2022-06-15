import { Instrument } from '../../models/Instrument';
import { InstrumentDataSource } from '../InstrumentDataSource';

export default class MockInstrumentDataSource implements InstrumentDataSource {
  update(instrument: Instrument): Promise<Instrument> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
  async create(instrument: Instrument): Promise<Instrument> {
    return instrument;
  }
}
