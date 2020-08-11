// pages/position_classification/positionClassification.js、
var url = require("../../utils/request.js")

let listDatas = require('../../datas/List.js');



Page({

  /**
   * 页面的初始数据
   */
  data: {
    listDatas: {}, //第一层数据
    display: '',
    listDatas1: {}, //第二层数据
    listDatas2: {}, //第三层数据
    name: '', //职位名称
    active: 0,
    active1: 0,
    active2: 0,
    positionName:'',
    hosList:[],//页面显示的数据
    isShow:false
    
  },
  none:function(){
    this.setData({
      display: "none"      
    })   
  },

  input1:function(e){//输入时 实时调用搜索方法
    this.search(e.detail.value)
    },
    confirm1:function(e){//软键盘 搜索按钮 调用 （此方法可不用）
    this.search(e.detail.value)
    },
    search:function(key){//搜索方法 key 用户输入的查询字段 
    var This = this;    
    var hosList = wx.getStorage({
      key: 'hosList',
      success: function(res) {//从storage中取出存储的数据
        console.log(res.data)
        if (key == "") {//用户没有输入 全部显示
          This.setData({
            hosList:"",
            isShow:false
          })
          return;
        }
    
        var arr = [];//临时数组 用于存放匹配到的数据
        for (let i in res.data) {         
          res.data[i].show = false;    //所有数据隐藏      
          if (res.data[i].name.indexOf(key) >= 0) {    //查找       
            res.data[i].show = true;//匹配到的数据显示
            arr.push(res.data[i])
          }
        }
        if (arr.length==0){
          This.setData({
            hosList: [{show:true,name:'无相关数据'}],
            isShow:true,

          })
        }else{
          This.setData({
            isShow:true,
            hosList: arr//找到的数据在页面显示
          })
        }
    
      },
    })
    },



  showList(e) {
    var id = e.currentTarget.id
    var two = this.data.listDatas1
    for (var j = 0; j < two.length; j++) {
      if (id == two[j].id) { //如果界面上传过来的id  和对象中的id一致        
        var three = two[j].list;
        this.setData({
          listDatas2: three,
          active: two[j].id
        })

      }
    }

  },
  showview: function(e) {
    var id = e.currentTarget.id
    var obj = this.data.listDatas
    this.setData({
      display: "block",
    })
    for (var i = 0; i < obj.length; i++) {
      if (id == obj[i].id) { //如果界面上传过来的id  和对象中的id一致
        var two = obj[i].list;
        this.setData({
          listDatas1: two,
          active1: obj[i].id,
        })
        var two = this.data.listDatas1
        //如果界面上传过来的id  和对象中的id一致
        this.setData({
          active: two[0].id
        })
          //如果界面上传过来的id  和对象中的id一致
          var three = two[0].list;
          this.setData({
            listDatas2: three,
          })
      }
    }

  },
  hideview: function(e) {
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    //向上一个页面中的data 中赋值
    prevPage.setData({
      positionId: e.currentTarget.dataset.id,
      positionName: e.currentTarget.dataset.name
    })
    this.setData({
      display: "none",
      name: e.currentTarget.dataset.name,
      active1: 0
    })    
    this.setData({
        active: 1
      });
    wx.navigateBack({ delta: 1 })
  },
  //搜索
  tohosList:function(e){
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    //向上一个页面中的data 中赋值
    prevPage.setData({
      positionId: e.currentTarget.dataset.id,
      positionName: e.currentTarget.dataset.name
    })
    this.setData({
      name: e.currentTarget.dataset.name,
      isShow:false,
    })
    wx.navigateBack({ delta: 1 })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var hosLists = listDatas.list_data
    var arr=[]
    var arr1=[]
   for(var i =0;i<hosLists.length;i++){
     for(var j = 0;j<hosLists[i].list.length;j++){
      arr.push(hosLists[i].list[j])
     }
   }
   for(var i =0;i<arr.length;i++){
     for(var j=0;j<arr[i].list.length;j++){
      arr1.push(arr[i].list[j])
     }
   }
   this.setData({
    listDatas: listDatas.list_data,
    // hosList:arr1
  })
      wx.setStorage({//获取的时候存储在本地
      key: 'hosList',
      data: arr1,
      })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})