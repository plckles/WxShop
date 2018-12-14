//app.js
import wxApi from '/utils/ruquest.js'
App({
  onLaunch: function () {
    // 展示本地存储能力
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框          
          var wxLogin = wxApi.wxLogin();
          var jscode = '';
          var session_key = ""; //key
          wxLogin().then(response => {
            jscode = response.code
            var url = this.globalData.https + "/wxapi/login/wxlogin", data = { code: jscode };
            var postLikeRequest = wxApi.postRequest(url, data);
            // 用户登录
            postLikeRequest.then(e => {
              // console.log(e.data)
              session_key = e.data.session_key
              var wxGetUserInfo = wxApi.wxGetUserInfo()
              return wxGetUserInfo() //回调 获取用户信息
            }).then(da => {
              this.globalData.userInfo = da.userInfo //用户授权的用户信息
              var url = this.globalData.https + "/wxapi/login/auth", data = {
                data: da.encryptedData,
                iv: da.iv,
                sessionKey: session_key
              }
              var postLikeRequest = wxApi.postRequest(url, data);
              postLikeRequest.then(ae => { //回调 用户信息
                // if (this.userInfoReadyCallback) {
                //   this.userInfoReadyCallback(ae.data)
                // }
                console.log(ae.data.data)
                wx.setStorageSync('info', ae.data.data);
                // this.globalData.user = ae.data
                // this.globalData.openid = ae.data.openId //用户信息
              })
            })
          })
        } else { //未授权 用户信息
          wx.reLaunch({
            url: '../auth/auth',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    https: 'https://aierp.bluehui.com/index.php'
  }
})