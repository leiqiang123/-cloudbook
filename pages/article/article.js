// pages/article/article.js
import { fetch } from "../../utils/util.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleId:"",
    bookId:"",
    article:{},
    title:"",
    catalog:[],
    isShow:false,
    isLoading: false,
    numb:40,
    index:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      titleId: options.id,
      bookId:options.bookId,
      isLoading: true
    })
    this.getData()
    this.getcatalog()
  },
  getData(){
    this.setData({
      isLoading:true
    })
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      this.setData({
        article: res.data.article.content,
        title:res.data.title,
        index: res.data.article.index,
        isLoading: false
      })
    })
  },
  getcatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      this.setData({
        catalog:res.data
      })
    })
  },
  taggleCatalog(){
    let isShow = !this.data.isShow
    this.setData({
      isShow
    })
  },
  taggleGet(e){
    const id = e.currentTarget.dataset.id
    this.setData({
      titleId:id
    })
    this.taggleCatalog()
    this.getData()
  },
  taggleAdd(){
    let numb = this.data.numb + 2
    this.setData({
      numb
    })
  },
  taggleReduce(){
    let numb = this.data.numb - 2
    if(numb < 24){
      wx:wx.showModal({
        title: '提示',
        content: '不能再小了哦',
        showCancel: false
      })
    }else{
      this.setData({
        numb
      })
    }
  },
  lastchapter(){
    let index = this.data.index - 1
    if (this.data.catalog[index]) {
      this.setData({
        titleId: this.data.catalog[index]._id
      })
      this.getData()
    } else {
      wx: wx.showModal({
        title: '提示',
        content: '已经是第一章了哦！',
        showCancel: false
      })
    }
  },
  nextchapter(){
    let index = this.data.index + 1
    if (this.data.catalog[index]){
      this.setData({
        titleId: this.data.catalog[index]._id
      })
      this.getData()
    }else{
      wx: wx.showModal({
        title: '提示',
        content: '已经是最后一章了哦！',
        showCancel: false
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