// pages/paper/teacher/paperDetail.js
function initMenuColor() {
  return ['clicked', 'noraml'];
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuColor: initMenuColor()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  tapMainMenu: function(e) {
    //      获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    // 生成数组
    var newMenuColor = initMenuColor();
    //通过改变class，改变颜色
    if (this.data.menuColor[index] == 'clicked') {
      if (index == 0){
        newMenuColor[0] = 'noraml';
        newMenuColor[1] = 'clicked';
      } else {
        newMenuColor[0] = 'clicked';
        newMenuColor[1] = 'noraml';
      }      
    } else {
      if (index == 0) {
        newMenuColor[0] = 'clicked';
        newMenuColor[1] = 'noraml';
      } else {
        newMenuColor[0] = 'noraml';
        newMenuColor[1] = 'clicked';
      } 
    }
    // 设置为新的数组
    this.setData({
      menuColor: newMenuColor
    });
  },
  batchComment: function(){
    wx.navigateTo({
      url: 'batchComment',
    })
  }
})