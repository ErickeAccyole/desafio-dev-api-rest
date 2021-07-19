/*
 * Module dependencies
 */

import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const nodeEnv = process.env.NODE_ENV;
const file = path.join(__dirname, '../env', `.env.${nodeEnv}`);

// Load env vars
const envConfig = dotenv.parse(fs.readFileSync(file));
const addKey = () => {
  Object.keys(envConfig).forEach((key) => {
    if (key) {
      process.env[key] = envConfig[key];
    }
  });
};
addKey();

/**
 * Load project config setup
 */
const config = {
  API_BASE_PATH: '/api/v1',

  PORT: process.env.PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',

  secret: {
    KEY: '&&$238&-sistemaDePontos%$',
  },

  rootDir: path.join(__dirname, '../'),
};

export default config;
