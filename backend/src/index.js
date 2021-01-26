import http from 'http';
import logger from './logger';
import app from './app';

const PORT = process.env.PORT || 3000;

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

server.listen(PORT, () => logger.info(`Server is listening on ${PORT}`));
