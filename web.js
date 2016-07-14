var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express.createServer(express.logger());
var cors = require('cors');

app.use(cors());

if (process.env.NEW_BASE_URL) {
  app.use('/', proxy({ target: process.env.NEW_BASE_URL, changeOrigin: true }));
}

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Listening on " + port);
});
