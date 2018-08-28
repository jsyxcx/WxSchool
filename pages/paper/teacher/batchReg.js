// pages/paper/teacher/batchReg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select_all: false,
    middlearr: [],
    items: [
      { name: '学生1', checked: false },
      { name: '学生2', checked: true }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 选择
  select: function (e) {
    console.log("选择")
    var that = this;
    let arr2 = [];
    var arr = that.data.items;
    console.log(arr);
    var index = e.currentTarget.dataset.id;
    console.log(index);
    arr[index].checked = !arr[index].checked;
    console.log(arr);

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked) {
        arr2.push(arr[i])
      }
    };
    that.setData({
      items: arr,
      middlearr: arr2
    })
  },
  // 全选
  select_all: function () {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    if (that.data.select_all) {
      let arr = that.data.items;
      let arr2 = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked == true) {
          arr2.push(arr[i]);
        } else {
          arr[i].checked = true;
          arr2.push(arr[i]);
        }
      }
      that.setData({
        items: arr2,
        middlearr: arr2
      })
    }
  },
  // 取消全选
  select_none: function () {
    let that = this;
    that.setData({
      select_all: !that.data.select_all
    })
    let arr = that.data.items;
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i].checked = false;
      arr2.push(arr[i]);
    }
    that.setData({
      items: arr2,
      middlearr: []
    })
  }
})