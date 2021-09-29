const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
})

app.get('/', (req, res) => { res.sendFile(__dirname + '/index.html'); });
app.post("/register", (req, res) => {
    // our register logic goes here...
    console.log('test')
    console.log(req)
});

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