import { Knex } from 'knex';

interface Database {
  connect(): Promise<Knex>;
}

export default Database;
