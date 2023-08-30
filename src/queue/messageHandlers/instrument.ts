import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../../config/Tokens';
import { InstrumentDataSource } from '../../datasources/InstrumentDataSource';
import {
  InstrumentCreationEventPayload,
  InstrumentDeletionEventPayload,
  InstrumentUpdationEventPayload,
} from '../../types/instrument';

const instrumentDatasource = container.resolve<InstrumentDataSource>(
  Tokens.InstrumentDataSource
);

const handleInstrumentCreated: ConsumerCallback = async (_type, message) => {
  const instrument = message as unknown as InstrumentCreationEventPayload;
  await instrumentDatasource.create(instrument);
};

const handleInstrumentUpdated: ConsumerCallback = async (_type, message) => {
  const instrument = message as unknown as InstrumentUpdationEventPayload;
  await instrumentDatasource.update(instrument);
};

const handleInstrumentDeleted: ConsumerCallback = async (_type, message) => {
  const instrument = message as unknown as InstrumentDeletionEventPayload;
  await instrumentDatasource.delete(instrument.id);
};

export {
  handleInstrumentUpdated,
  handleInstrumentCreated,
  handleInstrumentDeleted,
};
