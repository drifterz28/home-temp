require('dotenv').config();

const tables = {
  temps: 'CREATE TABLE IF NOT EXISTS temps (id SERIAL PRIMARY KEY, ip VARCHAR(16), temp smallint, hum smallint, timestamp TIMESTAMP)',
  rooms: 'CREATE TABLE IF NOT EXISTS rooms (id SERIAL PRIMARY KEY, ip VARCHAR(16), name VARCHAR(16))',
};

// module.exports = async (tableName) => {
//   const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
//   return dbPromise.run(tables[tableName]);
// }
