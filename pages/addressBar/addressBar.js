// pages/addressBar/addressBar.js
var amapFile = require("../miniprogram/libs/amap-wx.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessArea:[],
    address:'',
    active:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({key:'621a6cd6b1e05e1d6844e0a253d824ea'});
    myAmapFun.getRegeo({
      success: function(data){
        console.log(data)
        that.setData({
          businessArea: data[0].regeocodeData.addressComponent.businessAreas
        })
        //成功回调
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
  },
  toAddress(){
    wx.navigateTo({
      url: '/pages/workAddress/workAddress',
    })
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // var houseNumber = wx.setStorageSync('houseNumber',e.detail.value.houseNumber);
    // console.log(houseNumber)
    
  },
  businessName(e){
    var businessName = e.currentTarget.dataset.name;
    var businessName = wx.setStorageSync('businessName',businessName);

    var index = e.currentTarget.dataset.index;
    console.log(index)
    for(var i=0;i<this.data.businessArea.length;i++){
      if(index==i){
        this.setData({
          active:'active'
        })
      }
    }

  },
  submit(){
    // wx.navigateBack({})
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
   var address = wx.getStorageSync('address');
   this.setData({
    address:address
   })
   
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