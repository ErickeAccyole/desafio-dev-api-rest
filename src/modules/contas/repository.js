import db from '../../db';

const tableName = 'contas';

/**
 * Creates an Conta
 *
 * @param {Object} conta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const create = async (conta, cnx) => {
  if (!cnx) cnx = db;

  const query = `INSERT INTO "${tableName}" (${Object.keys(conta).join(', ')})
                   VALUES ($1, $2, $3, $4, $5) RETURNING idConta`;

  return cnx.one(query, Object.values(conta));
};

/**
 * @param {Object} conta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const update = (conta, cnx) => {
  if (!cnx) cnx = db;

  const query = cnx.helper.mountUpdate(conta, tableName, 'idConta');

  return cnx.one(query, conta.idconta);
};

/**
 * @param {Object} idConta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const remove = (idConta, cnx) => {
  if (!cnx) cnx = db;

  return cnx.result(db.helper.mountDelete(idConta, tableName));
};

/**
 * @param {Object} idConta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idConta, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                  -- CONTAS
                   idConta as "idConta",
                   idPessoa as "idPessoa",
                   saldo,
                   limiteSaqueDiario as "limiteSaqueDiario",
                   flagAtivo as "flagAtivo",
                   tipoConta as "tipoConta",
                   to_char(dataCriacao, 'DD/MM/YYYY') as "dataCriacao"
                 FROM
                   "${tableName}" a
                 WHERE
                   a.idConta = $1`;

  return cnx.oneOrNone(query, idConta);
};

/**
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const getAll = (cnx = null) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                  -- CONTAS
                    idConta as "idConta",
                    idPessoa as "idPessoa",
                    saldo,
                    limiteSaqueDiario as "limiteSaqueDiario",
                    flagAtivo as "flagAtivo",
                    tipoConta as "tipoConta",
                    to_char(dataCriacao, 'DD/MM/YYYY') as "dataCriacao"
                 FROM
                   "${tableName}" c
                 ORDER BY
                   c.idConta`;

  return cnx.query(query);
};

/**
 * @param {Object} idConta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
 export const consultarSaldo = async (idConta, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                  -- CONTAS
                   idConta as "idConta",
                   saldo
                 FROM
                   "${tableName}" a
                 WHERE
                   a.idConta = $1`;

  return cnx.oneOrNone(query, idConta);
};
