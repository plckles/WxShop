// pages/goodslist/goods.js
const listData = require('../../utils/list-data.js');
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
      state: false
    }, {
      id: 2,
      img: "icon-2",
      cimg: "c-icon2",
      name: "全部商品",
      state: true
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
    contentActive: '', // 内容栏id
    navActive: 0, // 导航栏选中id
    heightArr: [],
    containerH: 0,
    defaultImg: '../../assets/images/goods-img-default.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let query = wx.createSelectorQuery().in(this);
    let heightArr = [];
    let s = 0;
    query.selectAll('.pesticide').boundingClientRect((react) => {
      react.forEach((res) => {
        s += res.height;
        heightArr.push(s)
      });
      this.setData({
        heightArr: heightArr
      })
    });
    query.select('.content').boundingClientRect((res) => {
      // 计算容器高度
      this.setData({
        containerH: res.height
      })
    }).exec()
    this.setData({
      data: listData.data
    })
    var info = wx.getStorageSync('info');
    this.setData({
      userinfo: info
    })
    console.log(info)
    console.log(info.store_id)
  },
  
  chooseType(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    this.setData({
      contentActive: id,
      navActive: index
    })
  },
  onScroll(e) {
    let scrollTop = e.detail.scrollTop;
    let scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH) {
      return
    } else {
      for (let i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.setData({
            navActive: 0
          })
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          this.setData({
            navActive: i
          })
        }
      }
    }
  },
  checktype(){
    wx.navigateTo({
      url: '../screen/screen',
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
          // url: '../personal/personal?id=' + id,
          url: '../login/login?id=' + id,
        })
      }
    }
  },
})