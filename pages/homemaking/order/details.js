var t;
var api = require("../../../utils/homemakingApi")

Page({

  data: {
    infoData: null,
    id: null
  }, 

  onJumpStaff(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/homemaking/staff/details?id=" + id
    })
  },

  getData() {
    api.orderDetail({ id: t.data.id }, res => {
      console.log(res.data)
      t.setData({
        infoData: res.data
      })
    })
  },

  onLoad: function (options) {
    t = this;
    t.setData({
      id: options.id
    })
    t.getData()
  },

  onShow: function () {}
})