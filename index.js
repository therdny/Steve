// Setup

var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var routes = require('./routes/routes.js');
var config = require('./config/config.js');
users = [];
connections = [];

var events = require('events');
var eventEmitter = new events.EventEmitter();  

// Server

server.listen(process.env.PORT || 3000);
  console.log(`|  \x1b[34mCHATSERVER\x1b[37m - Running on port: \x1b[36m3000 \x1b[37m|`);

app.set('view engine', 'pug');
app.use('/public', express.static('public'));  

app.use('/', routes);

app.get('/public', function(req, res) {
  res.sendFile(__dirname + 'index');
});

io.sockets.on('connection', function(socket) {
  connections.push(socket);
  console.log('Connected: %s users connected', connections.length);

  // Disconnect
socket.on('disconnect', function(data) {
  users.splice(users.indexOf(socket.username), 1);
  updateUsernames();
  connections.splice(connections.indexOf(socket), 1);
  console.log('Disconnected: %s users connected', connections.length);
});


  // Send Message
  socket.on('send_message', function(data) {
    io.sockets.emit('new_message', {msg: data, user: socket.username});
  });


  // New User
  socket.on('new_user', function(data, callback){
    callback(true);
    socket.username = data;
    users.push(socket.username);
    updateUsernames();
  });

  function updateUsernames() {
    io.sockets.emit('get users', users);
  }

});


