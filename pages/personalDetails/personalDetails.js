var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {
        name: '0', value: '男',
      },
      { name: '1 ', value: '女' },
    ],
    sex: 0,//性别
    userName: '',
    sex: '',
    phone: '',
    type: 'boss', 
    //resumeEmail: '',   
    position: '',
  },
  // 判断input框是否为空
  bindKeyInput: function (e) {
    if (e.detail.value) {
      this.setData({
        userName: e.detail.value
      })
    }
  },
  
  // bind:function(e){
  //  var rsNum1 = e.detail.value   
  //   if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(rsNum1))) {
  //   } else {
  //     wx.showToast({
  //       title: '邮箱格式码有误',
  //       icon: 'none',
  //       duration: 2000
  //     })
  //   }
  // },

  radioChange: function (e) {
    this.setData({
      sex: e.detail.value
    })
  },
  // radioChange1: function (e) {
  //   this.setData({
  //     sex: e.detail.value
  //   }) 
  // },

  formSubmit: function (e) {
    this.setData({
      userName: e.detail.value.userName,
      //resumeEmail: e.detail.value.resumeEmail,
      position: e.detail.value.position

    })
   

  },


  checkLogin(){
    wx.request({
      url: url.default + 'userBoss/insertUserBoss',
      method: 'POST',
      data: {
        userName: this.data.userName ,
        sex: this.data.sex,
        position: this.data.position,
        //resumeEmail: this.data.resumeEmail,
        phone: this.data.phone,
        type: this.data.type,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.code = 200) {         
          wx.navigateTo({
            url: '/pages/newCompany/newCompany'
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      phone: wx.getStorageSync('phone')
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