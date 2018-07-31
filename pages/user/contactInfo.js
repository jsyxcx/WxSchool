// pages/user/contactInfo.js

const storageKeyName = require('../../utils/encrypt/storageKeyName.js')
const httpUtil = require('../../utils/encrypt/publicProtocolNew.js')
var uuidv1 = require('../../utils/uuid/we-uuidv1')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    respData: '点击按钮获取平台用户信息',
    canClick: true
  },
  getInfo: function () {
    if (wx.getStorageSync(storageKeyName.phoneNumber) == '') {
      console.log("error", "请先获取手机号")
    }
    var obj = this;
    //4.17 微信小程序用户鉴权
    var enData1 = {
      wxid: wx.getStorageSync(storageKeyName.unionId)
    };
    var comData1 = {
      uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
      appid: wx.getStorageSync(storageKeyName.appId), //appid
      shaketype: wx.getStorageSync(storageKeyName.shakeType)
    };
    httpUtil.postDataEncry('WxAuthLogin', enData1, comData1, 0, function (data) {
      // console.log(JSON.stringify(data.data.RspData))
      //4.18 	小程序用户手机关联的用户数据
      var respData = data.data.RspData;
      var enData2 = {};
      var comData2 = {
        uuid: wx.getStorageSync(storageKeyName.UUID), //用户设备号
        appid: wx.getStorageSync(storageKeyName.appId), //appid
        mobile: wx.getStorageSync(storageKeyName.phoneNumber),
        utoken: respData.utoken
      };
      httpUtil.postDataEncry('WxMobileUsers', enData2, comData2, 0, function (data) {
        // console.log(JSON.stringify(data.data.RspData))
        obj.setData({
          respData: JSON.stringify(data.data.RspData),
          canClick: false
        })

      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('onShareAppMessage');
  }
})