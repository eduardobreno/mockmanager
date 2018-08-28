var express = require('express');
var app = express();
const path = require('path');
var db = require('./db');

app.use('/admin', express.static('public'));
app.get('/admin/*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public/index.html'));
  });

var ServiceController = require('./src/service/ServiceController');
app.use('/services', ServiceController);

module.exports = app;