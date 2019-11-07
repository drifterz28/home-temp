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
  const temp = Number(query.temp).toFixed(0);
  const hum = Number(query.hum).toFixed(0);
  db.query("INSERT INTO temps(ip, temp, hum, timestamp) VALUES ($1, $2, $3, current_timestamp)", [ query.ip, temp, hum ]).catch(err => {
    console.log(err);
  });
};

async function getRoomTemps({ip, range = 'day'}) {
  const dateRange = getDateRange(range);
  const roomData = await db.query(`SELECT * FROM temps WHERE ip = '${ip}' and timestamp BETWEEN '${dateRange.end}' AND '${dateRange.start}'`)
    .then(data => (range !== 'day' ? highLow(data.rows) : data.rows));
  return {
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
  const roomData = await db.query(`SELECT DISTINCT ON (temps.ip) temps.ip, temp, name, timestamp FROM temps INNER JOIN rooms ON rooms.ip = temps.ip`);
  res.status(200).json(roomData.rows);
};

module.exports = async (req, res) => {
  const query = req.query;
  const ip = getIpAddress(req);
  res.setHeader('Content-Type', 'application/json');
  if(query.temp) {
    setRoomTemp({...query});
    res.status(200).json({...query});
  } else
  if(query.ip) {
    getRoomTemps(query).then(data => {
      res.send(JSON.stringify(data));
    });
  } else {
    getCurrentTemps(req, res);
  }
};
