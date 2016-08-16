var CONCURRENCY = process.env.CONCURRENCY || 1;
var PORT = process.env.PORT || 5000;

var express = require('express');
var throng = require('throng');
var cors = require('cors');
var proxy = require('http-proxy-middleware');

function start(id) {
  var app = express.createServer(express.logger());
  app.use(cors());
  
  if (process.env.NEW_BASE_URL) {
    app.use('/', proxy({ target: process.env.NEW_BASE_URL, changeOrigin: true }));
  }
  
  app.listen(PORT, function () {
    console.log("Listening on " + PORT);
  });

  console.log('Started worker ' + id);
  process.on('SIGTERM', function () {
    console.log('Died worker ' + deadWorker.id);
    process.exit();
  });
}

throng({
  workers: CONCURRENCY,       // Number of workers (cpu count)
  lifetime: 10000,  // ms to keep cluster alive (Infinity)
  grace: 4000       // ms grace period after worker SIGTERM (5000)
}, start);
