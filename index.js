var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('message', {jesse: 'Hey. how are you??'});
    socket.on('another event', function(data) {
        console.log(data)
    })
})