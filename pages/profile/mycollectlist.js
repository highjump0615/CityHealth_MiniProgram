// pages/profile/mycollectlist.js
var api = require('../../utils/api.js');
const app = getApp();
var Shop = require('../../model/Shop.js');

var gbIgnorePageTap = false;

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

    //
    // 提取我的收藏
    //
    var paramData = {
      action: 'getMyFavorite',
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
  
  },

  /**
   * 点击更多
   */
  onButMore: function (e) {
    var shop = this.data.shops[e.currentTarget.dataset.index];
    shop.isExpended = !shop.isExpended;

    // 更新数据
    this.setData({
      shops: this.data.shops
    });

    return false;
  },
  onMoreTouchStart: function (e) {
    gbIgnorePageTap = true;
  },
  onMoreTouchEnd: function (e) {
    gbIgnorePageTap = false;
  },

  /**
   * 点击屏幕
   */
  pageTap: function() {
    // 点击了操作按钮, 忽略
    if (gbIgnorePageTap) {
      return;
    }

    // 关闭更多选项
    for (var i = 0; i < this.data.shops.length; i++) {
      this.data.shops[i].isExpended = false;
    }

    // 更新数据
    this.setData({
      shops: this.data.shops
    });
  },

  /**
   * 取消关注
   */
  onButDelete: function (e) {
    var that = this;
    var shop = this.data.shops[e.currentTarget.dataset.index];

    var paramData = {
      action: 'deleteCollection',
      '3rd_session': app.globalData.thirdSession,
      shopid: shop.id
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }
        
        // 删除该店铺
        that.data.shops.splice(e.currentTarget.dataset.index, 1);

        // 更新数据
        that.setData({
          shops: that.data.shops
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  }
})