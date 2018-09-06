const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http(url,method,data){
    return new Promise((resolve,reject)=>{
      let token = wx.getStorageSync('token')
      let header = {
        "content-type": "application/json"
      }
      if(token){
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        method,
        data,
        header,
        success(res) {
          // console.log(res)
          if(res.header.Token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })    
  },
  get(url,data){
   return this.http(url,"GET",data)
  },
  post(url,data){
    return this.http(url,"POST",data)
  }
}

const login = ()=>{
  wx.login({
    success(res){
      fetch.post('/login',{
        code:res.code,
        appid:"wx066c827c1ba2ae7c",
        secret:"24d98fdd55e4de781525ae7b6c900138"
      }).then(res=>{
        console.log(res)
      })
    }
  })
}


exports.fetch = fetch;
exports.login = login;