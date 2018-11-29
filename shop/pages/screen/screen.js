// pages/screen/screen.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
   },
  showsceen(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.right(0).step()

    this.setData({
      model:true,
      showsceen: animation.export()
    })
  },
  hidden(){
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.right('-600rpx').step()

    this.setData({
      model: false,
      showsceen: animation.export()
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
    let query = wx.createSelectorQuery().in(this);
    query.select('.top-warp').boundingClientRect((res) => {
      console.log(res)
      // 计算容器高度
      this.setData({
        height: res.height
      })
    }).exec()
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