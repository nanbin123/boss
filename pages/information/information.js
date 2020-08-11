// pages/information/information.js
var strophe = require('../../utils/strophe.js')
var WebIM = require('../../utils/WebIM.js')
var WebIM = WebIM.default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    psd: '',
    grant_type: "password",
    search_btn: true,
    search_chats: false,
    show_mask: false,
    yourname: '',
    arr: []
},
bindUsername: function (e) {
    this.setData({
        name: e.detail.value
    })
},
bindPassword: function (e) {
    this.setData({
        psd: e.detail.value
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var phone = wx.getStorageSync('phone')
    var openid = wx.getStorageSync('openid')
    var that = this
    var options = {
      apiUrl: WebIM.config.apiURL,
      user: openid,
      pwd: phone,
      grant_type: that.data.grant_type,
      appKey: WebIM.config.appkey
  }
  wx.setStorage({
      key: "myUsername",
      data: that.data.name
  })
  console.log(options)
//   WebIM.conn.open(options)
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
    var that = this
    var member = wx.getStorageSync('member')
    console.log(member)
    var myName = wx.getStorageSync('myUsername')
    var array = []
    for (var i = 0; i < member.length; i++) {
        if (wx.getStorageSync(member[i].name + myName) != '') {
            array.push(wx.getStorageSync(member[i].name + myName)[wx.getStorageSync(member[i].name + myName).length - 1])
        }
    }
    for (var j=0; j<array.length;j++){
        if (typeof array[j].num_hx == 'undefined'){
            array[j].num_hx = wx.getStorageSync(member[j].name + myName + '-num') || 0
        }
        if (typeof array[j].yourImage === 'undefined'){
            array[j].yourImage = member[j].yourImage
        }
        if (typeof array[j].yourNickname === 'undefined'){
            array[j].yourNickname = member[j].yourNickname
        }
    }
    //console.log(array，'1')
    this.setData({
        arr: array
    })
},
openSearch: function () {
  this.setData({
      search_btn: false,
      search_chats: true,
      show_mask: true
  })
},
cancel: function () {
  this.setData({
      search_btn: true,
      search_chats: false,
      show_mask: false
  })
},
tab_contacts: function () {
  wx.redirectTo({
      url: '../main/main'
  })
},
close_mask: function () {
  this.setData({
      search_btn: true,
      search_chats: false,
      show_mask: false
  })
},
tab_setting: function () {
  wx.redirectTo({
      url: '../settings/settings'
  })
},
into_chatRoom: function (event) {
  var that = this
  //console.log(event)
  var my = wx.getStorageSync('myUsername')
  var nameList = {
      myName: my,
      your: event.currentTarget.dataset.username
  }
  wx.navigateTo({
      url: '../chatroom/chatroom?username=' + JSON.stringify(nameList)
  })
},
del_chat: function (event) {
  var nameList = {
      your: event.currentTarget.dataset.username
  }
  var myName = wx.getStorageSync('myUsername')
  var currentPage = getCurrentPages()
  wx.showModal({
      title: '删除该聊天记录',
      confirmText: '删除',
      success: function (res) {
          if (res.confirm) {
              wx.setStorage({
                  key: nameList.your + myName,
                  data: '',
                  success: function () {
                      if (currentPage[0]) {
                          currentPage[0].onShow()
                      }
                  }
              })
          }
      },
      fail: function (error) {
          //console.log(error)
      }
  })
},


// //输入框
// bindMessage: function (e) {
//   this.setData({
//       userMessage: e.detail.value
//   })
// },
// //清除输入框
// cleanInput: function () {
//   var that = this
//   var setUserMessage = {
//       sendInfo: that.data.userMessage
//   }
//   that.setData(setUserMessage)
// },
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
