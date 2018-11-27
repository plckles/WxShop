// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    num:1,
    payType: [{
      id: 1,
      pay: true,
      name: "自取"
    }, {
      id: 2,
      pay: false,
      name: "快递"
    }],
    showData: false,//隐藏
    showModel:false,
    
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
  checkPay(e){
    var index = e.currentTarget.dataset.id, list = this.data.payType
    for (let i = 0; i < list.length; i++) {
      if (index == list[i].id) {
        list[i].pay = true
      } else {
        list[i].pay = false
      }
    }
    this.setData({
      payType: list,
      paytypes: index
    })
    console.log(index)
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
  /**
  * 获取焦点
  */
  getFocus: function () {
    this.setData({ payFocus: true });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function (e) {
    this.setData({ 
      pwdVal: e.detail.value 
    });

    if (e.detail.value.length >= 6) {
      this.hidePayLayer();
    }
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function () {
    var val = this.data.pwdVal;
    this.setData({ 
      showPayPwdInput: false,
      payFocus: false, 
      pwdVal: '' ,
      showData: false,
      showModel: false
    });

  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function () {
    this.setData({
       showPayPwdInput: true, 
       payFocus: true
   });
  },
  /*提交订单 */
  submit(){
   this.setData({
     showData:true,
     showModel:true
   })
  },
  close(){
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  quxiao(){
    this.setData({
      showData: false,
      showModel: false,
      showPay: false
    })
  },
  /*选择付款方式 */
  select(){
    this.setData({
      showData: true,
      showModel:false,
      showPay: true
    })
  },
  fanhui(){
    this.setData({
      showData: true,
      showModel: true,
      showPay: false
    })
  }
})