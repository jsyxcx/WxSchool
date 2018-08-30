// pages/paper/paper.js
function compareDate(DateOne, DateTwo) {
  var OneMonth = DateOne.substring(5, DateOne.lastIndexOf("-"));
  var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf("-") + 1);
  var OneYear = DateOne.substring(0, DateOne.indexOf("-"));
  var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf("-"));
  var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf("-") + 1);
  var TwoYear = DateTwo.substring(0, DateTwo.indexOf("-"));
  if (Date.parse(OneMonth + "/" + OneDay + "/" + OneYear) > Date.parse(TwoMonth + "/" + TwoDay + "/" + TwoYear)) {
    return true;
  } else {
    return false;
  }
}

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
    if (compareDate(e.detail.value, this.data.date2)){
      wx.showToast({
        title: '开始日期不可大于结束日期！',
        icon: 'none',
        duration: 3000
      })
    } else {
      this.setData({
        date1: e.detail.value
      })
    }
  }, 
  bindDate2Change: function (e) {
    if (compareDate(e.detail.value, this.data.date2)) {
      this.setData({
        date2: e.detail.value
      })
    } else {
      wx.showToast({
        title: '结束日期不可小于开始日期！',
        icon: 'none',
        duration: 3000
      })
    }
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