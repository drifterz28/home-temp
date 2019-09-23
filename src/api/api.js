const format = require('date-fns/format');
const subDays = require('date-fns/subDays');
const highLow = require('../lib/high-low.js');
const db = require('../lib/connect.js');

const dateRanges = {
  day: 1,
  week: 7,
  month: 30
};

const getDateRange = (range) => {
  const dayRange = dateRanges[range];
  const date = subDays(new Date(), dayRange);
  return {
    start: format(new Date(), 'yyyy-MM-dd') + 'T23:59:59',
    end: format(date, 'yyyy-MM-dd') + 'T00:00:00'
  };
};

async function setRoomTemp(query) {
  query("INSERT INTO temps(ip, temp, hum, timestamp) VALUES ($1, $2, $3)", [ query.ip, query.temp, query.hum ]);
};

async function getRoomTemps({room, range = 'day'}) {
  const dateRange = getDateRange(range);
  const roomIp = await db.query(`SELECT ip FROM rooms WHERE name = '${room}'`).catch(err => {console.error(err)});
  const ip = roomIp.rows[0].ip;
  // TODO: rewite with join
  const roomData = await db.query(`SELECT * FROM temps WHERE ip = '${ip}' and timestamp BETWEEN '${dateRange.end}' AND '${dateRange.start}'`)
    .then(data => (range !== 'day' ? highLow(data.rows) : data.rows));
  return {
    room,
    data: roomData
  };
}

const getIpAddress = req => {
  return req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
}

const getCurrentTemps = async (req, res) => {
  const results = await db.query(`SELECT count(DISTINCT ip) FROM temps`);
  const count = results.rowCount;
  const roomData = await db.query(`SELECT temps.ip, temp, name FROM temps INNER JOIN rooms ON rooms.ip = temps.ip ORDER BY timestamp DESC LIMIT ${count}`);
  res.status(200).json(roomData.rows);
};

module.exports = async (req, res) => {
  const query = req.query;
  const ip = getIpAddress(req);
  res.setHeader('Content-Type', 'application/json');
  if(query.temp) {
    setRoomTemp({...query, ip});
    res.status(200).json({...query, ip});
  } else
  if(query.room) {
    getRoomTemps(query).then(data => {
      res.send(JSON.stringify(data));
    });
  } else {
    getCurrentTemps(req, res);
  }
};
