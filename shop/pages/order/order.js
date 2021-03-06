// pages/order/order.js
const app = getApp()
// import wxRequest from '../../utils/ruquest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options.id){
      this.setData({
        currentTab:options.id
      })
    }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // var url = app.globalData.https + "PEApi/myorder", data = { customerId: app.globalData.userInfo.id };
    // var postLikeRequest = wxRequest.postRequest(url, data);
    // // 订单列表
    // postLikeRequest.then(e => {
    //   console.log(e)
    //   this.setData({
    //     goosList: e.data.obj,
    //     https: app.globalData.https
    //   })
    // })
  },
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  /**  * 点击tab切换    */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
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