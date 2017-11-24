var config = require('../config/config.js');

var Image = function (path = '', id = 0) {
  this.id = id;
  //this.url = config.image.baseUrl + path;

  if (path.indexOf('nopic') > -1) {
    this.url = config.baseUrl + path;
  } else if (path.substr(0, 1) == '/') {
    this.url = config.image.baseUrl + path;
  } else {
    this.url = config.image.baseUrl + '/' + path;
  }
}

Image.prototype = {
}

module.exports = Image;