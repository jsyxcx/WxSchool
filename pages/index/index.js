//index.js
//获取应用实例
const app = getApp()
const storageKeyName = require('../../utils/encrypt/storageKeyName.js')
Page({
  data: {
    motto: 'Building...',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumber:function (e) {
    console.log({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    wx.login({
      success: function (res1) {
        var code = res1.code;
        if (code) {
          console.log('code==' + code)
      
          wx.request({
            url: 'https://jbyj.jiaobaowang.net/WxService/getPhoneNumber',
            data: {
              encryptedData: encryptedData, iv: iv, code: code,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res2) {
              console.log(res2.data);
              console.log('phoneNumber==' + res2.data.RspData.Data.phoneNumber);
              console.log('purePhoneNumber==' + res2.data.RspData.Data.purePhoneNumber);
              wx.setStorageSync(storageKeyName.phoneNumber, res2.data.RspData.Data.purePhoneNumber);
            },
            fail: function (res2) {
              console.log(res2.data);
              console.log('is failed')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function () {
        console.log('获取手机号码失败')
      }
    })              
  }
})
