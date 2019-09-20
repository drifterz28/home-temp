const subMinutes = require('date-fns/subMinutes');
const sqlite = require('sqlite');
const format = require('date-fns/format');

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const oneMonth = 43800;
let i = 30;
const date = new Date();

async function dbRun() {
  const dbPromise = await sqlite.open('./sqlite.sqlite', { Promise });
  const pastDate = subMinutes(date, i);
  const query = {
    ip: '192.168.0.120',
    temp: getRandom(68, 75).toFixed(0),
    timestamp: format(pastDate, "yyyy-MM-dd'T'HH:mm:ss")
  }
  dbPromise.run("INSERT INTO temps VALUES ($ip, $temp, $hum, $timestamp)", [ query.ip, query.temp, query.hum, query.timestamp ]).then(() => {
    i = i + 15;
    if(i < oneMonth) {
      dbRun();
    } else {
      console.log('done')
    }
  });
};

dbRun();
