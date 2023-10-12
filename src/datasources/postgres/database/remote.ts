import knex from 'knex';

const conString = `postgres://${process.env.VISA_DB_USERNAME}:${
  process.env.VISA_DB_PASSWORD
}@127.0.0.1:${9091}/${process.env.VISA_DB_NAME}`;

const db = knex({
  client: 'pg',
  connection: conString,
});

export default db;
