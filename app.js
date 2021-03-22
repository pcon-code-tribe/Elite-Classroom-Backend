require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const routes = require('./api/router');
const socketIOHandler = require('./chat/chat');
const PORT = process.env.PORT || 3300;
const server = http.createServer(app);

const io = socketIO(server, {
    cors: {
        origin: '*',
    },
});

app.use(express.json());
app.use('/api', routes);

server.listen(PORT, () => {
    console.log('Server up and running on ', PORT);
    app.use(socketIOHandler(io));
}); //  returns http object