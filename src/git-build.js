const { spawn } = require('child_process');

module.exports = (req, res) => {
  const deploy = spawn('yarn', ['deploy'], {
    detached: true,
    stdio: 'ignore'
  });
  deploy.unref();
  res.status(200).json({all: 'good'});
};
//osascript -e 'display notification "hello world!"'
