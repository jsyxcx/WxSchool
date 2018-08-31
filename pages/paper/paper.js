
// pages/paper/teacher/paper.js
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
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
  data: {
    userUtp: -1,
    subMenuDisplay: initSubMenuDisplay(),
    newSubMenuHighLight: initSubMenuHighLight(),
    tabs: ["批改作业", "布置作业", "学生报表", "班级报表"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    subjects: ["语文", "数学", "英语"],
    subjectIndex: 0,
    arrayC: ['语文', '数学', '英语'],
    indexC: 0,
    dateC1: '2018-08-20',
    dateC2: '2018-08-20',
    arrayS: ['语文', '数学', '英语'],
    indexS: 0,
    dateS1: '2018-08-20',
    dateS2: '2018-08-20',
    //家长用
    array: ['语文', '数学', '英语'],
    index: 0,
    date1: '2018-08-20',
    date2: '2018-08-20'
  },
  bindPickerCChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexC: e.detail.value
    })
  },
  bindDateC1Change: function (e) {
    this.setData({
      dateC1: e.detail.value
    })
  },
  bindDateC2Change: function (e) {
    this.setData({
      dateC2: e.detail.value
    })
  },
  bindPickerSChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexS: e.detail.value
    })
  },
  bindDateS1Change: function (e) {
    this.setData({
      dateS1: e.detail.value
    })
  },
  bindDateS2Change: function (e) {
    this.setData({
      dateS2: e.detail.value
    })
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
    that.setData({userUtp:app.globalData.userUtp});
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
  },
  detail: function(){
    wx.navigateTo({
      url: 'teacher/paperDetail',
    })
  },
  studentReport: function(){
    wx.navigateTo({
      url: 'teacher/studentReport',
    })
  },
  handList: function(){
    wx.navigateTo({
      url: 'teacher/handList',
    })
  },
  commentList: function(){
    wx.navigateTo({
      url: 'teacher/commentList',
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDate1Change: function (e) {
    if (compareDate(e.detail.value, this.data.date2)) {
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
  edit: function () {
    wx.navigateTo({
      url: 'parent/commit',
    })
  },
  detail: function () {
    wx.navigateTo({
      url: 'parent/paperDetail',
    })
  }
});