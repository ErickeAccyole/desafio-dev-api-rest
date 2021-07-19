import http from 'http';

import app from '../src/core';
import config from '../config/config';
import { logInfo } from '../src/common/utils';

const { PORT, HOSTNAME } = config;
const INITIALIZE_MESSAGE = `API running on http://${HOSTNAME}:${PORT}`;

const server = http.createServer(app());

server.listen(PORT, HOSTNAME, () => {
	logInfo(INITIALIZE_MESSAGE);
});

export default server;