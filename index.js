const userModel = require("./models/user")
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const Port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Credentials', true)
        next();
    })
    //app.use(bodyParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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


const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

app.use("/user", require("./Route/user_Routes.js"));
/*
const user = userModel({
    name: 'dorine',
    surname: 'berton',
    mail: 'dfjskl@fdjs.fr'
})
user.save()*/