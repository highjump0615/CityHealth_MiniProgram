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
    images: [],

    // 评价
    showRating: false,
    ratings: [5, 5, 5]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopId = options.id;
    this.getShopDetail(shopId);
  },

  /**
   * 提取店铺信息
   */
  getShopDetail: function(shopId) {
    var that = this;
    
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
        shopNew.wechat = res.data.weChat;
        shopNew.address = res.data.address;
        {
          var imgNew = new Image(res.data.pictureUrl);
          shopNew.images.push(imgNew);
        }
        // 图片
        for (var i = 0; i < res.data.album.length; i++) {
          var imgNew = new Image(res.data.album[i].pictureUrl, res.data.album[i].pictureid);
          shopNew.images.push(imgNew);
        }

        // 评价
        shopNew.ratingService = res.data.ratingService;
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
  collectShop: function () {
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

  onButStar: function (e) {
    var type = e.currentTarget.dataset.type;
    var value = e.currentTarget.dataset.value;
    
    var ratings = this.data.ratings;
    ratings[type] = value;

    this.setData({
      ratings: ratings
    });
  },

  /**
   * 点击发表点评
   */
  showRatingModal: function () {
    this.setData({
      showRating: true
    });
  },

  /**
   * 提交点评
   */
  submitRating: function () {
    var that = this;

    //
    // 保存店铺点评
    //
    var paramData = {
      action: 'saveRating',
      '3rd_session': app.globalData.thirdSession,
      shopid: this.data.shop.id,
      ratingService: this.data.ratings[0],
      ratingFacilities: this.data.ratings[1],
      ratingCost: this.data.ratings[2]
    };

    api.postRequest(paramData,
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }
      },
      function fail(err) {
      },
      function complete() {
        that.getShopDetail(that.data.shop.id);
        that.closeRatingModal();
      }
    );
  },

  /**
   * 关闭发表点评
   */
  closeRatingModal: function () {
    this.setData({
      showRating: false
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