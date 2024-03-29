import { logger } from '@user-office-software/duo-logger';
import { ConsumerCallback } from '@user-office-software/duo-message-broker';
import { container } from 'tsyringe';

import { Tokens } from '../config/Tokens';
import { Event } from '../models/Event';
import { QueueConsumer } from './consumers/QueueConsumer';
import { handleProposalStatusChanged } from './messageHandlers/proposal';

const consumerCallback: ConsumerCallback = async (
  type,
  message,
  properties
) => {
  const handler = handlers.get(type as Event);
  if (handler) {
    logger.logInfo('Handling event', { type, message });
    try {
      await handler(type, message, properties);
    } catch (error) {
      logger.logError('Error handling event', { type, message, error });
    } finally {
      logger.logInfo('Finished handling event', { type, message });
    }
  } else {
    logger.logError('No handler for event type', { type, message });
  }
};

const handlers: Map<Event, ConsumerCallback> = new Map();
// handlers.set(Event.INSTRUMENT_CREATED, handleInstrumentCreated);
// handlers.set(Event.INSTRUMENT_DELETED, handleInstrumentDeleted);
// handlers.set(Event.INSTRUMENT_UPDATED, handleInstrumentUpdated);
// handlers.set(Event.PROPOSAL_SUBMITTED, handleProposalSubmitted);
// handlers.set(Event.PROPOSAL_DELETED, handleProposalDeleted);
// handlers.set(Event.PROPOSAL_UPDATED, handleProposalUpdated);
handlers.set(
  Event.PROPOSAL_STATUS_CHANGED_BY_WORKFLOW,
  handleProposalStatusChanged
);
handlers.set(
  Event.PROPOSAL_STATUS_CHANGED_BY_USER,
  handleProposalStatusChanged
);
// handlers.set(Event.USER_UPDATED, handleUserUpdated);
// handlers.set(Event.USER_DELETED, handleUserDeleted);
// handlers.set(
//   Event.PROPOSAL_INSTRUMENT_SELECTED,
//   handleProposalInstrumentSelected
// );

const startQueueHandling = async (): Promise<void> => {
  const consumer = container.resolve<QueueConsumer>(Tokens.QueueConsumer);
  consumer.start(consumerCallback);
};

export default startQueueHandling;
