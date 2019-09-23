const db = require('../lib/connect');

async function getRooms(req, res) {
  db.query(`SELECT * FROM rooms`).then((rooms) => {
    res.status(200).json(rooms.rows);
  });
}

const updateRooms = async (req, res) => {
  const query = req.body;
  db.query('INSERT INTO rooms(ip, name) VALUES ($1, $2)', [query.ip, query.room]);
  res.status(200).json({all: 'good'});
}

const deleteRoom = async (req, res) => {
  const query = req.body;
  db.query(`DELETE FROM rooms WHERE ip = ?`, [query.ip]);
  res.status(200).json({all: 'good'});
}

module.exports = { getRooms, updateRooms, deleteRoom };
