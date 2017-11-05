// pages/shop/mylist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
  onDelete: function() {
    wx.showModal({
      title: '删除',
      content: '确认要删除当前选择店铺吗？',
      confirmColor: '#1AAD19'
    });
  },
  /**
   * 地图导航
   */
  onMap: function() {
    wx.openLocation({
      latitude: 39.9427,
      longitude: 116.3337,
      scale: 8,
      name: '都市保健',
      address: '北京市朝阳区东亚望京中心',
      success: function() {},
      fail: function(err) {
        wx.showModal({
          content: err.errMsg,
          showCancel: false
        });
      }
    });
  }
})