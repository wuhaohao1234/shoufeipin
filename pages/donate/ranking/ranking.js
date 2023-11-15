var t, app = getApp(),
  api = require("../../../utils/donateApi")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    allowAdd: true
  },

  getListByPage: function () {
    let opt = {}
    opt.page = t.data.page
    api.rankingList(opt, function (res) {
      console.log(res.data)
      if (res.data.length > 0) {
        t.setData({
          list: t.data.list.concat(res.data)
        })
      } else {
        t.setData({
          allowAdd: false
        })
      }
    })
  },

  onLoad: function (options) {
    t = this;
  },

  onShow: function () {
    t.setData({
      page: 1,
      allowAdd: true,
      list: [],
    })
    t.getListByPage()
  },

  onReachBottom: function () {
    if (t.data.allowAdd) {
      t.setData({
        page: t.data.page + 1
      })
      t.getListByPage()
    }
  },
})