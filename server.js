const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',//cors ye9bl kolchy
    }
});

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});

app.post('/broadcast', (req, res) => {
    const message = req.body.message;

    console.log(' message wsel:', message);

    io.emit('server.message', message);

    res.send({ status: 'ok' });
});
io.on('connection', socket => {
    socket.on('join', room => {
        socket.join(room);
    });
});

server.listen(6001, () => {
    console.log('WebSocket server running on port 6001');
});
