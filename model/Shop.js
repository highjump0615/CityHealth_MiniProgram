var config = require('../config/config.js');

var Shop = function () {
  this.images = [];

  // 显示
  this.isExpended = false;
}

Shop.fromObject = function(object) {
  var shopNew = new this();
  shopNew.setBasicData(object);

  return shopNew;
}

Shop.prototype = {
  setBasicData: function (object) {
    this.id = object.shopid;
    this.pictureUrl = config.baseUrl + object.pictureUrl;
    this.address = object.address;
    this.name = object.name;
    this.card = object.card;
    this.rating = object.rating;
    this.discount = object.discount;
    this.distance = object.distance;
  }
}

module.exports = Shop;