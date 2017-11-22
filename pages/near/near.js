// pages/near/near.js
const app = getApp();
var api = require('../../utils/api.js');
var Shop = require('../../model/Shop.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 加载参数
    pageNumber: 1,
    pageSize: 10,
    // 数据
    shops: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前用户
    if (app.globalData.currentUser) {
      this.getCurrentLocation();
    }
    else {
      app.userInfoReadyCallback = res => {
        this.getCurrentLocation();
      }
    }
  },

  /**
   * 获取当前位置
   */
  getCurrentLocation: function() {
    var that = this;
    var currentUser = app.globalData.currentUser;

    wx.getLocation({
      type: 'gcj02',    //wgs84',
      success: function (res) {
        currentUser.latitude = res.latitude;
        currentUser.longitude = res.longitude;
      },
      complete: function () {
        that.getShops(true);
      }
    });
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
    this.getShops(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getShops(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  getShops: function(isRefresh) {
    var that = this;
    var currentUser = app.globalData.currentUser;
    var nPageNumber = this.data.pageNumber + 1;

    if (isRefresh) {
      nPageNumber = 1;
    }

    // 显示正在加载
    wx.showNavigationBarLoading();

    //
    // 获取附近店铺
    //
    var paramData = {
      action: 'getNearby',
      location: currentUser.getLocationFormatted(),
      pageNumber: nPageNumber,
      pageSize: this.data.pageSize,
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        var shopObjs = that.data.shops;
        if (isRefresh) {
          shopObjs = [];
        }
        
        for (var i = 0; i < res.data.shops.length; i++) {
          var shopNew = Shop.fromObject(res.data.shops[i]);
          shopObjs.push(shopNew);
        }

        // 更新数据
        that.setData({
          shops: shopObjs
        });
      },
      function fail(err) {
      },
      function complete() {
        wx.stopPullDownRefresh();
        // 隐藏正在加载
        wx.hideNavigationBarLoading();
      }
    );
  }

})