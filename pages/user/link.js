// pages/user/link.js
const storageKeyName = require('../../utils/encrypt/storageKeyName.js')
const httpUtil = require('../../utils/encrypt/publicProtocolNew.js')
var uuidv1 = require('../../utils/uuid/we-uuidv1')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputPhone: '',
    accInfos: [],
    selUid: '',
    selUtp: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      inputPhone: options.phone
    })

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
        mobile: obj.data.inputPhone,
        utoken: respData.utoken
      };
      httpUtil.postDataEncry('WxMobileUsers', enData2, comData2, 0, function (data) {
        //将账号信息解析并存放到accInfos，供前台使用
        var accInfoList = data.data.RspData.wxmusers;
        var accInfos = [];
        for (var i = 0, length = accInfoList.length; i < length; i++) {
          var accInfo = new Object();
          accInfo.uid = accInfoList[i].uid;
          accInfo.uname = accInfoList[i].uname;
          accInfo.utp = accInfoList[i].utp;
          if(accInfoList[i].utp==0){
            accInfo.utpval = '老师'
          } else if (accInfoList[i].utp == 1) {
            accInfo.utpval = '家长'
          } else {
            accInfo.utpval = '学生'
          }
          accInfos.push(accInfo);
          obj.setData({selUid: accInfo.uid});
          obj.setData({selUtp: accInfo.utp});
        }
        obj.setData({ accInfos: accInfos })
       
        console.log(obj.data.accInfos)

      });
    });
  },
  changeAcc: function(e){
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.setData({ selUid: e.detail.value.substring(0, e.detail.value.indexOf('&')) });
    this.setData({ selUtp: e.detail.value.substring(e.detail.value.indexOf('&') + 1, e.detail.value.length) });
  },
  link: function(){
    console.log('selUid===' + this.data.selUid);
    console.log('selUtp===' + this.data.selUtp);
  }
})