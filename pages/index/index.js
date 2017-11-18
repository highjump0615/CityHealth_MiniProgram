
//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js')

Page({
  data: {
  },
  onLoad: function () {
    // 登录
    wx.login({
      success: res => {
        var paramData = {
          action: 'createSession',
          code: res.code,
        };

        api.postRequest(paramData,
          function success(res) {
            console.log(res.data.result)
            if (res.data.result < 0) {
              // 失败
              return;
            } 

            wx.setStorageSync('thirdSession', res.data['3rd_session'])
            app.globalData.thirdSession = res.data['3rd_session']

            if (res.data.result == 0) {
              // 显示当前页
            }
            else if (res.data.result == 1) {
              // 跳转转到附近页
              wx.reLaunch({
                url: '../near/near'
              });
            }
          },
          function fail(err) {
          },
          function complete() {
          }
        );
      }
    })
  },

  getPhoneNumber: function (e) {
    if (e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '获取手机号失败',
        content: '获取不到该微信手机号',
        showCancel: false
      });
      return;
    }

    var currentUser = app.globalData.currentUser;
    var paramData = {
      action: 'registerUser',
      '3rd_session': app.globalData.thirdSession,
      nickname: currentUser.nickName,
      avatarurl: currentUser.avatarUrl,
      gender: currentUser.gender,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv
    };

    api.postRequest(paramData,
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 跳转转到附近页
        wx.reLaunch({
          url: '../near/near'
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

})
