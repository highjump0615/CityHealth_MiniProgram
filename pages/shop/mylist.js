// pages/shop/mylist.js
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
    shops: [],
    showEmptyNotice: false  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this;
    var currentUser = app.globalData.currentUser;

    //
    // 提取我的收藏
    //
    var paramData = {
      action: 'getMyShop',
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
   * 删除列表里的店铺
   */
  onDelete: function(e) {
    var that = this;
    
    wx.showModal({
      title: '删除',
      content: '确认要删除当前选择店铺吗？',
      confirmColor: '#1AAD19',
      success: function(res) {
        if (res.confirm) {
          that.deleteShop(e.currentTarget.dataset.index);
        }
      }
    });
  },

  /**
   * 删除指定店铺
   */
  deleteShop: function(index) {
    var that = this;
    var shop = this.data.shops[index];
  
    var paramData = {
      action: 'deleteShop',
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
        that.data.shops.splice(index, 1);

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
  },

  /**
   * 地图导航
   */
  onMap: function(e) {
    var that = this;

    wx.chooseLocation({
      success: function (res) {
        //
        // 保存店铺位置
        //
        var shop = that.data.shops[e.currentTarget.dataset.index];
        
        var paramData = {
          action: 'saveLocation',
          '3rd_session': app.globalData.thirdSession,
          shopid: shop.id,
          location: res.latitude + ',' + res.longitude
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
          }
        );
      }
    });

    // wx.openLocation({
    //   latitude: 39.9427,
    //   longitude: 116.3337,
    //   scale: 12,
    //   name: '都市保健',
    //   address: '北京市朝阳区东亚望京中心',
    //   success: function() {},
    //   fail: function(err) {
    //     wx.showModal({
    //       content: err.errMsg,
    //       showCancel: false
    //     });
    //   }
    // });
  }
})