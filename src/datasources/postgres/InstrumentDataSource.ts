import { Knex } from 'knex';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { Instrument } from '../../models/Instrument';
import {
  InstrumentCreationEventPayload,
  InstrumentUpdationEventPayload,
} from '../../types/instrument';
import { InstrumentRecord, createInstrumentObject } from '../../types/records';
import { InstrumentDataSource } from '../InstrumentDataSource';
import Database from './database/index';
export default class PostgresInstrumentDataSource
  implements InstrumentDataSource
{
  private TABLE_NAME = 'instrument';
  private database: Knex;
  constructor() {
    const databaseInstance = container.resolve<Database>(Tokens.Database);
    (async () => {
      this.database = await databaseInstance.connect();
    })();
  }
  async get(id: number): Promise<Instrument | null> {
    return await this.database(this.TABLE_NAME)
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
    return await this.database(this.TABLE_NAME)
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
    const instrumentExists = await this.database(this.TABLE_NAME)
      .where({
        id: instrument.id,
      })
      .first();

    if (instrumentExists) {
      return await this.database(this.TABLE_NAME)
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

    return await this.database(this.TABLE_NAME)
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
    await this.database(this.TABLE_NAME)
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
