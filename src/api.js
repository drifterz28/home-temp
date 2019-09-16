const sqlite = require('sqlite');
const dbPromise = sqlite.open('./sqlite.sqlite', { Promise });

const dbRun = (query) => {
  // db.serialize(() => {
  //   // db.run("CREATE TABLE temps (ip TEXT, temp TEXT, hum Text, timestamp TEXT)");
  //   db.run("INSERT INTO temps VALUES ($ip, $temp, $hum, strftime('%Y-%m-%dT%H:%M:%S', 'now'))", [ query.ip, query.temp, query.hum ]);

  //   db.each("SELECT rowid AS id, * FROM temps", function(err, row) {
  //       // console.log({row});
  //   });
  // });
};

const dbGet = () => {
  const data = [];
  // db.serialize(() => {
  //   db.each("SELECT rowid AS id, * FROM temps", (err, row) => {
  //       console.log(row);
  //       data.push(row);
  //   });
  // });
  console.log(data)
  return data;
}

module.exports = (req, res) => {
  const query = req.query;
  const ip = req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  (req.connection.socket ? req.connection.socket.remoteAddress : null);
  dbRun({...query, ip});
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(dbGet()));
};
//6T0n4yOxauzjIWQ9TnmC6oiC42sDGYMP
