import http from 'http';
import logger from './logger';
import app from './app';

const PORT = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 3001;

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  socket.on('send-message', (message) => {
    io.emit('message', message);
  });
});

server.listen(socketPort, () => logger.info(`Socket is listening on ${socketPort}`));
