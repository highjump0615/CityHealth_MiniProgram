var config = require('../config/config.js')

function postRequest(param, success, fail, complete) {
  var strData = JSON.stringify(param);
  console.log(strData);

  wx.request({
    url: config.api.baseUrl,
    data: {
      data: strData
    },
    header: {//请求头
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST",//get为默认方法/POST
    success: function(res) {
      console.log(res.data);

      success(res);
    },
    fail: function (err) {
      console.log(err);

      fail(err);
    },
    complete: complete
  });
}

module.exports = {
  postRequest: postRequest
}
