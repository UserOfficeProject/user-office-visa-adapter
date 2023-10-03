import {
  ConsoleLogger,
  GrayLogLogger,
  setLogger,
  logger,
} from '@user-office-software/duo-logger';
export function configureGraylogLogger() {
  const server = process.env.GRAYLOG_SERVER;
  const port = process.env.GRAYLOG_PORT;

  if (server && port) {
    const env = process.env.NODE_ENV || 'unset';
    setLogger(
      new GrayLogLogger(
        server,
        parseInt(port),
        { facility: 'DMSC', environment: env, service: 'duo-visa-adapter' },
        []
      )
    );
  } else {
    setLogger(new ConsoleLogger());
    logger.logError(
      'Can not use GraylogLogger because GRAYLOG_SERVER and/or GRAYLOG_PORT not set. Using console logger instead.',
      {
        server,
        port,
      }
    );
  }
}
