// pages/profile/profile.js
var api = require('../../utils/api.js');
const app = getApp();
var User = require('../../model/User.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {  
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前用户
    if (app.globalData.currentUser) {
      this.getUserInfoDetail();
    }
    else {
      app.userInfoReadyCallback = res => {
        this.getUserInfoDetail();
      }
    }
  },

  /**
   * 提取我的信息
   */
  getUserInfoDetail: function() {
    var currentUser = app.globalData.currentUser;
    var that = this;

    this.setData({
      userInfo: currentUser
    });

    //
    // 提取我的信息
    //
    var paramData = {
      action: 'getMemberInfo',
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 数据
        currentUser.favouriteCount = res.data.myFavorite;
        currentUser.collectionCount = res.data.myCollection;
        currentUser.shopCount = res.data.myShop;

        that.setData({
          userInfo: currentUser
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})