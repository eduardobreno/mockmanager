var express = require('express');
var app = express();
fs = require('fs');
const path = require('path');
var db = require('./db');


app.use('/admin', express.static('public'));
app.get('/admin/*', function (req, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

var ServiceController = require('./src/service/ServiceController');
app.use('/services', ServiceController);

var MockController = require('./src/mock/MockController');
app.use('/o/cetelem-services/api/', MockController);


app.use(function (req, res) {
  console.log("Not mapped - ", req.method, " ", req.url);
  var img = fs.readFileSync('./static/404.jpg');
  res.writeHead(200, { 'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
  // res.status(404).send("404 O.O");
});

module.exports = app;