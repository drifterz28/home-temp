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
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(date, 'yyyy-MM-dd')
  };
};

async function setRoomTemp(query) {
  const tempAdjust = -10;
  const humidityAdjust = 0;
  const temp = (Number(query.temp) + tempAdjust).toFixed(0);
  const hum = (Number(query.hum) + humidityAdjust).toFixed(0);
  db.query("INSERT INTO temps(ip, temp, hum, timestamp) VALUES ($1, $2, $3, current_timestamp)", [ query.ip, temp, hum ]).catch(err => {
    console.log(err);
  });
};

async function getRoomTemps({ip, range = 'day'}) {
  const dateRange = getDateRange(range);
  const roomData = await db.query(`SELECT * FROM temps WHERE ip = '${ip}' and timestamp::date BETWEEN '${dateRange.end}' AND '${dateRange.start}'`)
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
  const GetAllRooms = await db.query(`SELECT ip, name FROM rooms;`);

  const roomData = GetAllRooms.rows.map(async (row) => {
    const room = await db.query(`SELECT * FROM temps WHERE ip = '${row.ip}' ORDER BY id DESC LIMIT 1`);
    const { rows } = room;
    return {
      ...rows[0],
      name: row.name
    };
  });
  const roomInfo = await Promise.all(roomData);
  res.status(200).json(roomInfo);
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
