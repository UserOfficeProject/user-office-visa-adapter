import { Instrument } from '../../models/Instrument';
import {
  InstrumentCreationEventPayload,
  InstrumentUpdationEventPayload,
} from '../../types/instrument';
import { InstrumentRecord, createInstrumentObject } from '../../types/records';
import { InstrumentDataSource } from '../InstrumentDataSource';
import database from './database';
export default class PostgresInstrumentDataSource
  implements InstrumentDataSource
{
  private TABLE_NAME = 'instrument';

  async get(id: number): Promise<Instrument | null> {
    return await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .first()
      .then((instrument: InstrumentRecord | null) => {
        return instrument ? createInstrumentObject(instrument) : null;
      });
  }
  async create(
    instrument: InstrumentCreationEventPayload
  ): Promise<Instrument> {
    // Insert if not exists and return the instrument
    const instrumentExists = await database(this.TABLE_NAME)
      .where({
        name: instrument.name,
        id: instrument.id,
      })
      .first();

    if (instrumentExists) {
      return createInstrumentObject(instrumentExists);
    }

    return await database(this.TABLE_NAME)
      .insert({
        id: instrument.id,
        name: instrument.name,
      })
      .returning(['*'])
      .then((instrument: InstrumentRecord[]) => {
        return createInstrumentObject(instrument[0]);
      });
  }

  async update(
    instrument: InstrumentUpdationEventPayload
  ): Promise<Instrument> {
    const instrumentExists = await database(this.TABLE_NAME)
      .where({
        id: instrument.id,
      })
      .first();

    if (instrumentExists) {
      return await database(this.TABLE_NAME)
        .where({
          id: instrument.id,
        })
        .update({
          name: instrument.name,
        })
        .returning(['*'])
        .then((instrument: InstrumentRecord[]) => {
          return createInstrumentObject(instrument[0]);
        });
    }

    return await database(this.TABLE_NAME)
      .insert({
        id: instrument.id,
        name: instrument.name,
      })
      .returning(['*'])
      .then((instrument: InstrumentRecord[]) => {
        return createInstrumentObject(instrument[0]);
      });
  }

  async delete(id: number) {
    await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .delete()
      .returning(['*'])
      .then((instrument: InstrumentRecord[]) => {
        return createInstrumentObject(instrument[0]);
      });

    return id;
  }
}
