import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { InstrumentDataSource } from '../../datasources/InstrumentDataSource';
import { Instrument } from '../../models/Instrument';

const ds = container.resolve<InstrumentDataSource>(Tokens.InstrumentDataSource);

const handleInstrumentCreated: ConsumerCallback = async (_type, message) => {
  const instrument: Instrument = message as unknown as Instrument;
  await ds.create(instrument);
};

const handleInstrumentDeleted: ConsumerCallback = async (_type, message) => {
  const instrument: Instrument = message as unknown as Instrument;
  await ds.delete(instrument.id);
};

const handleInstrumentUpdated: ConsumerCallback = async (_type, message) => {
  const instrument: Instrument = message as unknown as Instrument;
  await ds.update(instrument);
};

export {
  handleInstrumentUpdated,
  handleInstrumentCreated,
  handleInstrumentDeleted,
};
