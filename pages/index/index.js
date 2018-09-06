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
        resolve()
        this.setData({
          mainContent: res.data,
          isLoading: false
        })
      }).catch(err => {
      })
    })
  },
  getMoreContent(){
    return new Promise((resolve,reject)=>{
      fetch.get('/category/books', { pn: this.data.pn }).then(res => {
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
