import { logger } from '@user-office-software/duo-logger';
import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../config/Tokens';
import { Event } from '../models/Event';
import { QueueConsumer } from './consumers/QueueConsumer';
import {
  handleInstrumentCreated,
  handleInstrumentDeleted,
  handleInstrumentUpdated,
} from './messageHandlers/instrument';

const consumerCallback: ConsumerCallback = async (
  type,
  message,
  properties
) => {
  const handler = handlers.get(type as Event);
  if (handler) {
    handler(type, message, properties);
  } else {
    logger.logError('No handler for event type', { type, message });
  }
};

const handlers: Map<Event, ConsumerCallback> = new Map();
handlers.set(Event.INSTRUMENT_CREATED, handleInstrumentCreated);
handlers.set(Event.INSTRUMENT_DELETED, handleInstrumentDeleted);
handlers.set(Event.INSTRUMENT_UPDATED, handleInstrumentUpdated);

const startQueueHandling = async (): Promise<void> => {
  const consumer = container.resolve<QueueConsumer>(Tokens.QueueConsumer);

  consumer.start(consumerCallback);
};

export default startQueueHandling;
