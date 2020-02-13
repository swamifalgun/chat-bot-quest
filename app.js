const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const server = require('http').createServer(app);
const config = require('./config');

let io = require('socket.io')(server);
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


// Api.ai initialization
const access_token = '7d25544f8082473898afacb2f74c7bd3';
const session_id = 'session_id';
const apiai = require('apiai')(access_token);

io.on('connection', (socket) => {
    socket.emit('chat-message', 'Welcome! ')
    socket.on('send-chat-msg', message => {
        let apiaiReq = apiai.textRequest(message, {
            sessionId: session_id
        });

        apiaiReq.on('response', (message) => {
            let aiText = message.result.fulfillment.speech;
            socket.emit('chat-message', aiText)
        });

        apiaiReq.on('error', error => console.log(error));

        apiaiReq.end();
    });
});


// Routes
app.get('/', (req, res) => {
    console.log("running");
    res.render('index.html')
});

server.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
});