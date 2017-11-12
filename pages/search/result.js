// pages/search/result.js
var api = require('../../utils/api.js');
const app = getApp();
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
    shops: [],
    showEmptyNotice: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var currentUser = app.globalData.currentUser;

    var district = options.district;
    var area = options.area;
    var name = options.name;

    //
    // 获取附近店铺
    //
    var paramData = {
      action: 'queryShop',
      district: district,
      area: area,
      name: name,
      location: currentUser.getLocationFormatted(),
      pageNumber: this.data.pageNumber,
      pageSize: this.data.pageSize,
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        var shopObjs = [];
        for (var i = 0; i < res.data.shops.length; i++) {
          var shopNew = Shop.fromObject(res.data.shops[i]);
          shopObjs.push(shopNew);
        }

        // 更新数据
        that.setData({
          shops: shopObjs,
          showEmptyNotice: shopObjs.length <= 0
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