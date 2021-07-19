import path from 'path';
import { QueryFile } from 'pg-promise';
import { logWarn } from '../../common/utils';
import db from '../index';

const pgp = require('pg-promise')();

pgp.pg.defaults.idleTimeoutMillis = 1000;

let rootDB = null;

const DATABASE = process.env.DB_DATABASE || 'eletronic_point';
const DATABASE_SCHEMA = process.env.DB_SCHEMA || 'eletronic_point';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

const _getRootConnection = () => {
  if (rootDB) {
    return rootDB;
  }

  const cn = {
    host: DB_HOST,
    port: DB_PORT,
    database: 'postgres',
    user: DB_USER,
    password: DB_PASSWORD,
  };

  rootDB = pgp(cn);
  return rootDB;
};

export const initDB = async () => {
  try {
    const cn = await db.connect();
    cn.done();
  } catch (err) {
    if (err.code === '3D000') {
      return _createDatabase();
    }

    throw err;
  }
};

export const resetDB = async () => {
  logWarn('➤ Reseting database...');
  await _dropDatabase();
  await _createDatabase();
};

export const _dropDatabase = async () => {
  logWarn('  ➤ Droping database...');

  try {
    // matando todas outras conexoes do db
    await _getRootConnection().query('SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid()');
  } catch (err) {
    // Erro ignorado pois é um comando de administrador
  }
  await _getRootConnection().none(`DROP DATABASE ${DATABASE}`);
};

const _createDatabase = async () => {
  logWarn('  ➤ Creating new database...');
  await _getRootConnection().none(`CREATE DATABASE ${DATABASE}`);
  // await _getRootConnection().none(`ALTER DATABASE ${DATABASE} SET TIMEZONE TO 'America/Recife'`);
  await _getRootConnection().none(`ALTER DATABASE ${DATABASE} SET search_path TO ${DATABASE_SCHEMA}`);

  await _createSchema();
};

const _createSchema = async () => {
  logWarn('  ➤ Creating schema...');
  await db.none(_sql('sql/schema.sql'));

  return _populateDefaultTables();
};

const _populateDefaultTables = async () => {
  logWarn('  ➤ Populating default data tables...');
  await db.none(_sql('sql/insert-default-tables.sql'));

  // if (process.env.NODE_ENV === 'unit') {
  //   return _populateDataTables();
  // }

  logWarn('  ➤ Database started ✔');
};

// const _populateDataTables = async () => {
//   logWarn('  ➤ Populating test data tables...');
//   await db.none(_sql('sql/insert-data-tables-unit-test.sql'));
//   logWarn('➤ Database started ✔');
// };

const _sql = (file) => {
  const options = {
    minify: true,
    params: {
      database: DATABASE,
      schema: DATABASE_SCHEMA,
    },
  };

  const FULL_PATH = path.join(__dirname, file);
  const qf = new QueryFile(FULL_PATH, options);

  return qf;
};
