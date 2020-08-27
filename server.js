const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const messageAPIcontroller = require('./Controller/messagesAPIcontroller');
const bodyParser = require('body-parser')
//require('dotenv').config;


let clients = 0;


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Contetnt-type, Accept');
    app.options((req, res) => {
        res.set('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
    next();
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connect', socket => {
    console.log(`connection established via id: ${socket.id}`);
    clients++;
    socket.on('online', data => {
        console.log('A new user has joined the chat', data.description)
        io.sockets.emit('joined', {
            'success': true,
        });
    });

    io.sockets.emit('online', { description: clients + ' clients connected!' });



    socket.on('chat', data => {
        console.log('initiated', data);
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });

    socket.on('no_typing', data => {
        socket.broadcast.emit('no_typing', data)
    })


    socket.on('disconnect', (data) => {
        console.log(data)
        clients--;
        socket.broadcast.emit('online', { description: clients + ' clients connected!' });

    })
})

app.use('/api/', bodyParser.urlencoded({extended: true}));
app.use('/api/', bodyParser.json());

app.route('/api/messages')
.get(messageAPIcontroller.get)
.post(messageAPIcontroller.post)

server.listen(8080, (err) => {
    if (err) {
        console.log('вниание: ' + err);
        throw new Error(err)
    } else {
        console.log('serever running')
    }
})