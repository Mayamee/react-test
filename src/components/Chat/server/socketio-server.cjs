const io = require('socket.io')(8090, {
  cors: {
    origin: ['http://localhost:8090', 'http://localhost:5050'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('sendMessage', (message) => {
    // console.log({ data, id });
    // io.emit('receiveMessage', message); // send to all
    // socket.broadcast.emit('receiveMessage', message); // send to all except sender
    socket.to(message.room).emit('receiveMessage', message); // send to all in room
  });
  socket.on('removeMessage', (id) => {
    socket.broadcast.emit('removeMessage', id);
  });
  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
  socket.on('error', (err) => {
    console.log('received error from client:', socket.id);
    console.log(err);
  });
});
