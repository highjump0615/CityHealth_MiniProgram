var config = require('../config/config.js');

var Image = function (id, path) {
  this.id = id;
  this.url = config.baseUrl + path;
}

Image.prototype = {
}

module.exports = Image;