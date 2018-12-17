// pages/login/login.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('info');
    console.log(info)
    this.setData({
      userinfo:info
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

  },
  goApply: function () {
    wx.navigateTo({
      url: '../apply/apply'
    });
  },
  goYanzheng: function () {
    wx.navigateTo({
      url: '../password/password'
    });
  },
  sublogin: function (e) {
    var mobile = e.detail.value.mobile;
    var password = e.detail.value.password;
    if (!(mobile && password)) {
      wx.showToast({
        title: '存在未填写字段',
      })
      return false;
    }else{
      wx.request({
        url: app.globalData.https + "/wxapi/login/index",
        data: {
          password: password,
          mobile: mobile
        },
        success: function (e) {
          console.log(e)
          wx.setStorageSync("login",e);//登录 
          if (e.data.status == 1) {
            wx.reLaunch({
              url: '../index/index',
            });
          } else {
            wx.showToast({
              title: e.data.msg,
            })
          }
        }
      })
    }
    

  }
})