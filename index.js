var express = require('express');
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server);
var port = 3000;

app.use(express.static('public'))
app.use(express.static('files'))

app.get('/', function(req,res) {
})

app.get('/javascript', function(req,res) {
    res.sendFile(__dirname + '/public/javascript.html')
})

app.get('/swift', function(req,res) {
    res.sendFile(__dirname + '/public/swift.html')
})

app.get('/css', function(req,res) {
    res.sendFile(__dirname + '/public/css.html')
})

const tech = io.of('/tech');

tech.on('connection', (socket) => {
    console.log('user connected');
    socket.on('join', function(data) {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`)
    })

    socket.on('message', (data) => {
        console.log(`message: ${data.msg}`)
        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
        tech.emit('message', 'user disconnected')
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

