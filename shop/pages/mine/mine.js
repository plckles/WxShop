
// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = wx.getStorageSync('info')
    that.setData({
      id:info.id
    })
    wx.request({
      url: app.globalData.https + '/wxapi/mycenter/information',
      data: {
        id: that.data.id
      },
      success: function (e) {
        console.log(e);
        if (e.data.status == 1) {
          that.setData({
            user: e.data.data,
          })
        } else {
          wx.showModal({
            title: '友情提示',
            content: e.data.msg,
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }

    })
  }, 
  submit(e){
    console.log(e)
  },
  getformid(e){
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN',
      data: {
        "touser": "OPENID",
        "template_id": "W40sveGSR77fTu-WPRZrdi_3IG5SD9XdW_K-Zmcoi7s",
        "form_id": "FORMID",
      },
      method: 'POST',
      success: res => {
        console.log(res)
      }
    })
  },
  checkinfo(){
    wx.navigateTo({
      url: '../info/information',
    })
  },
  checkbalance(){
    wx.navigateTo({
      url: '../balance/balance',
    })
  },
  checkcolle(){
    wx.navigateTo({
      url: '../collection/collection',
    })
  },
  checkmsg(){
    wx.navigateTo({
      url: '../msg/msg',
    })
  },
  checkorder(e){
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order/order?id='+id,
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
 
})