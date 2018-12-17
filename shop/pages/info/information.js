// pages/info/information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ["未知","男","女"],
    sex:0,
    birthday: '2016-09-01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var info = wx.getStorageSync('info')
    that.setData({
      id: info.id
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
            birthday: e.data.data.birthday,
            sex: e.data.data.sex
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
  // 选择 性别
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
  },
  // 选择日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      birthday: e.detail.value
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
    let date = new Date()
    this.setData({
      date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    })
    // console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
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
  /*修改 */
  submit(e) {
    var nickname = e.detail.value.nickname
    var email = e.detail.value.email
    var birthday = this.data.birthday
    var sex = this.data.sex
    // console.log(this.data.userinfo.id)
    // console.log(birthday)
    // console.log(sex)
    wx.request({
      url: app.globalData.https + '/wxapi/mycenter/personData',
      data: {
        id:this.data.id,
        nickname: nickname,
        email: email,
        birthday: birthday,
        sex: sex
      },
      success: function (e) {
        console.log(e)
        if (e.data.status == 1) {
          wx.showToast({
            title: '修改成功',
            duration: 2000
          })
          setTimeout(res => {
            wx.navigateBack({
              url: '../mine/mine'
            })
          }, 1500)
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
  //修改头像
  // chooseImage: function () {
  //   let _this = this;
  //   wx.showActionSheet({
  //     itemList: ['从相册中选择', '拍照'],
  //     itemColor: "#f7982a",
  //     success: function (res) {
  //       if (!res.cancel) {
  //         if (res.tapIndex == 0) {
  //           _this.chooseWxImage('album')
  //         } else if (res.tapIndex == 1) {
  //           _this.chooseWxImage('camera')`3WDw@qA`
  //         }
  //       }
  //     }
  //   })
  // },
  // chooseWxImage: function (type) {
  //   let _this = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'],
  //     sourceType: [type],
  //     count: 1,
  //     success: function (res) {
  //       var tempFilePaths = res.tempFilePaths
  //       wx.uploadFile({
  //         url: 'https://shangdong1.bluehuisaas.com/api/Fuwu/upload_files', //仅为示例，非真实的接口地址
  //         filePath: tempFilePaths[0],
  //         name: 'file',
  //         success: function (res) {
  //           if (res) {
  //             console.log("2222222222")
  //             var val = JSON.parse(res.data)
  //             console.log(val)
  //             imgLists.push(val.list)
  //             console.log(imgLists)
  //             _this.setData({ url: imgLists })
  //           }
  //         }
  //       })
  //       _this.setData({
  //         uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
  //       })
  //     }
  //   })
  // },
})