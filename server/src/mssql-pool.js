// @flow

const sql = require('mssql');
const config = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  server: process.env.MSSQL_SERVER,
  database: process.env.MSSQL_DATABASE,
  pool: {
    max: 1,
    min: 0,
  },
  options: {
    enableArithAbort: false,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch((error) => console.log('Database connection failed: ', error));

module.exports = {
  sql,
  poolPromise,
};
