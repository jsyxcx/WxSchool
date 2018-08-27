var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
// pages/paper/teacher/paper.js
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden', 'hidden', 'hidden'];
}

//声明初始化高亮状态数组
function initSubMenuHighLight() {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
}

Page({
  data: {
    subMenuDisplay: initSubMenuDisplay(),
    newSubMenuHighLight: initSubMenuHighLight(),
    tabs: ["批改作业", "布置作业", "作业报表"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    subjects: ["语文", "数学", "英语"],
    subjectIndex: 0
  },
  tapMainMenu: function (e) {
    //      获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);
    // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();
    //      如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }
    // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },
  tapSubMenu: function (e) {
    // 隐藏所有一级菜单
    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });
    // 处理二级菜单，首先获取当前显示的二级菜单标识
    var indexArray = e.currentTarget.dataset.index.split('-');
    console.log("indexArray : " + indexArray);
    for (var i = 0; i < this.data.newSubMenuHighLight.length; i++) {
      // 如果点中的是一级菜单，则先清空状态，即非高亮模式，然后再高亮点中的二级菜单；如果不是当前菜单，而不理会。经过这样处理就能保留其他菜单的高亮状态
      if (indexArray[0] == i) {
        for (var j = 0; j < this.data.newSubMenuHighLight[i].length; j++) {
          // 实现清空
          this.data.newSubMenuHighLight[i][j] = '';
        }
        // 将当前菜单的二级菜单设置回去
      }
    }
    // 与一级菜单不同，这里不需要判断当前状态，只需要点击就给class赋予highlight即可
    this.data.newSubMenuHighLight[indexArray[0]][indexArray[1]] = 'highlight';
    console.log(this.data.newSubMenuHighLight);
    // 设置为新的数组
    this.setData({
      subMenuHighLight: this.data.newSubMenuHighLight
    });
  },
  tapClose: function(){
    console.log("close");
    this.setData({
      subMenuDisplay: initSubMenuDisplay()
    });
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindSubjectChange: function (e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      subjectIndex: e.detail.value
    })
  }
});