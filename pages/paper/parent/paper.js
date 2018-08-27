// pages/paper/paper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['语文', '数学', '英语'],
    index: 0,
    date1: '2018-08-20',
    date2: '2018-08-20'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDate1Change: function (e) {
    this.setData({
      date1: e.detail.value
    })
  }, 
  bindDate2Change: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  edit: function(){
    wx.navigateTo({
      url: 'commit',
    })
  },
  detail: function () {
    wx.navigateTo({
      url: 'paperDetail',
    })
  }
})