// pages/paper/commit.js
const qiniuUploader = require("../../../utils/qiniu/qiniuUploader")
// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    uptokenURL: 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen',
    // uptoken: 'xxx',
    domain: 'http://qn-educds.jiaobaowang.net',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

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
  camera: function () {
    initQiniu();
    var that = this;
    wx.showActionSheet({
      itemList: ['拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          that.chooseWxImage('camera')
        }
      }
    })

  },
  chooseimage: function () {
    initQiniu();
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          that.chooseWxImage('album')
        }
      }
    })

  },
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            'imageObject': res
          });
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({ cancelTask }));
      }
    })
  },
})