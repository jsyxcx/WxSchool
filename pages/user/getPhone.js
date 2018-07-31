// pages/user/getPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageInfoSync("phoneNumber") == 'undefined') {

    }
  },
  getPhoneNumber: function (e) {
    console.log({ encryptedData: e.detail.encryptedData, iv: e.detail.iv })
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    var that = this;
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

              if (res.data.RspData.Data.purePhoneNumber == undefined) {
                wx.showModal({
                  content: '获取手机号失败，请重新获取！',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                });
              } else {
                that.setData({
                  inputPhone: res.data.RspData.Data.purePhoneNumber
                })
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
  },
  linkPage: function(){
    wx.redirectTo({
      url: '../user/link?phone=18560237656',
    })
  }
})