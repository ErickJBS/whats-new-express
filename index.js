require('dotenv').config();
const app = require('./app');
const debug = require('debug');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || 3000;

const httpsOptions = {
    key: fs.readFileSync('assets/https/private.key'),
    cert: fs.readFileSync('assets/https/certificate.pem')
};

const server = https.createServer(httpsOptions, app);
server.listen(port, () => {
  console.log('Server listening on port', port);
});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
