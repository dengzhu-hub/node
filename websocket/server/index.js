const ws = require('ws');
const server = new ws.Server({ port: 7686 });
server.on('connection', (socket) => {
  socket.on('message', (message) => {
    const buf = Buffer.from(message);
    console.log(buf.toString());
    socket.send(message);
  });
});
