require('dotenv').config();
const fs = require('fs');
const express = require('express');
const Bundler = require('parcel-bundler');

const env = process.env;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
let bundler;

if(!isProduction) {
  bundler = new Bundler('./src/index.html', {});
}

const port = process.env.PORT || 3000;

const api = require('./src/api/api');
const { getRooms, updateRooms, deleteRoom } = require('./src/api/rooms');

app.set('port', port);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && isProduction) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
})

app.use(express.static('dist', {
  maxAge: 86400
}), requireHTTPS);

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/temp', (req, res) => {
  api(req, res);
});

app.use(express.json());

app.route('/api/rooms')
  .get((req, res) => {
    getRooms(req, res);
  })
  .put((req, res, next) => {
    // maybe
    next(new Error('not implemented'))
  })
  .post((req, res) => {
    updateRooms(req, res);
  })
  .delete((req, res, next) => {
    deleteRoom(req, res);
  });


app.post('/api/build', (req, res) => {
  gitBuild(req, res);
});

if(!isProduction) {
  app.get('/', bundler.middleware());
}

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
