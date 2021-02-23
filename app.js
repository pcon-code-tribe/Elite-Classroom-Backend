require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const routes = require('./api/router');

const io = socketIO(server,{
  cors: {
    origin: '*',
  }
});
const PORT = process.env.PORT || 3300;

app.use(express.json());
app.use('/api', routes);



server.listen(PORT, () => {
  console.log('Server up and running on ', PORT);
  app.use('/chat',require('./chat/chat')(io));
});
