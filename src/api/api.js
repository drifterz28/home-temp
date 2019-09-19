// todo: add "last temp" from each room on load.
//       add db catch to install
const sqlite = require('sqlite');
const format = require('date-fns/format');
const subDays = require('date-fns/subDays');
const buildSql = require('./build-sql');

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

async function dbRun(query) {
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  dbPromise.run("INSERT INTO temps VALUES ($ip, $temp, $hum, strftime('%Y-%m-%dT%H:%M:%S', 'now'))", [ query.ip, query.temp, query.hum ]);
};

async function dbGet({room, range = 'day'}) {
  const dateRange = getDateRange(range);
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  const roomIp = await dbPromise.all(`SELECT ip FROM rooms WHERE name = '${room}'`);
  const roomData = await dbPromise.all(`SELECT * FROM temps WHERE ip = '${roomIp[0].ip}' and timestamp BETWEEN '${dateRange.end}' AND '${dateRange.start}'`).catch((err) => {
    if(err.errno === 1) {
      buildSql('temps').then(() => {
        dbGet({room, range});
      })
    }
  });
  return {
    room,
    data: roomData
  };
}

module.exports = (req, res) => {
  const query = req.query;
  const ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  res.setHeader('Content-Type', 'application/json');
  if(query.temp) {
    dbRun({...query, ip});
    res.status(200).json({all: 'good'});
  } else
  if(query.room) {
    dbGet(query).then(data => {
      res.send(JSON.stringify(data));
    });
  } else {
    res.status(200).json({all: 'sweet'});
  }
};
