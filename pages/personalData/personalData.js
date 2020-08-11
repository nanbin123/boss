// pages/ personalData/ personalData.js
var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    wx.request({
      url: url.default + 'position/selectIndexUserById',
      method: 'POST',
      data: {
         id:options.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token'),
      },
      success:(res) =>{
       console.log("================res=========="+JSON.stringify(res.data.data))
       this.setData({
        listData:res.data.data,
        id:res.data.data.openid
       })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tochatRoom(){
    var that = this
var urls = url.default

var token = wx.getStorageSync('token')
var openid = wx.getStorageSync('openid')
var id = that.data.id
console.log(id)

    console.log(token,55555555555555555)
wx.request({
  url: urls+"user/addFriend", //随便一个小巧的接口
  method: "POST",
  data:{
    ownerUsername:openid,
    friendName:id
  },
  header: {
    "Content-Type": "application/x-www-form-urlencoded",
    'token': token
  },
  success: function (res) {
    console.log('------------------------------')

    console.log("校验结果:",res);

    if (res.statusCode == 200) {
      var that = this
      //console.log(event)
      var nameList = {
          myName: openid,
          your: id
      }
      wx.navigateTo({
          url: '../chatroom/chatroom?username=' + JSON.stringify(nameList)
      })
    }
       

  },
  fail(err) {
    console.log("校验失败...");
    console.log(err);
  }
});
// wx.navigateTo({
//   url: '/pages/chatroom/chatroom',
// })
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