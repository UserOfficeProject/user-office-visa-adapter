import 'reflect-metadata';
import { logger } from '@user-office-software/duo-logger';
import 'dotenv/config';
import express from 'express';
import { container } from 'tsyringe';
import './config';

import { Tokens } from './config/Tokens';
import healthCheck from './middlewares/healthCheck';
import readinessCheck from './middlewares/readinessCheck';
import startQueueHandling from './queue/queueHandling';
import connectWithUserOffice from './synchronisation/ConnectWithUserOffice';
import connectWithVisa from './synchronisation/ConnectWithVisa';
import synchronization from './synchronisation/Synchronize';

async function bootstrap() {
  const PORT = process.env.PORT || 4010;
  const app = express();

  app.use(healthCheck()).use(readinessCheck());

  app.listen(PORT);

  process.on('uncaughtException', (error) => {
    logger.logException('Unhandled NODE exception', error);
  });

  logger.logInfo(
    `Running a GraphQL API server at localhost:${PORT}/graphql`,
    {}
  );

  container.resolve<() => void>(Tokens.ConfigureLogger)();

  if (process.env.DEPENDENCY_CONFIG === 'local') {
    startQueueHandling();
  }

  if (process.env.DEPENDENCY_CONFIG === 'local') {
    await connectWithVisa();
    await connectWithUserOffice();
    app.get('/synchronize', async (req, res) => {
      await synchronization();
      res.send('---- SynchronisationDone---');
    });
  }
}

bootstrap();
