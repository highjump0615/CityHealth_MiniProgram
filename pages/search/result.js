// pages/search/result.js
var api = require('../../utils/api.js');
const app = getApp();
var Shop = require('../../model/Shop.js');

var gstrDistrict, gstrArea, gstrName;
// 加载参数
var gnPageNumber = 1;
var gnPageSize = 10;

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    gstrDistrict = options.district ? options.district : '';
    gstrArea = options.area ? options.area : '';
    gstrName = options.name ? options.name : '';

    this.getShops(true);
  },

  getShops: function(isRefresh) {
    var that = this;
    var currentUser = app.globalData.currentUser;
    var nPageNumber = gnPageNumber + 1;

    if (isRefresh) {
      nPageNumber = 1;
    }

    // 显示正在加载
    wx.showNavigationBarLoading();

    //
    // 查找店铺
    //
    var paramData = {
      action: 'queryShop',
      district: gstrDistrict,
      area: gstrArea,
      name: gstrName,
      location: currentUser.getLocationFormatted(),
      pageNumber: nPageNumber,
      pageSize: gnPageSize,
      '3rd_session': app.globalData.thirdSession
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        gnPageNumber = nPageNumber;

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
          shops: shopObjs,
          showEmptyNotice: shopObjs.length <= 0
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
  
  }
})