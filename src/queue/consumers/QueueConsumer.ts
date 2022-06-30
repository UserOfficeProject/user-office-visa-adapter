import { ConsumerCallback } from '@user-office-software/duo-message-broker';

export interface QueueConsumer {
  start(consumerCallback: ConsumerCallback): void;
  isReady(): boolean;
}
