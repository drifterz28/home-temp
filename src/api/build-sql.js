const sqlite = require('sqlite');

const tables = {
  temps: 'CREATE TABLE temps (ip TEXT, temp TEXT, hum Text, timestamp TEXT)',
  rooms: 'CREATE TABLE rooms (ip TEXT, name TEXT)',
  current: 'CREATE TABLE current (ip TEXT, temp TEXT)'
};

module.exports = async (tableName) => {
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  return dbPromise.run(tables[tableName]);
}
