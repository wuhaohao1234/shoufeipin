var t, app = getApp(),
  api = require("../../utils/donateApi")
Page({

  data: {
    page: 1,
    isMove: false,
    isLoading: true,
    openMove: true,
    list: [],
    isShowPopup: false
  },

  getList() {
    t.setData({
      isLoading: true
    })
    api.donateList({ page: t.data.page }, res => {
      res.data = res.data.map(item => {
        item = {
          id: item.id,
          main_picture: item.main_picture,
          this_money: item.this_money,
          subtitle: item.subtitle,
          title: item.title
        }
        return item
      })
      var list = t.data.isMove ? t.data.list.concat(res.data) : res.data
      console.log('列表', list)
      if (list) {
        t.setData({
          list,
          isLoading: false,
          isMove: false,
          openMove: res.data.length > 0
        })
      }
    })
  },
  closeShow() {
    t.setData({
      isShowPopup: false
    })
  },

  openShow() {
    t.setData({
      isShowPopup: true
    })
  },

  getCertificate() {
    api.certificate(res => {
      console.log(res.data)
      res.data.issue_date = res.data.issue_date.substr(0, 10)
      t.setData({
        certificateData: res.data
      })
    })
  },

  onJumpDetails(e) {
    var value = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/donate/details/details?id=' + value
    })
  },

  
  onLoad: function (options) {
    t = this;
  },

  onShow: function () {
    t.setData({
      page: 1
    })
    t.getList()
    t.getCertificate()
  },

  onReachBottom: function () {
    if (t.data.openMove) {
      t.setData({
        isMove: true,
        page: ++t.data.page
      })
      t.getList()
    }
  }
})