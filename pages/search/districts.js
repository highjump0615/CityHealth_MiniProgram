// pages/search/districts.js
var api = require('../../utils/api.js');
var util = require('../../utils/util.js');
const app = getApp();

var gDistrictCode = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    values: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取区域
    var that = this;

    gDistrictCode = options.district;

    if (gDistrictCode) {
      //
      // 提取商圈代码
      //
      var paramData = {
        action: 'getArea',
        '3rd_session': app.globalData.thirdSession,
        district: gDistrictCode
      };
    }
    else {
      //
      // 提取区域代码
      //
      var paramData = {
        action: 'getDistrict',
        '3rd_session': app.globalData.thirdSession
      };
    }

    api.postRequest(paramData, 
      function success(res) {
        if (res.data.result < 0) {
          // 失败  
          return;            
        }

        // 更新数据
        if (gDistrictCode) {
          that.setData({
            values: res.data.area
          });  
        }
        else {
          that.setData({
            values: res.data.district
          });  
        }
      },
      function fail(err) {
      },
      function complete() {
      }
    );    
  },

  /**
   * 点击区域响
   */
  onValue: function(e) {
    var prevPage = util.getPreviousPage();
    var currentArea = prevPage.data.area;
    
    // 设置商圈
    if (gDistrictCode) {
      currentArea = this.data.values[e.target.dataset.index];
      prevPage.setData({
        area: currentArea
      });
    }
    // 设置区域，初始化商圈
    else {
      var district = this.data.values[e.target.dataset.index];      
      if (prevPage.data.district && prevPage.data.district.code !== district.code) {
        currentArea = null;
      }
  
      prevPage.setData({
        district: this.data.values[e.target.dataset.index],
        area: currentArea
      });
    }
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