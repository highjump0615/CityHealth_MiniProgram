
//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js')

Page({
  data: {
  },
  onLoad: function () {
    // 检查3rd session
    var thirdSession = wx.getStorageSync('thirdSession');
    if (thirdSession) {
      this.set3rdSession(thirdSession);
    }    
  },
  getPhoneNumber: function(e) {
    var that = this;

    if (e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '获取手机号失败',
        content: '获取不到该微信手机号',
        showCancel: false
      });

      return;
    }

    // 登录
    wx.login({
      success: res => {
        //
        // 建立后台回话
        //
        var currentUser = app.globalData.currentUser;
        var paramData = {
          action: 'createSession',
          code: res.code,
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
            }
            wx.setStorageSync('thirdSession', res.data['3rd_session']);
            that.set3rdSession(res.data['3rd_session']);
          },
          function fail(err) {
          },
          function complete() {
          }
        );
      }
    });
  },

  /**
   * 设置Session
   */
  set3rdSession: function(session) {
    app.globalData.thirdSession = session;

    // 跳转转到附近页
    wx.reLaunch({
      url: '../near/near'
    });
  }
})
