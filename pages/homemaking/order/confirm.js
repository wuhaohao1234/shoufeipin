var t, app = getApp(),
  api = require("../../../utils/homemakingApi"),
  dapi = require("../../../utils/api")
const util = require('../../../utils/util.js')
Page({

  data: {
    id: "",
    allianceId: null,
    address: null,
    info: null,
    userInfo: {},
    date: null,
    time: null,
    startDate: null,
    startTime: null,
    user_remark: null,
    isSubmit: false,
    payType: 0
  },

  bindDateChange(e) {
    let value = e.detail.value;
    var date = new Date() // 当前时间新增半小时
    var time = date.setMinutes(date.getMinutes() + 30)
    var newTime = value === util.formatDate(date) ? util.formatDateTime(new Date(time)) : ''
    t.setData({
      date: value,
      time: newTime,
      startTime: newTime
    })
  },

  bindTimeChange(e) {
    let value = e.detail.value;
    t.setData({
      time: value
    })
  },

  setPayType(e) {
    let value = e.currentTarget.dataset.type
    console.log(value)
    t.setData({
      payType: value
    })
  },

  onRemark(e) {
    let value = e.detail.value;
    t.setData({
      user_remark: value
    })
  },

  getData() {
    api.houseworkDetail({
      id: t.data.id,
      alliance_id: t.data.allianceId
    }, res => {
      console.log(res.data)
      const info = {
        money: res.data.money,
        subtitle: res.data.subtitle,
        title: res.data.title,
        unit: res.data.unit,
        cover: res.data.banner_picture[0]
      }
      t.setData({
        info
      })
      console.log(res.data)
    })
  },

  onSubmit() {
    if (!t.data.date || !t.data.time) {
      wx.showToast({
        icon: 'none',
        title: '请选择预约日期和时间',
      })
      return
    }
    if (!t.data.isSubmit) {
      var parameter = {
        id: t.data.id,
        address_id: t.data.address.id,
        reservation_time: t.data.date + ' ' + t.data.time,
        user_remark: t.data.user_remark,
        payment_type: t.data.payType
      }
      api.reservation(parameter, res => {
        t.setData({
          isSubmit: true
        }) // 关锁
        if(t.data.payType == 0) {
          t.onPay(res.data.option)
        } else {
          t.setData({
            isSubmit: false
          }) // 开锁
          wx.showToast({
            title: '支付成功',
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/homemaking/order/list',
            })
          }, 1000)
        }
      })
    }
  },

  onPay(data) {
    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: data.signType,
      paySign: data.paySign,
      success(res) {
        t.setData({
          isSubmit: false
        }) // 开锁
        wx.showToast({
          title: '支付成功',
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/homemaking/order/list',
          })
        }, 1000)
      },
      fail(res) {
        t.setData({
          isSubmit: false
        }) // 开锁
        console.log(res)
      }
    })
  },

  checkAddress() {
    wx.navigateTo({
      url: "/pages/me/userAddress/userAddress"
    })
  },

  onLoad: function (options) {
    t = this;
    t.setData({
      id: options.id,
      startDate: util.formatDate(new Date()),
      allianceId: options.allianceId
    })
    console.log(t.data.startDate)
  },

  onShow: function () {
    let address = app.globalData.address
    if (address) {
      t.setData({
        address
      })
      t.getData()
    } else {
      api.getAddress(function (res) {
        if (res.data.list.length > 0) {
          for (let address of res.data.list) {
            if (address.is_default === 1) {
              t.setData({
                address
              })
              app.globalData.address = address
              t.getData()
              break;
            }
          }
          if (!t.data.address.id) {
            t.setData({
              address: res.data.list[0]
            })
            app.globalData.address = address
            t.getData()
          }
        } else {
          // 跳去新增地址
          wx.showModal({
            title: '启动服务失败',
            content: '温馨提示：该功能需要您新增一个地址',
            showCancel: false,
            confirmText: '新增地址',
            success: function () {
              wx.navigateTo({
                url: '/pages/me/userAddress/userAddress',
              })
            }
          })
        }
      })
    }
    dapi.wallet(function(res) {
			t.setData({
				userInfo:res.data
			})
		})
  }
})