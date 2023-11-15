var t;
var api = require("../../../utils/homemakingApi")

Page({

  data: {
    infoData: null,
    id: null
  }, 

  getData() {
    api.housekeeperDetail({ id: t.data.id }, res => {
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