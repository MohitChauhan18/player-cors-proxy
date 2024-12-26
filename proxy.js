// filepath: /C:/Users/mohit/Downloads/cricket-player/cricket-player/proxy-server/proxy.js
const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  request(url).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});