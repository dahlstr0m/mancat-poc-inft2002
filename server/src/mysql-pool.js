// @flow

import mysql from 'mysql';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER ?? '', // Use empty string if MYSQL_USER is not set
  password: process.env.MYSQL_PASSWORD ?? '', // Use empty string if MYSQL_PASSWORD is not set
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 5,
  multipleStatements: true,
  dateStrings: true,
  // Convert MySQL boolean values to JavaScript boolean values
  typeCast: (field, next) =>
    field.type == 'TINY' && field.length == 1 ? field.string() == '1' : next(),
});

export default pool;
