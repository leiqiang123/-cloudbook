 // pages/appcenter/appcenter.js
import { fetch, formatTime } from "../../utils/util.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  getData(){
    fetch.get('/readList').then(res => {
      this.addPercent(res.data)
      console.log(res)
      this.setData({
        book: res.data,
      })
    })
  },
  addPercent(arr){
    arr.forEach(item=>{
      item.percent = item.title.index / item.title.total * 100
      item.percent = item.percent.toFixed(0)
      item.time = (Date.parse(new Date()) - Date.parse(item.updatedTime))/1000
      item.time = this.updateTime(item.time.toFixed(0))
    })
  },
  //对更新时间做个判断
  updateTime(time){
    if (time<60){
      return time + '秒前'
    }else if(time >= 60 && time < 3600){
      return (time / 60).toFixed(0) + "分钟前"
    }else if(time >= 3600 && time < 86400){
      return (time / 3600).toFixed(0) + "小时前"
    }else if(time >= 86400) {
      return (time / 86400).toFixed(0) + "天前"
    }
  },
  viewDoc(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
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