import { Knex } from 'knex';

import { connectWithVisa } from '../../../synchronisation';

import Database from './index';
export default class LocalDatabase implements Database {
  async connect(): Promise<Knex> {
    const knex = await connectWithVisa();

    return knex;
  }
}
