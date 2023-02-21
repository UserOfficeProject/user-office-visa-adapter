import {
  ConsumerCallback,
  Queue,
  RabbitMQMessageBroker,
} from '@user-office-software/duo-message-broker';

import { QueueConsumer } from '../QueueConsumer';

function validateEnv(): void {
  if (!process.env.RABBITMQ_HOSTNAME) {
    throw new Error('Environmental variable RABBITMQ_HOSTNAME not defined');
  }

  if (!process.env.RABBITMQ_USERNAME) {
    throw new Error('Environmental variable RABBITMQ_USERNAME not defined');
  }

  if (!process.env.RABBITMQ_PASSWORD) {
    throw new Error('Environmental variable RABBITMQ_PASSWORD not defined');
  }

  if (!process.env.VISA_QUEUE_NAME) {
    throw new Error('Environmental variable VISA_QUEUE_NAME not defined');
  }
}
export class RabbitMQConsumer implements QueueConsumer {
  private consumerCallback?: ConsumerCallback;
  private rabbitMQ: RabbitMQMessageBroker;

  constructor() {
    validateEnv();
  }

  start(consumerCallback: ConsumerCallback): void {
    this.consumerCallback = consumerCallback;
    this.rabbitMQ = new RabbitMQMessageBroker();

    console.log('Environment variables: ', {
      hostname: process.env.RABBITMQ_HOSTNAME,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      port: Number(process.env.RABBITMQ_PORT) || 5672,
    });

    this.rabbitMQ.setup({
      hostname: process.env.RABBITMQ_HOSTNAME,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
      port: Number(process.env.RABBITMQ_PORT) || 5672,
    });

    this.rabbitMQ.listenOn(
      process.env.VISA_QUEUE_NAME as Queue,
      this.consumerCallback
    );
  }

  isReady() {
    return this.consumerCallback !== undefined; // TODO check if connection is established
  }
}
