const sqlite = require('sqlite');

async function getRooms(req, res) {
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  const rooms = await dbPromise.all(`SELECT rowid AS id, * FROM rooms`);
  res.status(200).json(rooms);
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
