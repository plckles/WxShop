// pages/goodDetail/goodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换 
    interval: 3000, //自动切换时间间隔 
    duration: 1000, //滑动动画时长 
    imgUrls:[
      '../../image/1.jpg',
      '../../image/8.jpg',
      '../../image/10.jpg'
    ],
    showData: false,
    showModel: false,
    num: 1,//购买数量
    showXin: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /*加入购物车 */
  shopCart(e){
    var that=this;
    var id = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index)
    that.setData({
      showData: true,
      showModel: true,
      id:id
    })
  },
  /*立即购买 */
  purchase(e){
    var that = this;
    var id = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index)
    console.log(wx.getStorageSync("login").data)
    if (wx.getStorageSync("login").data){
      that.setData({
        showData: true,
        showModel: true,
        id: id
      })
    }else{
      wx.navigateTo({
        url: '../login/login?id=2',
      })
    }
    
  },
  close(){
    var that = this;
    that.setData({
      showData: false,
      showModel: false
    })
  },
  // 加减数量
  jian(e) {
    var num = e.currentTarget.dataset.num
    if (num > 1) {
      this.setData({
        num: --num
      })
    }
  },
  jia(e) {
    var num = e.currentTarget.dataset.num
    //console.log()
    ++num
    if (num >= 1) {
      this.setData({
        num: num++
      })
    }
  },
  /*提交 */
  confirm(){
    var that = this;
    console.log(that.data.id)
    if(that.data.id == 1){
      that.setData({
        showData: false,
        showModel: false
      })
    }else{
      that.setData({
        showData: false,
        showModel: false
      })
      wx.navigateTo({
        url: '../conOrder/conOrder',
      })
    }
  },
  /**收藏 */
  collect(){
   if(!this.data.showXin == true){
     this.setData({
       showXin:true
     })
   }else{
     this.setData({
       showXin: false
     })
   }
  }
})