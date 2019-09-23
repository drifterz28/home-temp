const { Pool } = require('pg');

let connectionString = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  host: process.env.HOST
};

if (process.env.NODE_ENV === 'production') {
  connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
};

const pool = new Pool(connectionString);
module.exports = {
  query: (text, params = []) => pool.query(text, params),
}
