var express = require('express');
var app = express();
const path = require('path');
var db = require('./db');


app.use('/admin', express.static('public'));
app.get('/admin/*', function (req, response) {
  response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

var ServiceController = require('./src/service/ServiceController');
app.use('/services', ServiceController);

var MockController = require('./src/mock/MockController');
app.use('/mock', MockController);


app.use(function (req, res) {
  res.status(404).send("404");
});

module.exports = app;