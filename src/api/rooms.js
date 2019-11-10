const db = require('../lib/connect');

async function getRooms(req, res) {
  db.query(`SELECT * FROM rooms`).then((rooms) => {
    res.status(200).json(rooms.rows);
  });
}

const createRoom = async (req, res) => {
  const query = req.body;
  db.query('INSERT INTO rooms(ip, name) VALUES ($1, $2)', [query.ip, query.room]);
  res.status(200).json({all: 'good'});
}

const updateRooms = async (req, res) => {
  const query = req.body;
  console.log(query)
  db.query('UPDATE rooms SET ip = $1, name = $2 WHERE id = $3', [query.ip, query.room, query.id]);
  res.status(200).json({all: 'good'});
}

const deleteRoom = async (req, res) => {
  const query = req.body;
  db.query(`DELETE FROM rooms WHERE ip = $1`, [query.ip]);
  res.status(200).json({all: 'good'});
}

module.exports = { getRooms, updateRooms, deleteRoom, createRoom };
