// pages/user/getPhone.js
var app = getApp();
const storageKeyName = require('../../utils/encrypt/storageKeyName.js')
const httpUtil = require('../../utils/encrypt/publicProtocolNew.js')
var uuidv1 = require('../../utils/uuid/we-uuidv1')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone: '',
    linkUtname: '',
    linkUtp: '',
    code: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var enData1 = {
      wxid: wx.getStorageSync(storageKeyName.unionId)
    };
    var comData1 = {
      uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
      appid: wx.getStorageSync(storageKeyName.appId), //appid
      shaketype: wx.getStorageSync(storageKeyName.shakeType)
    };
    httpUtil.postDataEncry('WxAuthLogin', enData1, comData1, 0, function (data) {
      console.log("=======aa=============" + JSON.stringify(data.data.RspData))
      var respData = data.data.RspData;
      var utpval = '';
      app.globalData.userUtp = respData.utp; //全局用户身份
      if (respData.utp == 0) {
        utpval = '老师'
      } else if (respData.utp == 1) {
        utpval = '家长'
      } else {
        utpval = '学生'
      }
      that.setData({
        linkUtname: respData.utname,
        linkUtp: utpval
      })
    })
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
    var that = this;
    var inputPhone = this.data.inputPhone;
    var code = this.data.code;
    console.log("this.data.inputPhone==" + inputPhone);
    
    if ((inputPhone == '') || (code == '')){
      wx.showModal({
        content: '请先输入手机号和验证码！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    } else {
      var enData1 = {
        uid: inputPhone,
        code: code
      };
      var comData1 = {
        uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
        appid: wx.getStorageSync(storageKeyName.appId), //appid
        shaketype: wx.getStorageSync(storageKeyName.shakeType)
      };
      httpUtil.postDataEncry('ValCode', enData1, comData1, 0, function (data) {
        console.log("RspCode===" + data.data.RspCode);
        console.log("RspTxt===" + data.data.RspTxt);
        if(data.data.RspCode!='0000'){
          wx.showModal({
            content: JSON.stringify(data.data.RspTxt),
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          });
        } else {
          wx.redirectTo({
            url: '../user/link?phone=' + inputPhone,
            //url: '../user/link?phone=18560237656'
          })
        }
      });
    }
    //   wx.redirectTo({
    //     url: '../user/link?phone=' + this.data.inputPhone,
    //     //url: '../user/link?phone=18560237656'
    //   })
    // }
  },
  getCode: function(){ //获取验证码
    var enData1 = {
      uid: this.data.inputPhone
    };
    var comData1 = {
      uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
      appid: wx.getStorageSync(storageKeyName.appId), //appid
      shaketype: wx.getStorageSync(storageKeyName.shakeType)
    };
    httpUtil.postDataEncry('GetCode', enData1, comData1, 0, function (data) {
      if (data.data.RspCode != '0000') {
        wx.showModal({
          content: '获取验证码失败，请重新获取！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      } else {
        wx.showModal({
          content: '验证码发送成功，请查收！',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    })
  },
  inputMobile: function(e){
    this.setData({
      inputPhone: e.detail.value
    })
  },
  inputCode: function(e){
    this.setData({
      code: e.detail.value
    })
  }
})