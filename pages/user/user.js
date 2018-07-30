//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    phoneNumber: ""
  },
  //事件处理函数
  onLoad: function () {
    // if (wx.getStorageSync('openId')) {
        //   console.log("取缓存");
        //   that.globalData.userId = wx.getStorageSync('openId');
        //   console.log(that.globalData.userId)
        // } else { //缓存不存在，重新登录
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login: function(){
    wx.redirectTo({
      url: '../user/login'
    })
  },
  logout: function(){
    app.globalData.userInfo = null
    this.setData({
      userInfo: null,
      hasUserInfo: false
    })

    wx.switchTab({
      url: '../user/user'
    })
  }
})
