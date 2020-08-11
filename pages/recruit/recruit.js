// pages/recruit/recruit.js
var url = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moment: [],
    page: 1,
    oldList: [],
    isLastPage: false,
    listdata:'',
    sortType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    var that = this;
    this.onReachBottom()
    //加载我发布的职位
      wx.request({
        url: url.default + 'position/selectPositionByUserid', 
        data: {},
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
          'token': wx.getStorageSync('token')
        },
        success(res) {
          that.setData({
            listdata: res.data.data
          })
        }
      })
   
  },
//推荐 全职 兼职 切换
swichNav: function(e) {
  let that = this;
  if(this.data.sortType === e.target.dataset.current) {
    return false;
  }else{
    that.setData({
      sortType: e.target.dataset.current
    })
  }
},
//跳转详情页
  topersonalData(e){  
  wx.navigateTo({
    url: '/pages/personalData/personalData?id='+e.currentTarget.id,
  })
  },
  toJobList() {
    wx.navigateTo({
      url: '/pages/JobListings/JobListings',

    })
  },
  toScreen(){
    wx.navigateTo({
      url: '/pages/screen/ screen',

    })
  },
  // 用户滑动出发
  onPageScroll(e) {
    var top = e.scrollTop;
    this.setData({
      scrollTop: top
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
    // 最后一页了，取消下拉功能
    if (this.data.isLastPage) {     
        return
    }
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })

    wx.request({
      url: url.default+'position/selectIndexUser?limit=3&page=' + that.data.page,
      method: "POST",
      // 请求头部
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        that.setData({
           moment: that.data.moment.concat(res.data.data)           
        });
        if (that.data.page < 4) {
          that.data.page++;
        }else {
          that.data.isLastPage = true;
          wx.showToast({
            title: '已全部加载完',
          })
        }      
        wx.hideLoading();
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})