// pages/JobListings/JobListings.js
var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdata:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this  
      wx.request({
        url: url.default + 'position/selectPositionByUserid',
        data: {},
        header: {         
          'token': wx.getStorageSync('token')
        },
        success(res) {
          console.log("===================="+res.data.data)
          that.setData({
            listdata: res.data.data
          })
        }
      })    
  },
  toNewposition(){
  wx.navigateTo({
    url: '/pages/Newposition/Newposition',
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