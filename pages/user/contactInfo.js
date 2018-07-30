// pages/user/contactInfo.js

const storageKeyName = require('../../utils/js/storageKeyName.js')
const httpUtil =require('../../utils/js/publicProtocolNew.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    respData:'点击按钮获取平台用户信息',
    canClick:true
  },
  getInfo: function () {
    var obj=this;
    var uuid = storageKeyName.UUID = httpUtil.generateUUID();
    //1.1 握手
    //需要加密的数据
    var enData0 = {};
    //不需要加密的数据
    var comData0 = {
      uuid: uuid, //用户设备号
      shaketype: 'wxSign', //注册(reg),登录(login),修改密码(repw)
      appid: storageKeyName.APPID //这里暂时放一个自定义包名
    };
    httpUtil.postDataEncry('ShakeHand', enData0, comData0, 0, function (data) {
      storageKeyName.SHAKEHAND = data.data.RspData;
      // console.log(JSON.stringify(storageKeyName.SHAKEHAND ))

      //4.17 微信小程序用户鉴权
      var enData1 = {
        wxid: wx.getStorageSync('unionId')
      };
      var comData1 = {
        uuid: uuid, //用户设备号
        appid: storageKeyName.APPID, //这里暂时放一个自定义包名
        shaketype: 'wxSign'
      };
      httpUtil.postDataEncry('WxAuthLogin', enData1, comData1, 0, function (data) {
        // console.log(JSON.stringify(data.data.RspData))

        //4.18 	小程序用户手机关联的用户数据

        var respData = data.data.RspData;
        var enData2 = {};
        var comData2 = {
          uuid: uuid, //用户设备号
          appid: storageKeyName.APPID, //这里暂时放一个自定义包名
          mobile: wx.getStorageSync("phoneNumber"),
          utoken: respData.utoken
        };
        httpUtil.postDataEncry('WxMobileUsers', enData2, comData2, 0, function (data) {
          // console.log(JSON.stringify(data.data.RspData))
          // obj.respData = JSON.stringify(data.data.RspData)
          obj.setData({
            respData: JSON.stringify(data.data.RspData),
            canClick:false
          })

        });
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