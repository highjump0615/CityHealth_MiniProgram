// pages/shop/image.js
var api = require('../../utils/api.js');
const app = getApp();
var config = require('../../config/config.js');
var Image = require('../../model/Image.js');

var gnShopId;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    gnShopId = parseInt(options.shopid);

    var that = this;
    //
    // 获取店铺相册
    //
    var paramData = {
      action: 'getAlbum',
      '3rd_session': app.globalData.thirdSession,
      shopid: gnShopId
    };

    api.postRequest(paramData,
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        var images = [];
        for (var i = 0; i < res.data.album.length; i++) {
          var imgNew = new Image(res.data.album[i].pictureUrl, res.data.album[i].pictureid);
          images.push(imgNew);
        }

        that.setData({
          images: images
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
   * 点击图片
   */
  onImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var image = this.data.images[index];

    wx.previewImage({
      current: '',
      urls: [image.url]
    });
  },

  onImageLong: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    wx.showActionSheet({
      itemList:['删除'],
      success: function (res) {
        // 删除
        if (res.tapIndex == 0) {
          that.deleteImage(index);
        }
      },
      fail: function (res) {        
      }
    });
  },

  /**
   * 添加图片
   */
  onButNew: function () {
    var that = this; 

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgNew = new Image();
        imgNew.url = res.tempFilePaths[0];

        // 添加到列表
        var images = that.data.images;
        var nLen = images.push(imgNew);

        that.setData({
          images: images
        });

        that.uploadImage(res.tempFilePaths[0], nLen - 1);
      }
    });
  },

  /**
   * 上传店铺图片
   */
  uploadImage: function (path, index) {
    var that = this;

    wx.uploadFile({
      url: config.api.baseUrl + 'uploadPicture.jsp',
      filePath: path,
      name: 'image',
      formData: {
        'action': 'sendPicture',
        '3rd_session': app.globalData.thirdSession,
        'shopid': gnShopId,
      },
      success: function (res) {
        var resData = JSON.parse(res.data);

        if (resData.result < 0) {
          // 失败
          return;
        }

        // 设置图片id
        that.data.images[index].id = resData.pictureid;
        that.setData({
          images: that.data.images
        });

        wx.showToast({
          title: '已上传'
        });
      }
    });
  },

  /**
   * 删除店铺图片
   */
  deleteImage: function (index) {
    var image = this.data.images[index];
    if (!image.id) {
      return;
    }

    var that = this;

    var paramData = {
      action: 'deletePicture',
      '3rd_session': app.globalData.thirdSession,
      pictureid: image.id
    };

    api.postRequest(paramData,
      function success(res) {
        if (res.data.result < 0) {
          // 失败
          return;
        }

        // 删除该图片
        that.data.images.splice(index, 1);

        that.setData({
          images: that.data.images
        });
      },
      function fail(err) {
      },
      function complete() {
      }
    );
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