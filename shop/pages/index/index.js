// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      id: 1,
      img: "home",
      cimg: "c-home",
      name: "首页",
      state: true
    }, {
      id: 2,
      img: "icon-2",
      cimg: "c-icon-2",
      name: "全部商品",
      state: false
    },
    {
      id: 3,
      img: "cart",
      cimg: "c-cart",
      name: "购物车",
      state: false
    },
    {
      id: 4,
      img: "mine",
      cimg: "c-mine",
      name: "我的",
      state: false
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  checkdetail(){
    wx.navigateTo({
      url: '../banner/banner',
    })
  },
  gooddetail(){
    wx.navigateTo({
      url: '../goodDetail/goodDetail',
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
  //自定义导航栏处理函数
  checkType(e) {
    var id = e.currentTarget.dataset.id
    if (id == 1) {
      wx.reLaunch({
        url: '../index/index?id=' + id,
      })
    } else if (id == 2) {
      wx.reLaunch({
        url: '../goodslist/goods?id=' + id,
      })
    }
    else if (id == 3) {
      if (wx.getStorageSync("login").data) {
        wx.reLaunch({
          url: '../cart/cart?id=' + id,
        })
      } else {
        wx.reLaunch({
          url: '../login/login?id=' + id,
        })
      }
    }
     else {
      if (wx.getStorageSync("login").data) {
        wx.reLaunch({
          url: '../mine/mine',
        })
      } else {
        wx.reLaunch({
          url: '../login/login?id=' + id,
        })
      }
    }
  },
})