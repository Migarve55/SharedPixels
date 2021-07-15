
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

const app = express();
app.use('/', express.static(path.join(__dirname, 'www')));

const server = app.listen(port, () => {
  console.log("App running at port: " + port);
});

// Api REST

const pixels = [];
for (let index = 0; index < 190 * 60; index++) {
  pixels.push({
    id: index + 1,
    color: "white"
  });
}

app.get("/api/pixels", (req, res, next) => {
  res.json(pixels);
});

// Websockets

const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function(msg) {
    const data = JSON.parse(msg);
    const pixel = pixels.find(p => p.id === data.pixelId);
    if (pixel) {
      console.log(pixel);
      pixel.color = data.color;
    }
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });

  ws.on('close',() => console.log('Client disconnected'));
});
