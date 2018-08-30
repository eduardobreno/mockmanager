var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
  name: String,
  url: String,
  request: [{
    isOn: String,
    method: String,
    header: String,
    body: String,
    scriptBefore: String,
    statusResponse: String,
    headerResponse: String,
    bodyResponse: String
  }]
});
mongoose.model('Services', Schema);

module.exports = mongoose.model('Services');