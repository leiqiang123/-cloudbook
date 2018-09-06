// pages/details/details.js
import { fetch } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookId:"",
    bookData:{},
    isLoading:false,
    isCollect:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookId:options.id,
      isLoading: true,
    })
    this.getData()
  },
  getData() {
    fetch.get(`/book/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        bookData:res.data,
        isLoading: false,
        isCollect:res.isCollect
      })
    })
  },
  jumpCatalog(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/catalog/catalog?id=${id}`,
    })
  },
  taggleCollect(){
    this.setData({
      isCollect:this.data.isCollect+1
    })
    fetch.post("/collection", { bookId: this.data.bookId}).then((res)=>{
      console.log(res)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return{
      title:this.data.bookData.title,
      path:`/pages/details/details?id=${this.data.bookId}`,
      imageUrl: this.data.bookData.img
    }
  }
})