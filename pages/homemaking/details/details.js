var t, app = getApp(),
  api = require("../../../utils/homemakingApi")
Page({

  data: {
    id: '',
    allianceId: null,
    bannerCurrent: 1,
    info: {}
  },
  // 监听banner切换
  bindchange(e) {
    var value = e.detail.current + 1
    this.setData({
      bannerCurrent: value
    })
    console.log(e.detail.current)
  },

  // 跳转预约
  onSubmit() {
    wx.navigateTo({
      url: '/pages/homemaking/order/confirm?id=' + t.data.id + '&allianceId=' + t.data.allianceId,
    })
  },

  getData() {
    api.houseworkDetail({
      id: t.data.id,
      alliance_id: t.data.allianceId
    }, res => {
      t.setData({
        info: res.data
      })
      console.log(res.data)
    })
  },

  onLoad: function (options) {
    console.log(options)
    t = this;
    t.setData({
      id: options.id,
      allianceId: options.allianceId
    })
    t.getData()
  }
})