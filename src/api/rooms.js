const sqlite = require('sqlite');
const buildSql = require('./build-sql');

async function getRooms(req, res) {
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  dbPromise.all(`SELECT rowid AS id, * FROM rooms`).then((rooms) => {
    res.status(200).json(rooms);
  }).catch((err) => {
    if(err.errno === 1) {
      buildSql('rooms').then(() => {
        getRooms(req, res);
      })
    }
  });
}

const updateRooms = async (req, res) => {
  const query = req.body;
  const dbPromise = await sqlite.open('./sqlite.sqlite');
  const results = await dbPromise.run(`INSERT INTO rooms VALUES ($ip, $name)`, [query.ip, query.room]);
  res.status(200).json({all: 'good'});
}

const deleteRoom = async (req, res) => {
  const query = req.body;
  const dbPromise = await sqlite.open('./sqlite.sqlite');
  const results = await dbPromise.run(`DELETE FROM rooms WHERE ip = ?`, [query.ip]);
  res.status(200).json({all: 'good'});
}

module.exports = { getRooms, updateRooms, deleteRoom };
