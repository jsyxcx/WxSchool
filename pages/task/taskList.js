//taskList.js
Page(
  /**
   * 处理页面中的tapName函数
   */
  {
    tapName: function(event) {
      console.log("event===" + JSON.stringify(event))
    },

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
      console.log("用户下拉了")
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
      wx.showToast({
        title: '已经到底了',
      })
      console.log("已经到底了")
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    //选择日期动作执行该函数
    bindDateChange: function(e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    }
  })