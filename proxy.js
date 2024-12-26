const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('URL is required');
  }

  // Log the request URL for debugging
  console.log(`Proxying request to: ${url}`);

  // Add CORS headers to the proxied response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  request(url)
    .on('error', (err) => {
      console.error(`Error proxying request: ${err.message}`);
      res.status(500).send('Error proxying request');
    })
    .pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});