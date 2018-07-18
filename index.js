var express = require('express');
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static('public'))
app.use(express.static('files'))

app.get('/', function(req,res) {
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('message', (msg) => {
        console.log(`message: ${msg}`)
        io.emit('message', msg);
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

