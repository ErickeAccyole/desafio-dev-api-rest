import db from '../../db';
import * as contasRepository from '../contas/repository';

const tableName = 'transacoes';
const tableNameConta = 'contas';

/**
 * @param {Object} transacao
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const create = async (transacao, conta, cnx) => {
  if (!cnx) cnx = db;

  return db.tx(async t => {
    await contasRepository.update(conta, t);

    const queryTransacao = `INSERT INTO "${tableName}" (${Object.keys(transacao).join(', ')})
                    VALUES ($1, $2, $3) RETURNING idTransacao as "idTransacao"`;

    return t.one(queryTransacao, Object.values(transacao));
  });
};

/**
 * @param {Number} idTransacao
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idTransacao, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                    -- TRANSACOES
                    idTransacao as "idTransacao",
                    idConta as "idConta",
                    valor,
                    to_char(dataTransacao, 'DD/MM/YYYY') as "dataTransacao"
                  FROM
                    "${tableName}" t
                  WHERE
                    t.idTransacao = $1`;

  return cnx.oneOrNone(query, idTransacao);
};

/**
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const getAll = (cnx = null) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                    -- TRANSACOES
                    idTransacao as "idTransacao",
                    idConta as "idConta",
                    valor,
                    to_char(dataTransacao, 'DD/MM/YYYY') as "dataTransacao"
                  FROM
                    "${tableName}" t
                  ORDER BY
                    t.idTransacao`;

  return cnx.query(query);
};

/**
 * @param {Number} idConta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
 export const getExtrato = (idConta, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                    -- TRANSACOES
                    idTransacao as "idTransacao",
                    idConta as "idConta",
                    valor,
                    to_char(dataTransacao, 'DD/MM/YYYY') as "dataTransacao"
                  FROM
                    "${tableName}" t
                  WHERE
                    t.idConta = $1
                  ORDER BY
                    t.dataTransacao DESC`;

  return cnx.query(query, idConta);
};

/**
 * @param {Object} data
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
 export const getExtratoPorPeriodo = (data, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                    -- TRANSACOES
                    idTransacao as "idTransacao",
                    idConta as "idConta",
                    valor,
                    to_char(dataTransacao, 'DD/MM/YYYY') as "dataTransacao"
                  FROM
                    "${tableName}" t
                  WHERE
                    t.idConta = $1
                    AND t.dataTransacao BETWEEN ''$2'' AND ''$3''
                  ORDER BY
                    t.dataTransacao DESC`;

  return cnx.query(query, [data.idConta, data.dataInicial, data.dataFinal]);
};

/**
 * @param {Number} idConta
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
 export const getTotalSaqueDiaAtual = (idConta, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                    -- TRANSACOES
                    COALESCE(
                      ROUND(
                        SUM(
                          CASE WHEN valor::money::numeric::float8 < 0
                            then valor::money::numeric::float8 * -1 
                          end
                        )::numeric, 2
                      ), 0
                    ) "totalSacadoNoDia"
                  FROM
                    "${tableName}" t
                  WHERE
                    t.idConta = $1
                    AND t.dataTransacao = CURRENT_DATE`;

  return cnx.oneOrNone(query, idConta);
};
