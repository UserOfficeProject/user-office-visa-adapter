import { Instrument } from '../models/Instrument';
import {
  InstrumentCreationEventPayload,
  InstrumentUpdationEventPayload,
} from '../types/instrument';

export interface InstrumentDataSource {
  get(id: number): Promise<Instrument | null>;
  create(instrument: InstrumentCreationEventPayload): Promise<Instrument>;
  update(instrument: InstrumentUpdationEventPayload): Promise<Instrument>;
  delete(id: number): Promise<number>;
}
