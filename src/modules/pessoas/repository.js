import db from '../../db';

const tableName = 'pessoas';

/**
 * @param {Object} idPessoa
 * @param {Object} cnx - DB Connection
 * @returns {Function} - Returns a Promise
 */
export const getOne = async (idPessoa, cnx) => {
  if (!cnx) cnx = db;

  const query = `SELECT
                  -- PESSOAS
                   idPessoa as "idPessoa",
                   nome,
                   cpf,
                   to_char(dataNascimento, 'DD/MM/YYYY') as "dataNascimento"
                 FROM
                   "${tableName}" p
                 WHERE
                   p.idPessoa = $1`;

  return cnx.oneOrNone(query, idPessoa);
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
