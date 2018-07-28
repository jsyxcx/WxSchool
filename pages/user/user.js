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
  },
  getPhoneNumber: function (e) {
    console.log({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    wx.login({ //登录
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('code==' + code)

          wx.request({ //获取手机号
            url: 'https://jbyj.jiaobaowang.net/WxService/getPhoneNumber',
            data: {
              encryptedData: encryptedData, iv: iv, code: code,
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function (res) {
              console.log(res.data);
              console.log('phoneNumber==' + res.data.RspData.Data.phoneNumber);
              console.log('purePhoneNumber==' + res.data.RspData.Data.purePhoneNumber);
              wx.setStorageSync("phoneNumber", res.data.RspData.Data.purePhoneNumber);

              if (res.data.RspData.Data.phoneNumber == 'undefined') {
                wx.showModal({
                  content: '获取手机号失败，请重新点击关联！',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                });
              } else {
                
              }
            },
            fail: function (res) {
              console.log(res.data);
              console.log('is failed')
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
