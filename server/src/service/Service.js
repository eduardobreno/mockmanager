var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
  name: String,
  url: String,
  request: [{
    header: String,
    body: String,
  }],
  response: [{
    statusResponse: String,
    headerResponse: String,
    bodyResponse: String
  }]
});
mongoose.model('Services', Schema);

module.exports = mongoose.model('Services');