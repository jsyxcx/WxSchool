// pages/paper/teacher/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: ["语文","数学","英语"],
    subjectIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindSubjectChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      subjectIndex: e.detail.value
    })
  }
})