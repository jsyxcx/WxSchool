// pages/paper/commit.js
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
  camera: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          that.chooseWxImage('camera')
        }
      }
    })

  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          that.chooseWxImage('album')
        }
      }
    })

  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          tempFilePaths: res.tempFilePaths[0],
        })
      }
    })
  }
})