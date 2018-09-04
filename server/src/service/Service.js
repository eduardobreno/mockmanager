var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
  name: String,
  url: String,
  request: {
    header: String,
    method: String,
    body: String
  },
  response: [{
    isOn: String,
    scriptBefore: String,
    statusResponse: String,
    bodyResponse: String
  }]
});
mongoose.model('Services', Schema);

module.exports = mongoose.model('Services');