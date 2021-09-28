const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Port = process.env.PORT || 3000;
app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
server.listen(Port, () => { console.log('listening on *:3000'); });
const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket) => { console.log('a user connected'); });
// retrieve the connexion
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        const idClient = msg
        let url = `https://google.com?id=${idClient}`
        console.log('url', url)
            // window.scrollTo(0, document.body.scrollHeight);
    });
});