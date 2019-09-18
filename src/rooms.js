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

const updateRooms = (req, res) => {
  const query = req.body;
  const dbPromise = sqlite.open('./sqlite.sqlite', { Promise });
  dbPromise.run(`INSERT INTO rooms VALUES ($ip, $name)`, [query.ip, query.name]);
  res.status(200).json({all: 'good'});
}

const deleteRoom = (req, res) => {
  res.status(200).json({all: 'good'});
}

module.exports = { getRooms, updateRooms, deleteRoom };
