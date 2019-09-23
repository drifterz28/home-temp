require('dotenv').config();
const subMinutes = require('date-fns/subMinutes');
const format = require('date-fns/format');
const db = require('./src/lib/connect');

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const oneMonth = 43800;
let i = 30;
const date = new Date();

async function dbRun() {
  const pastDate = subMinutes(date, i);
  const query = {
    ip: '192.168.0.123',
    temp: getRandom(68, 75).toFixed(0),
    timestamp: format(pastDate, "yyyy-MM-dd'T'HH:mm:ss")
  }
  db.query("INSERT INTO temps(ip, temp, hum, timestamp) VALUES ($1, $2, $3, $4)", [ query.ip, query.temp, query.hum, query.timestamp ]).then(() => {
    i = i + 15;
    if(i < oneMonth) {
      dbRun();
    } else {
      console.log('done')
    }
  });
};

dbRun();
