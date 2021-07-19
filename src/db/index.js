import * as promise from 'bluebird';
import helper from './queryHelper';

const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DATABASE = process.env.DB_DATABASE || 'dock';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

const initOptions = {
  // Initialization Options
  // See: http://vitaly-t.github.io/pg-promise/module-pg-promise.html
  promiseLib: promise,
  noLocking: true,
  capSQL: true,
  extend(obj) {
    obj.helper = helper;
  },
};

export const pgp = require('pg-promise')(initOptions);

pgp.pg.defaults.idleTimeoutMillis = 1000;

const db = pgp({
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
});

export default db;
