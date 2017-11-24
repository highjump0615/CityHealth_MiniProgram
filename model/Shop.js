var config = require('../config/config.js');

var Shop = function () {
  this.images = [];

  // 显示
  this.isExpended = false;
}

Shop.fromObject = function (object) {
  var shopNew = new this();
  shopNew.setBasicData(object);

  return shopNew;
}

Shop.prototype = {
  setBasicData: function (object) {
    this.id = parseInt(object.shopid);
    if (object.pictureUrl.indexOf('nopic') > -1) {
      this.pictureUrl = config.baseUrl + object.pictureUrl;
    } else if (object.pictureUrl.substr(0, 1) == '/') {
      this.pictureUrl = config.image.baseUrl + object.pictureUrl;
    } else {
      this.pictureUrl = config.image.baseUrl + '/' + object.pictureUrl;      
    }
    this.address = object.address;
    this.name = object.name;
    this.card = object.card;
    this.rating = object.ratingall;
    this.discount = object.discount;
    this.distance = object.distance;
  }
}

module.exports = Shop;