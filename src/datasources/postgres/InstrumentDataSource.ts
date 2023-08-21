import { Instrument } from '../../models/Instrument';
import { InstrumentDataSource } from '../InstrumentDataSource';
import database from './database';

export default class PostgresInstrumentDataSource
  implements InstrumentDataSource
{
  private TABLE_NAME = 'instrument';

  async create(instrument: Instrument): Promise<Instrument> {
    await database(this.TABLE_NAME).insert({
      id: instrument.id,
      name: instrument.name,
    });

    return instrument;
  }

  async update(instrument: Instrument): Promise<Instrument> {
    const instrumentExists = await database(this.TABLE_NAME)
      .where({
        id: instrument.id,
      })
      .first();

    if (instrumentExists) {
      await database(this.TABLE_NAME)
        .where({
          id: instrument.id,
        })
        .update({
          name: instrument.name,
        });

      return instrument;
    }

    await database(this.TABLE_NAME).insert({
      id: instrument.id,
      name: instrument.name,
    });

    return instrument;
  }

  async delete(id: number) {
    await database(this.TABLE_NAME)
      .where({
        id: id,
      })
      .delete();

    return id;
  }
}
