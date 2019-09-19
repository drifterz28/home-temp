const fs = require('fs');
const express = require('express');
const Bundler = require('parcel-bundler');
const sqlite = require('sqlite');

const env = process.env;
const app = express();
if(process.env.NODE_ENV !== 'production') {
  const bundler = new Bundler('./src/index.html', {
    outDir: './dist',
    outFile: 'index.html',
    publicUrl: './',
    watch: process.env.NODE_ENV !== 'production'
  });
}
const port = process.env.PORT || 5000;

const api = require('./src/api');
const gitBuild = require('./src/git-build');
const { getRooms, updateRooms, deleteRoom } = require('./src/rooms');

app.set('port', port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  if(process.env.NODE_ENV !== 'production') {
    res.setHeader("Cache-Control", "public, max-age=2592000");
  }
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

app.use(express.json())

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

if(process.env.NODE_ENV !== 'production') {
  app.get('/', bundler.middleware());
}

app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
})

app.listen(port, () => {
  console.log(`Node app is running on http://0.0.0.0:${port}`);
});
