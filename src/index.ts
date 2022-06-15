import { logger } from '@user-office-software/duo-logger';
import 'dotenv/config';
import express from 'express';

import './config';
import healthCheck from './middlewares/healthCheck';
import readinessCheck from './middlewares/readinessCheck';
import startQueueHandling from './queue/queueHandling';

async function bootstrap() {
  const PORT = process.env.PORT || 4010;
  const app = express();

  app
    .use(healthCheck())
    .use(readinessCheck())
    .use(express.json({ limit: '5mb' }));

  app.listen(PORT);

  process.on('uncaughtException', (error) => {
    logger.logException('Unhandled NODE exception', error);
  });

  logger.logInfo(
    `Running a GraphQL API server at localhost:${PORT}/graphql`,
    {}
  );

  startQueueHandling();
}

bootstrap();
