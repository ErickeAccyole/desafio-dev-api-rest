import * as controller from './controller';

const CONTAS_BASE_PATH = '/api/v1/contas';

/**
 * Initialize Load routes
 *
 * @param {Object} app - App instance object
 * @return {undefined}
 */
const setContasRoutes = (app) => {
  app.post(CONTAS_BASE_PATH, controller.create);
  app.get(CONTAS_BASE_PATH, controller.getAll);
  app.get(`${CONTAS_BASE_PATH}/id`, controller.getOne);
  app.get(`${CONTAS_BASE_PATH}/consultarSaldo`, controller.consultarSaldo);
  app.put(`${CONTAS_BASE_PATH}/bloquearConta`, controller.bloquearConta);
};

module.exports = setContasRoutes;
