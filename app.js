const fs = require('fs');
const express = require('express');
const Bundler = require('parcel-bundler');

const env = process.env;
const app = express();
const bundler = new Bundler('./src/index.html', {
  outDir: './dist',
  outFile: 'index.html',
  publicUrl: './',
  watch: true,
});
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

app.get('/api/temp', (req, res) => {
  api(req, res);
});

app.post('/api/build', (req, res) => {
  //6T0n4yOxauzjIWQ9TnmC6oiC42sDGYMP
  send(JSON.stringify(req.body));
});

app.get('/', bundler.middleware());

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
  console.log('ENV: ', process.env.NODE_ENV);
});
