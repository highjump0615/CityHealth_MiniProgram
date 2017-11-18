var config = require('../config/config.js')

function postRequest(param, success, fail, complete) {
  console.log(param);

  wx.request({
    url: config.api.baseUrl,
    data: param,
    method: "POST",         //get为默认方法/POST
    success: function (res) {
      console.log(res.data);
      if (res.data.result !== undefined) {
        success(res);
      }
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
