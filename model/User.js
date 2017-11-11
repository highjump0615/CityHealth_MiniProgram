var User = function (userInfo) {
  // 初始化
  this.nickName = userInfo.nickName;
  this.gender = userInfo.gender;
  this.avatarUrl = userInfo.avatarUrl;

  // 地理位置
  this.latitude = 0;
  this.longitude = 0;
}

User.prototype = {
  getLocationFormatted: function() {
    return this.latitude + ',' + this.longitude;
  }
}

module.exports = User;