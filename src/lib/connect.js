const mysql = require('mysql2');

const connectionString = {
  host: 'localhost',
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE
};

const pool = mysql.createPool(connectionString);
const promisePool = pool.promise();
module.exports = {
  query: (text, params = []) => promisePool.query(text, params),
}