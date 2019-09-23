// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production',
//   username: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   database: process.env.PGDATABASE,
// });

// module.exports = {
//   query: (text, params, callback) => {
//     return client.query(text, params, callback)
//   },
// }

const { Pool } = require('pg');
const pool = new Pool();
module.exports = {
  query: (text, params = []) => pool.query(text, params),
}
