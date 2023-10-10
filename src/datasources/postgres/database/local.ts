import { logger } from '@user-office-software/duo-logger';
import knex, { Knex } from 'knex';

import Database from './index';
export default class LocalDatabase implements Database {
  connect(): Promise<Knex> {
    return new Promise((resolve, reject) => {
      const db = knex({
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
          afterCreate: function (connection: any, done: any) {
            const defaultTimezone =
              Intl.DateTimeFormat().resolvedOptions().timeZone;
            connection.query(
              `SET timezone = "${process.env.TZ || defaultTimezone}";`,
              function (err: any) {
                done(err, connection);
              }
            );
          },
        },
      });

      db.on('query-error', function (error: any, obj: any) {
        logger.logError('QUERY ERROR', {
          message: error?.message,
          error,
          obj,
          QueryName: obj?.sql,
        });
      });

      if (process.env.DATABASE_LOG_QUERIES === '1') {
        db.on('query', function ({ sql }: any) {
          // TODO: add timestamp to logger (maybe only ConsoleLogger needs it)
          logger.logDebug(`${new Date().toISOString()} - QUERY`, sql);
        });
      }

      resolve(db);
    });
  }
}
