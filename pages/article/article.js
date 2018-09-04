// pages/article/article.js
import { fetch } from "../../utils/util.js"
const app = getApp()
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
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bookId)
    this.setData({
      titleId: options.id,
      bookId:options.bookId,
      isLoading: true
    })
    this.getData()
    this.getcatalog()
  },
  getData(){
    fetch.get(`/article/${this.data.titleId}`).then(res => {
      let data = app.towxml.toJson(res.data.article.content, 'markdown');
      this.setData({
        article:data,
        title:res.data.title,
        isLoading: false
      })
    })
  },
  getcatalog(){
    fetch.get(`/titles/${this.data.bookId}`).then(res=>{
      console.log(res)
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
    this.getData()
    this.taggleCatalog()
  },
  lastchapter(){
    
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