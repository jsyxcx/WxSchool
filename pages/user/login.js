// pages/user/login.js
const app = getApp()

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
  // getPhoneNumber: function (e) {
  //   console.log({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })
  //   var encryptedData = e.detail.encryptedData;
  //   var iv = e.detail.iv;
  getUserInfo: function (e) {
    wx.login({ //登录
      success: function (res) {
        var code = res.code;
        if (code) {
          console.log('code==' + code)
          wx.setStorageSync("code", code);
          wx.getUserInfo({ //获取用户信息
            success: function (res) {
              console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code });
              app.globalData.userInfo = res.userInfo;
              
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
                  wx.setStorageSync("openId", res.data.RspData.Data.openId);
                  wx.setStorageSync("unionId", res.data.RspData.Data.unionId);
                  app.globalData.userId = res.data.RspData.Data.unionId;

                  wx.switchTab({
                    url: '../user/user'
                  })

                  // wx.request({ //获取手机号
                  //   url: 'https://jbyj.jiaobaowang.net/WxService/getPhoneNumber',
                  //   data: {
                  //     encryptedData: encryptedData, iv: iv, code: code,
                  //   },
                  //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                  //   success: function (res) {
                  //     console.log(res.data);
                  //     console.log('phoneNumber==' + res.data.RspData.Data.phoneNumber);
                  //     console.log('purePhoneNumber==' + res.data.RspData.Data.purePhoneNumber);
                  //     wx.setStorageSync("phoneNumber", res.data.RspData.Data.purePhoneNumber);

                  //     wx.navigateTo({
                  //       url: '../user/user'
                  //     })
                  //   },
                  //   fail: function (res) {
                  //     console.log(res.data);
                  //     console.log('is failed')
                  //   }
                  // })
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
  }
})