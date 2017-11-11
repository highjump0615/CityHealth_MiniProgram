var config = require('../config/config.js');

var Shop = function (id, pictureUrl, address, name, card, rating, discount, distance) {
  // 初始化
  this.id = id;
  this.pictureUrl = config.baseUrl + pictureUrl;
  this.address = address;
  this.name = name;
  this.card = card;
  this.rating = rating;
  this.discount = discount;
  this.distance = distance;
}

Shop.fromObject = function(object) {
  return new this(
    object.id,
    object.pictureUrl,
    object.address,
    object.name,
    object.card,
    object.ratingall,
    object.discount,
    object.distance
  );
}

Shop.prototype = {
}

module.exports = Shop;