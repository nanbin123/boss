// pages/jobTitle/jobTitle.js
let listDatas = require('../../datas/List.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDatas: {},//第一层数据
    display: '',
    listDatas1: {},//第二层数据
    listDatas2: {},//第三层数据
    name:''//职位名称
  },

  showList(e) {
    var id = e.currentTarget.id
    var two = this.data.listDatas1
    for (var j = 0; j < two.length; j++) {
      
      if (id == two[j].id) {//如果界面上传过来的id  和对象中的id一致
        var three = two[j].list;
        this.setData({
          listDatas2: three
        })
      }
    }

  },
  showview: function(e) {
    var id = e.currentTarget.id
    var obj = this.data.listDatas
    this.setData({
      display: "block",
    })
    for (var i = 0; i < obj.length; i++) {
      if (id == obj[i].id) { //如果界面上传过来的id  和对象中的id一致
        var two = obj[i].list;
        this.setData({
          listDatas1: two
        })
        
      }
    }

  },
  hideview: function(e) {
    var name = e.currentTarget.dataset.name

    this.setData({
      display: "none",
      name: name
    })
wx.setStorageSync('name', name)
     //=== 2.存储到数据缓存的方式 =========
    // wx.setStorage({
    //   key: "name",
    //   data: this.data.name,
    //   success: function () {
    //   }
    // })
    wx.navigateBack();   //返回上一个页面

  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      listDatas: listDatas.list_data
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})