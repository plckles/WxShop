// pages/goodslist/goods.js
const listData = require('../../utils/list-data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  tapHandle(e) {
    let {
      management
    } = this.properties
    if (management) {
      this.triggerEvent('viewDetailFunc', {
        id: e.currentTarget.dataset.itemid
      })
    }
  },
  stepperEvent(e) {
    let myEventDetail = e.detail;
    if (myEventDetail.action === 'blur') return
    this.triggerEvent('ContentEvent', myEventDetail)
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