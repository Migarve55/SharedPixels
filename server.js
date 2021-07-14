'use strict';

const express = require('express');
const { Server } = require('ws');

const port = process.env.PORT || 3000;
const index = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(index, { root: __dirname }))
  .listen(port, () => console.log(`Listening on ${port}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', function(msg) {
    console.log(msg);
  });

  ws.on('close', () => console.log('Client disconnected'));
});
