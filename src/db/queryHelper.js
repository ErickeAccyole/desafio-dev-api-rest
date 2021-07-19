const pgp = require('pg-promise')();

const mountSelect = (id, table) => `SELECT * FROM ${table} WHERE ${(id) ? `id = ${id} AND` : ''} active`;

const mountInsert = (data, table) => {
  const fields = Array.isArray(data) ? Object.keys(data[0]) : Object.keys(data);
  const cs = new pgp.helpers.ColumnSet(fields, { table });

  return `${pgp.helpers.insert(data, cs)}`;
};

const mountInsertReturnId = (data, table) => `${mountInsert(data, table)} RETURNING id`;

const mountUpdate = (data, table, chave) => {
  let fields = Array.isArray(data) ? Object.keys(data[0]) : Object.keys(data);
  
  fields = fields.map((field) => {
    return field.toLowerCase();
  });
  
  const cs = new pgp.helpers.ColumnSet(fields, { table });

  return `${pgp.helpers.update(data, cs)} WHERE ${chave} = $1 RETURNING ${chave}`;
};

const mountUpdateAll = (data, table) => pgp.helpers.update(data, new pgp.helpers.ColumnSet(Object.keys(data), { table }));

const mountDelete = (id, table) => `DELETE FROM ${table} WHERE id = ${id}`;

// @TODO
// const mountWhereClausule = (fields) => {
//   let where = 'WHERE ';

//   Object.keys(fields).forEach((field) => {
//     where += `${field} = ${fields[field]} AND `;
//   });

//   return where;
// };

export default {
  mountSelect,
  mountInsert,
  mountInsertReturnId,
  mountUpdate,
  mountUpdateAll,
  mountDelete,
};
