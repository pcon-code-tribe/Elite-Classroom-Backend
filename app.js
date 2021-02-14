require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const routes = require('./api/router');
const PORT = process.env.PORT || 4000;

const io = socketIO(server,{
  cors: {
    origin: '*',
  }
});

app.use(express.json());
app.use('/api', routes);



server.listen(PORT, () => {
  console.log('Server up and running on ', PORT);
  app.use(require('./chat/chat')(io));
});
