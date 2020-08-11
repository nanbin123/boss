// pages/Newposition/Newposition.js
var url = require("../../utils/request.js")

const term = ['不限','一年以内', '1-3年', '3-5年', '5-10年', '10年以上']
const educations = ['不限','初中及以下','中专/中技','高中', '大专', '本科', '硕士', '博士']
const payStr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50']
const payEnd = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50','51']

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    term: term,
    term1: '',
    menu: '',
    experience: 0,
    education: 0,
    pay: 0,
    active: 'active',
    active1: '',
    active2: '',
    educations: educations,
    educations1: '',
    payStr: payStr,
    payEnd: payEnd,
    salary:'',//起始薪资+结束薪资
    salary1: '', 
    positionId:'',//职位类别id
    positionName:'',//职位类别名称
    salaryStr: '',//起始薪资
    salaryEnd: '',//终止薪资
    salaryMonth: '',//薪资月数
    experience: '',//经验
    education: '',//学历
    positionDescribe: '',//职位描述
    address:''//地址
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
   
    if (e.currentTarget.id == 1){
      this.chooseExperienceBtnClick()
    } else if (e.currentTarget.id == 2){
      this.chooseEducationBtnClick()
    }    else if (e.currentTarget.id == 3){
      this.choosePayBtnClick()
    }   
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindChange: function (e) {
    const val = e.detail.value    
    this.setData({
      educations1: this.data.educations[val],
    })
  },
  bindChange1: function (e) {
    let val = e.detail.value  
    this.setData({
      salary:this.data.payStr[val[0]]+'-'+this.data.payEnd[val[1]]
    })
  },
  bindChange2: function (e) {
    const val = e.detail.value
    this.setData({
      term1: this.data.term[val],
    })
  },


  chooseExperienceBtnClick: function (e) {
    //wx.clearStorage(),
      this.setData({
        education: 0,
        experience: 1,
        pay: 0,
        active: 'active',
        active1: '',
        active2: ''
      })
  },
  chooseEducationBtnClick: function (e) {
    this.setData({
      education: 1,
      experience: 0,
      pay: 0,
      active1: 'active',
      active: '',
      active2: ''

    })
  },
  choosePayBtnClick: function (e) {
    this.setData({
      education: 0,
      experience: 0,
      pay: 1,
      active1: '',
      active: '',
      active2: 'active'

    });
  },
  click() {
    this.setData({
      education: 1,
      experience: 0,
      pay: 0,
      active1: 'active',
      active: '',
      active2: ''

    })
  },
  click1() {
    this.setData({
      education: 0,
      experience: 0,
      pay: 1,
      active1: '',
      active: '',
      active2: 'active'


    })

  },
  click2() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  bindKeyInput: function (e) {  
      this.setData({
        userName: e.detail.value
      })
  },

  formSubmit: function (e) {
    //工作经验去掉末尾的年
    let experience= e.detail.value.experience;
    if(experience.substr(experience.length-1,experience.length)=="年"){
        experience=experience.substr(0,experience.length-1);
     }
    //截取薪资范围
    let salary= e.detail.value.salary;
    let arrSalary=salary.split('-');   
    wx.request({
      url: url.default + 'position/insertPosition',
      data: {
         positionName: e.detail.value.name,
         positionType: this.data.positionId,
         experience: experience,
         education: e.detail.value.education,
         salaryStr:arrSalary[0],
         salaryEnd:arrSalary[1],
         positionDescribe:e.detail.value.positionDescribe
        },header: {
        "Content-Type": "application/x-www-form-urlencoded",
        'token':wx.getStorageSync('token')
      },
      success(res) {      
        if (res.data.code = 200) {
          wx.showToast({
            title: '职位发布成功',
            icon: 'none',
            duration: 2000
          })
        }
      }
    });

    // var arr = e.detail.value.salary.split("-")
    // this.setData({      
    //   name: e.detail.value.name,//职位名称
    //   experience: e.detail.value.experience,//经验
    //   education: e.detail.value.education,//学历
    //   positionDescribe: e.detail.value.positionDescribe,//职位描述
    //   salaryStr: arr[0], //起始薪资

    //   salaryEnd: arr[1],//终止薪资
    //   salaryMonth: this.data.salary1
    // })

  },
  toPositionType(){
    wx.navigateTo({
      url: '/pages/positionType/positionType',
    })
  },
  toPositionDescribe(){   
    wx.navigateTo({
      url: '/pages/positionDescribe/positionDescribe?positionDescribe='+this.data.positionDescribe,
    })
  },
  // checkSave() { 
  //     console.log("======================")
  // },
  toworkAddress(){
   wx.navigateTo({
     url: '/pages/addressBar/addressBar',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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