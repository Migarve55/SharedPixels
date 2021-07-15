
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

const app = express();
app.use('/', express.static(path.join(__dirname, 'www')));

const server = app.listen(port, () => {
  console.log("App running at port: " + port);
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});
