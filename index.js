const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
server.listen(3000, () => { console.log('listening on *:3000'); });
const { Server } = require("socket.io");
const io = new Server(server);
io.on('connection', (socket) => { console.log('a user connected'); });
app.use(express.static(__dirname + '/public'));
// retrieve the connexion
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        const idClient = msg
        let url = `https://google.com?id=${idClient}`
        console.log('url', url)
            // window.scrollTo(0, document.body.scrollHeight);
    });
});