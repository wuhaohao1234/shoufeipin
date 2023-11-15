var t, app = getApp(),
  api = require("../../../utils/donateApi")
Page({

  data: {
    id: null,
    infoData: {},
    progressVal: 0,
    isShowSelect: false,
    selectVal: null,
    now: 1
  },

  getInfo() {
    api.donateDetail({ id: t.data.id }, res => {
      res.data.schedule_money = parseFloat(res.data.schedule_money)
      res.data.this_money = parseFloat(res.data.this_money)
      console.log('详情', res.data)
      var progressVal = (res.data.this_money / res.data.schedule_money) * 100
      console.log('progressVal', progressVal)
      t.setData({
        infoData: res.data,
        progressVal: progressVal > 100 ? 100 : progressVal
      })
    })
  },

  showSelect() {
    t.setData({
      isShowSelect: true
    })
  },

  closeSelect() {
    t.setData({
      isShowSelect: false
    })
  },

  onSwitch(e) {
    t.setData({
      now: e.currentTarget.dataset.index
    })
  },

  bindKeySelect(e) {
    t.setData({
      selectVal: e.detail.value
    })
  },

  onSubmit() {
    if((t.data.now == 3 && t.data.selectVal) || t.data.now == 1 || t.data.now == 2) {
      var money =  0
      if (t.data.now == 1) {
        money = 10
      } else if(t.data.now == 2) {
        money = 50
      } else if(t.data.now == 3) {
        money = t.data.selectVal
      }
      api.submitDonate({
        money: money,
        id: t.data.id
      }, res => {
        t.getCertificate()
        t.getInfo()
        t.setData({
          selectVal: '',
          now: 1,
          isShowSelect: false
        })
      })
    } else {
      wx.showToast({
        icon: "none",
        title: '请输入自定义积分',
      })
    }
    // submitDonate
  },


  closeShow() {
    t.setData({
      isShowPopup: false
    })
  },

  getCertificate() {
    api.certificate(res => {
      console.log(res.data)
      res.data.issue_date = res.data.issue_date.substr(0, 10)
      t.setData({
        certificateData: res.data,
        isShowPopup: true
      })
    })
  },

  onLoad: function (options) {
    t = this;
    t.setData({
      id: options.id
    })
    t.getInfo()
  },

  onShow: function () {}
})