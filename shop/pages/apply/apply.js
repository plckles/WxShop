// pages/apply/apply.js
var interval = null //倒计时函数
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    authcode: '',
    codename: '获取验证码',
    crrentTime: 60,//限制倒计时60秒
    isClick: false,//获取验证码按钮，默认允许点击
    userinfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var info = wx.getStorageSync('info');
    this.setData({
      userinfo: info
    })
    var that = this
    console.log(options.type)
    that.setData({
      type: options.type
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
  //手机，验证码
  getPhone: function (e) {
    //console.log(e.detail.value)
    this.setData({
      phone: e.detail.value
    })
  },
  getAuthcodeInput: function (e) {
    // console.log(e.detail.value)
    this.setData({
      authcode: e.detail.value
    })
  },
  getAuthcode: function () {
    let that = this;
    //验证手机
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;//正则
    //console.log(that.data.phone)
    if (that.data.phone.length == 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '错误的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    that.setData({
      isClick: true,
    })

    // 60s倒计时 setInterval功能用于循环，常常用于播放动画，或者时间显示
    var currentTime = that.data.crrentTime;
    interval = setInterval(function () {
      currentTime--;//减
      that.setData({
        codename: currentTime + '秒后获取'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          codename: '获取验证码',
          currentTime: 60,
          isClick: false
        })
      }
    }, 1000);

    wx.request({
      url: app.globalData.https + "/wxapi/login/sensms",
      data: {
        mobile: that.data.phone,
        type: 1,
      },
      success(res) {
        console.log(res)
        if (res.data.status == 1) {
          wx.showToast({
            title: '发送成功',
            icon: 'none',
            duration: 1000
          })
        }else{
          wx.showToast({
            title:res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })

  },
  submit: function (e) {
    var password = e.detail.value.password;
    var password2 = e.detail.value.password2;
    var phones = e.detail.value.phones;
    var code = e.detail.value.code;
    var type = this.data.type;
    if (!(phones && code && password && password2)) {
      wx.showToast({
        title: '存在未填写字段',
      })
    } else if (password != password2){
      wx.showToast({
        title: '两次密码不一致',
      })    
    } 
    else {
      var info = wx.getStorageSync('info');
      if (!info.mobile) {
        info.mobile = e.detail.value.phones
        wx.setStorageSync("info", info)
      }
      console.log(type)
      wx.request({
        url: app.globalData.https + "/wxapi/login/register",
        data: {
          openid: info.openid,
          mobile: phones,
          code:code,
          password:password,
          repass:password2,
        },
        success(res) {
          console.log(res);
          if (res.data.status == 1) {
            // wx.setStorageSync('info', res.data.info);
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 1000
            })
            wx.redirectTo({
              url: '../login/login?type='+ type,
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
     
    }
  }
})