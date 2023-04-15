const http = require('http');
const WebSocket = require('websocket').server;

var connection;

const server = http.createServer((req, res) => {
  console.log('request received on server');
});

const wss = new WebSocket({
  httpServer: server,
});

wss.on('request', (request) => {
  connection = request.accept(null, request.origin);
  connection.on('open', () => console.log('opened connection on server'));
  connection.on('message', (message) => {
    console.log(`message ${message.utf8Data} received on server`);
    connection.sendUTF(message.utf8Data);
  });
  connection.on('close', (reasonCode, description) => {
    console.log('client disconnected');
    console.log(`reason: ${reasonCode} - ${description}`);
  });
  sendEveryFiveSeconds();
});

function sendEveryFiveSeconds() {
  setTimeout(() => {
    connection.sendUTF('hello from server');
    sendEveryFiveSeconds();
  }, 5000);
}

server.listen(8090, () => {
  console.log('server started on port 8090');
});
