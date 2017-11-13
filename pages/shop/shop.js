// pages/shop/shop.js
var api = require('../../utils/api.js');
const app = getApp();
var Shop = require('../../model/Shop.js');
var Image = require('../../model/Image.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: null,
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var shopId = options.id;

    //
    // 提取我的收藏
    //
    var paramData = {
      action: 'getShopDetail',
      '3rd_session': app.globalData.thirdSession,
      shopid: shopId
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        var shopNew = new Shop();

        // 详情信息
        shopNew.id = res.data.shopid;
        shopNew.name = res.data.name;
        shopNew.intro = res.data.introduction;
        shopNew.phone = res.data.phone;
        shopNew.qq = res.data.qq;
        shopNew.wechat = res.data.wechat;
        shopNew.address = res.data.address;

        // 图片
        for (var i = 0; i < res.data.album.length; i++) {
          var imgNew = new Image(res.data.album[i].pictureid, res.data.album[i].pictureUrl);
          shopNew.images.push(shopNew);
        }

        // 评价
        shopNew.ratingService = res.data.ratingSerice;
        shopNew.ratingFacilities = res.data.ratingFacilities;
        shopNew.ratingCost = res.data.ratingCost;

        // 次数
        shopNew.countBrowse = res.data.browseCount;
        shopNew.countCollect = res.data.collectTimes;
        shopNew.countRating = res.data.ratingTimes;

        // '0', '1' 转到bool
        shopNew.isCollected = !!+res.data.isCollected;

        // 更新数据
        that.setData({
          shop: shopNew,
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
  },

  /**
   * 收藏/取消
   */
  collectShop: function() {
    var that = this;
    var strAction = 'saveCollection';
    if (this.data.shop.isCollected) {
      strAction = 'deleteCollection';
    }

    var paramData = {
      action: strAction,
      '3rd_session': app.globalData.thirdSession,
      shopid: this.data.shop.id
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }
        
        // 更新数据
        that.data.shop.isCollected = !that.data.shop.isCollected
        if (that.data.shop.isCollected) {
          wx.showToast({
            title: '已收藏'
          });
        }

        // 更新数据
        that.setData({
          shop: that.data.shop,
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