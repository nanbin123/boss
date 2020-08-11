// pages/personal/personal.js
var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginData: '',
    title: '',
    userInfo:'',

  },
  //打开登录提示
  showRule: function () {
    this.setData({
      isRuleTrue: true
    })
  },



  //关闭登录提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },
  getPhoneNumber(e) {   
    var ency = e.detail.encryptedData; 
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      that.setData({
        modalstatus: true
      });
    }else {//同意授权
      wx.request({
        method: "POST",
        url: url.default + 'user/deciphering',
        data: {
          encrypdata: ency,
          ivdata: e.detail.iv,
        },
        header: {
          "token": wx.getStorageSync('token'),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        success: (res) => {
          var obj = JSON.parse(res.data);
          wx.setStorage({
            key: "phone",
            data: obj.phoneNumber
          })
        }, fail: function (res) {
        }

      });
      wx.navigateTo({
        url: '/pages/personalDetails/personalDetails',
      })

    }

    this.setData({
      isRuleTrue: false
    })
  },

  fail: function () {
    that.wxlogin(); //重新登录
  },


  //跳转管理职位
  toManagerialPosition(){
   var loginData = wx.getStorageSync('loginData')
   if(loginData == false){
    this.showRule()
   }else{
     console.log("=================="+loginData)
    wx.navigateTo({
      url: '/pages/JobListings/JobListings',
    })

   }
    
   
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
    console.log("===========onshow======")
    var loginData = wx.getStorageSync('loginData')
    this.setData({
      loginData: loginData
    })
    if (loginData) {
      var that = this
      var company = wx.getStorageSync('company')   
      wx.request({
        url: url.default + 'userBoss/selectIndexUser',
        method: "POST",
        header: {
          "token": wx.getStorageSync('token'),
        },
        success: function (res) { 
          console.log("================="+res.data.data);
          if (res.statusCode == 200) {
            that.setData({
              userInfo: res.data.data,
              // res.data.data.abbreviation+ '·'+
              title:  "博瑞信达"+ '·'+res.data.data.position
            })
          }
        }, fail(err) {               
          token = null;
          wx.removeStorageSync(token);
          setTimeout(() => {
            that.verifyToken(success);
          }, 300);
        }
      });
    }
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