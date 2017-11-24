// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    district: null,
    area: null,
    shopName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 选择
   */
  onSelectArea: function() {
    if (this.data.district) {
      wx.navigateTo({
        url: 'districts?type=2&district=' + this.data.district.code
      });
    }
  },

  /**
   * 输入店名
   */
  onInputName: function(e) {
    this.setData({
      shopName: e.detail.value
    });
  },

  /**
   * 搜索店铺
   */
  searchShop: function() {
    var nCond = 0;
    var strUrl = 'result?search=1';

    // 检查
    if (this.data.district) {
      strUrl += '&district=' + this.data.district.code;
      nCond++;
    }
    if (this.data.area) {
      strUrl += '&area=' + this.data.area.code;
      nCond++;
    }
    if (this.data.shopName) {
      strUrl += '&name=' + this.data.shopName;
      nCond++;
    }

    if (nCond == 0) {
      wx.showModal({
        title: '请输入查找条件',
        content: '至少要有一个搜索条件',
        showCancel: false
      });

      return;
    }
    
    wx.navigateTo({
      url: strUrl
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