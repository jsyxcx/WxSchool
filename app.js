//app.js
App({
  onLaunch: function () {
    // if (wx.openBluetoothAdapter) {
    //   wx.openBluetoothAdapter()
    // } else {
    //   // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
    console.log('onLaunch')
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    var that = this
    // var user = wx.getStorageSync('user') || {};
    // var userInfo = wx.getStorageSync('userInfo') || {};
    // if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
    var chkResult = 0;
    //检查登录是否过期
    wx.checkSession({
      success: function (e) {   //登录态未过期
        console.log("没过期");    
      },
      fail: function () {   //登录态过期了
        console.log("过期了");
      }
    });
    // }
  },
  globalData: {
    userInfo: null,
    userId: '',
    phoneNumber: ''
  }
})
