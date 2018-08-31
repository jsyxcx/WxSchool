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
    //
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


    //1.1 握手
    var uuidv1 = require('/utils/uuid/we-uuidv1.js')
    var storageKeyName = require('/utils/encrypt/storageKeyName.js')
    var httpUtil = require('/utils/encrypt/publicProtocolNew.js')
    var uuid = uuidv1();
    wx.setStorageSync(storageKeyName.UUID, uuid);
    wx.setStorageSync(storageKeyName.appId, storageKeyName.appId);
    wx.setStorageSync(storageKeyName.shakeType, storageKeyName.shakeType);
    //需要加密的数据
    var enData0 = {};
    //不需要加密的数据
    var comData0 = {
      uuid: uuid, //用户设备号
      shaketype: wx.getStorageSync(storageKeyName.shakeType), //小程序握手类型
      appid: wx.getStorageSync(storageKeyName.appId) //appid
    };
    httpUtil.postDataEncry('ShakeHand', enData0, comData0, 0, function (data) {
      wx.setStorageSync(storageKeyName.shakeHand, data.data.RspData);
      console.log('握手成功')
    });

    //获取用户身份
    var that = this;
    wx.login({ //登录
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('code==' + code)
          wx.setStorageSync(storageKeyName.code, code);
          wx.getUserInfo({ //获取用户信息
            success: function (res) {
              console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code });
              that.globalData.userInfo = res.userInfo;

              wx.request({ //获取用户唯一标识
                url: 'https://jbyj.jiaobaowang.net/WxService/getId',
                data: {
                  encryptedData: res.encryptedData, iv: res.iv, code: code,
                },
                method: 'POST',
                success: function (res) {
                  console.log(res.data);
                  console.log('openId==' + res.data.RspData.Data.openId);
                  console.log('unionId==' + res.data.RspData.Data.unionId);
                  wx.setStorageSync(storageKeyName.openId, res.data.RspData.Data.openId);
                  wx.setStorageSync(storageKeyName.unionId, res.data.RspData.Data.unionId);
                  that.globalData.userId = res.data.RspData.Data.unionId;

                  var enData1 = {
                    wxid: wx.getStorageSync(storageKeyName.unionId)
                  };
                  var comData1 = {
                    uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
                    appid: wx.getStorageSync(storageKeyName.appId), //appid
                    shaketype: wx.getStorageSync(storageKeyName.shakeType)
                  };
                  httpUtil.postDataEncry('WxAuthLogin', enData1, comData1, 0, function (data) {

                    console.log(JSON.stringify(data.data.RspData))
                    var respData = data.data.RspData;
                    that.globalData.userUtp = respData.utp; //全局用户身份
                    console.log("user utp:");
                    console.log(that.globalData.userUtp);
                  })
                },
                fail: function (res) {
                  console.log(res.data);
                  console.log('is failed')
                },
                complete: function () {
                  console.log('redirectTo');

                }//请求完成后执行的函数
              })
            },
            fail: function (res) {
              console.log('获取用户信息失败')
              console.log(res)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // }
  },
  globalData: {
    userInfo: null,
    userId: '',
    phoneNumber: '',
    userUtp: -1
  }
})
