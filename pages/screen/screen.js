// pages/screen/ screen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    experience: ['不限', '在校/应届', '1年以内', '1-3年', '3-5年', '5-10年', '10年以上'],
    education: ['不限','博士', '硕士', '本科', '大专', '高中', '中专/中技', '初中及以下'],
    pay: ['不限', '3K以下', '3-5K', '5-10K', '10-20K', '20-50K', '50K以上'],
    job: ['不限','离职-随时到岗', '在职-暂不考录', '在职-考虑机会', '在职-月内导航'],
    active:'',
    active1:'',
    active2:'',
    active3:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toexperience(e){
    var index = e.currentTarget.dataset.experience;
         this.setData({
          active:index
         })
  },
  toeducation(e){
    var index = e.currentTarget.dataset.education;
         this.setData({
          active1:index
         })
  },
  topay(e){
    var index = e.currentTarget.dataset.pay;
         this.setData({
          active2:index
         })
  },
  tojob(e){
    var index = e.currentTarget.dataset.job;
         this.setData({
          active3:index
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