//index.js
//获取应用实例
import {fetch} from "../../utils/util.js"
import {login} from "../../utils/util.js"
const app = getApp()

Page({
  data: {
    swiperData: [],
    mainContent:[],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    isLoading:false,
    pn:1,
    hasMore:true,
    loadDone:false
  },
  onLoad: function () {
    login()
    Promise.all([this.getData(), this.getContent()]).then(res => {
      this.setData({
        hasMore: true,
        pn: 1,
      })
    })
  },
  //获取轮播图
  getData(){  
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get("/swiper").then(res => {
        resolve()
        this.setData({
          swiperData: res.data,
          isLoading: false
        })
      })
    })
  },
  //获取书籍列表
  getContent(){
    return new Promise((resolve,reject)=>{
      this.setData({
        isLoading: true
      })
      fetch.get('/category/books').then(res => {
        this.getTime(res.data)
        resolve()
        this.setData({
          mainContent: res.data,
          isLoading: false
        })
      }).catch(err => {
      })
    })
  },
  getTime(arr){
    arr.forEach(item => {
      item.books.forEach(book => {
        book.time = (Date.parse(new Date()) - Date.parse(book.updateTime)) / 1000
        book.time = this.updateTime(book.time.toFixed(0))
      })
    })
  },
  //对更新时间做个判断
  updateTime(time) {
    if (time < 60) {
      return time + '秒前'
    } else if (time >= 60 && time < 3600) {
      return (time / 60).toFixed(0) + "分钟前"
    } else if (time >= 3600 && time < 86400) {
      return (time / 3600).toFixed(0) + "小时前"
    } else if (time >= 86400){
      return (time / 86400).toFixed(0) + "天前"
    }
  },
  getMoreContent(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
        this.getTime(res.data)
        let newArr = [...this.data.mainContent,...res.data]
        this.setData({
          mainContent: newArr
        })
        resolve(res)        
      })
    })
  },
  jumpBook(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/details/details?id=${id}`,
    })
  },
  onPullDownRefresh(){
    this.setData({
      loadDone: false
    })
    Promise.all([this.getData(), this.getContent()]).then(res=>{
      this.setData({
        hasMore:true,
        pn:1,
        loadDone: false
      })
      wx.stopPullDownRefresh()
    })
  },
  //上拉加载
  onReachBottom(){
    this.setData({
      loadDone: true
    })
    if(this.data.hasMore){
      this.setData({
        pn:this.data.pn+1
      })
      this.getMoreContent().then(res => {
        if (res.data.length < 2) {
          this.setData({
            hasMore: false
          })
        }
      })
    }else{
    }
  }
})
