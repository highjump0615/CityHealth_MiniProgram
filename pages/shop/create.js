// pages/shop/create.js
var api = require('../../utils/api.js');
const app = getApp();
var Shop = require('../../model/Shop.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    district: null,
    area: null,
    
    // 填数据
    name: '',
    phone: '',
    qq: '',
    wechat: '',
    address: '',
    intro: '',
    showLoading: false
  },

  /**
   * 输入店名
   */
  onInputName: function(e) {
    this.setData({
      name: e.detail.value
    });
  },
  /**
   * 输入电话
   */
  onInputPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  /**
   * 输入QQ
   */
  onInputQQ: function(e) {
    this.setData({
      qq: e.detail.value
    });
  },
  /**
   * 输入微信
   */
  onInputWechat: function(e) {
    this.setData({
      wechat: e.detail.value
    });
  },
  /**
   * 输入地址
   */
  onInputAddress: function(e) {
    this.setData({
      address: e.detail.value
    });
  },
  /**
   * 输入介绍
   */
  onInputIntro: function(e) {
    this.setData({
      intro: e.detail.value
    });
  },

  /**
   * 保存店铺信息
   */
  saveShop: function(e) {
    if (!this.data.name) {
      wx.showModal({
        title: '请输入店名',
        showCancel: false,
      });

      return;
    }

    // 显示加载标志
    this.setData({
      showLoading: true
    });

    //
    // 保存店铺信息
    //
    var that = this;
    var paramData = {
      action: 'saveShop',
      '3rd_session': app.globalData.thirdSession,
      shopid: '',
      name: this.data.name,
      introduction: this.data.intro,
      phone: this.data.phone,
      qq: this.data.qq,
      weChat: this.data.wechat,
      address: this.data.address,
      category: this.data.category.code,
      district: this.data.district.code,
      area: this.data.area.code
    };

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 返回
        wx.navigateBack();
      },
      function fail(err) {
      },
      function complete() {
        // 关闭加载标志
        that.setData({
          showLoading: false
        });
      }
    );
  },

  /**
   * 选择
   */
  onSelectArea: function() {
    if (this.data.district) {
      wx.navigateTo({
        url: '../search/districts?type=2&district=' + this.data.district.code
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shopId = options.shopid;
    if (!shopId) {
      return;
    }

    var that = this;

    //
    // 提取店铺信息
    //
    var paramData = {
      action: 'getShop',
      '3rd_session': app.globalData.thirdSession,
      shopid: shopId
    };

    api.postRequest(paramData,
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        that.setData({
          name: res.data.name,
          phone: res.data.phone,
          qq: res.data.qq,
          wechat: res.data.weChat,
          address: res.data.address,
          intro: res.data.introduction,
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