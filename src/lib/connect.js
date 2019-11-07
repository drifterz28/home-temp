const { Pool } = require('pg');

const connectionString = {
  connectionString: process.env.DATABASE_URL,
  ssl: true
};

const pool = new Pool(connectionString);
module.exports = {
  query: (text, params = []) => pool.query(text, params),
}
