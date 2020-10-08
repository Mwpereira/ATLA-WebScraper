var script = require('./scripts/script');

var http = require('http');
http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(script.loadCharacterDetails()));

}).listen(8080);