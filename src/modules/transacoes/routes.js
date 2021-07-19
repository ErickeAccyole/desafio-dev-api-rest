import * as controller from './controller';

const TRANSACOES_BASE_PATH = '/api/v1/transacoes';

/**
 * Initialize Load routes
 *
 * @param {Object} app - App instance object
 * @return {undefined}
 */
const setTransacoesRoutes = (app) => {
  app.post(`${TRANSACOES_BASE_PATH}/deposito`, controller.deposito);
  app.post(`${TRANSACOES_BASE_PATH}/saque`, controller.saque);
  app.get(`${TRANSACOES_BASE_PATH}/extrato`, controller.getExtrato);
  app.get(`${TRANSACOES_BASE_PATH}/extratoPorPeriodo`, controller.getExtratoPorPeriodo);
};

module.exports = setTransacoesRoutes;
