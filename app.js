const fs = require('fs');
const express = require('express');
const Bundler = require('parcel-bundler');

const env = process.env;
const app = express();
const bundler = new Bundler('./src/index.html');
const port = process.env.PORT || 3000;

const api = require('./src/api');

app.set('port', port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.static('dist'));

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  api(req, res);
});

app.use(bundler.middleware());

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
