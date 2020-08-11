// pages/newCompany/newCompany.js
var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['0-20人', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上'],
    objectArray: [
      {
        id: 0,
        name: '0-20人'
      },
      {
        id: 1,
        name: '20-99人'
      },
      {
        id: 2,
        name: '100-499人'
      },
      {
        id: 3,
        name: '500-999人'
      },
      {
        id: 4,
        name: '1000-9999人'
      },
      {
        id: 5,
        name: '10000人以上'
      }
      
    ],
    index: 0,
    name: '',
    abbreviation: '',
    scale: '',
  },
  // 判断input框是否为空
  bindKeyInput: function (e) {
    if (e.detail.value) {
      this.setData({
        userName: e.detail.value
      })
    } else {
      wx.showToast({
        title: '不能为空或您未更改',
        icon: 'false',
        duration: 2000
      })
    }
  },
  bindPickerChange: function (e) {  
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  formSubmit: function (e) {
    var str = e.detail.value.scale.split("人");
    console.log(str)
    this.setData({
      name: e.detail.value.name,
      abbreviation: e.detail.value.abbreviation,
      scale: str[0]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toLicense(){
    wx.request({
      url: url.default + 'userBoss/insertCompany',
      method: 'POST',
      data: {
        name: this.data.name,
        abbreviation: this.data.abbreviation,
        scale: this.data.scale,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token'),
      },
      success: (res) => {
        if (res.data.code = 200) {
          let pages = getCurrentPages();
          let della = 0;
          for (let i = pages.length - 1; i >= 0; i--) {
            if (pages[i].route === 'pages/personal/personal') {
              break
            }
            della += 1;
          }
          wx.navigateBack({ delta: della })
          wx.setStorageSync('loginData', true)
        }
      }
    });
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