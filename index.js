const express = require('express');
const app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server);
const port = 3000;

app.use(express.static('public'))
app.use(express.static('files'))

app.get('/', function(req,res) {
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', {jesse: 'Hey. how are you??'});
    socket.on('another event', function(data) {
        console.log(data)
    })
})

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

