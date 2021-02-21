require('dotenv').config();
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const routes = require('./api/router');
const socketIOHandler = require('./chat/chat');

const PORT = process.env.PORT || 3300;

app.use(express.json());
app.use('/api', routes);

const server = app.listen(PORT, () => {
  console.log('Server up and running on ', PORT);
}); //  returns http object

const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socketIOHandler(io));
