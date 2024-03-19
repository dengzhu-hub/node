const EventEmitter = require('events');
const http = require('http');
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on('myEvent', (data) => {
  console.log('Costumer name: Jonas');
});
myEmitter.on('myEvent', () => {
  console.log('There was a new event');
});
myEmitter.on('myEvent', (greet) => {
  console.log(`${greet}, jonas, welcome to my event`);
});

myEmitter.emit('myEvent', 'hello world');

//////////////////////////////

const server = http.createServer();
  server.on('request', (req, res) => {
  console.log('Request received');
  console.log(req.url);
  
  res.end('Request received');
});
server.on('request', (req, res) => {
 console.log('Another received 🏃‍♀️');
});
server.on('request', (req, res) => {
  console.log('yell received');
});
server.on('close', () => {
  console.log('Server closed');
});

server.listen(900, '127.0.0.1', () => {
    console.log('Server listening on port 9000');
})
