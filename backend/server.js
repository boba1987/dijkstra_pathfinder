var express = require('express');
var app = express();
var fs = require('fs');

app.listen(9000, function () {
  console.log('Proxy server started at port 9000');
});

var response = fs.readFileSync('response.json', {encoding: 'utf8'});

app.get('/api', function(req, res) {
  res.send(response);
});
