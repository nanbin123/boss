// pages/positionDescribe/positionDescribe.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noteMaxLen: 500,   //详细地址的字数限制
    currentNoteLen: 0,//输入的字数
    positionDescribe:''//职位描述内容
  },
  //统计字符数量
  input(event) {
    var value = event.detail.value,
        len = parseInt(value.length);
    let that = this;
    this.setData({
      currentNoteLen: len
    });
  },
  formSubmit: function (e) {   
    let currentPages = getCurrentPages();
    let prevPage = currentPages[currentPages.length - 2];
    //向上一个页面中的data 中赋值
    prevPage.setData({
      positionDescribe:e.detail.value.positionDescribe
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      positionDescribe:options.positionDescribe
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})