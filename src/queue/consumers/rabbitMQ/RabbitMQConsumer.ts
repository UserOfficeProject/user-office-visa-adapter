import {
  ConsumerCallback,
  Queue,
  RabbitMQMessageBroker,
} from '@user-office-software/duo-message-broker';

import { QueueConsumer } from '../QueueConsumer';

export class RabbitMQConsumer implements QueueConsumer {
  private consumerCallback?: ConsumerCallback;
  private rabbitMQ: RabbitMQMessageBroker;

  start(consumerCallback: ConsumerCallback): void {
    this.consumerCallback = consumerCallback;
    this.rabbitMQ = new RabbitMQMessageBroker();

    this.rabbitMQ.setup({
      hostname: process.env.RABBITMQ_HOSTNAME,
      username: process.env.RABBITMQ_USERNAME,
      password: process.env.RABBITMQ_PASSWORD,
    });

    this.rabbitMQ.listenOn(Queue.VISA, this.consumerCallback);
  }

  isReady() {
    return this.consumerCallback !== undefined; // TODO check if connection is established
  }
}
