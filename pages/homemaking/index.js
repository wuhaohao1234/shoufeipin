var t, app = getApp(),
  api = require("../../utils/homemakingApi")
Page({

  data: {
    isLoading: true,
    isMove: false,
    openMove: true,
    address: null,
    navList: [],
    sel: '',
    page: 1,
    keyword: '',
    goodsList: [],
    areaKeyword: null,
    areaList: [],
    isShowArea: false,
    allianceData: {
      id: null
    }
  },

  switchNav(e) {
    var value = e.target.dataset.id
    if (t.data.sel !== value) {
      t.setData({
        sel: value,
        page: 1
      })
      t.getList()
    }
  },

  onJumpDetails(e) {
    var value = e.currentTarget.dataset.id
    var allianceId = t.data.allianceData.alliance_id
    wx.navigateTo({
      url: '/pages/homemaking/details/details?id=' + value + '&allianceId=' + allianceId
    })
  },

  bindKeyInput(e) {
    const keyword = e.detail.value
    t.setData({
      keyword
    })
  },

  onKeyword() {
    if (t.data.keyword) {
      t.setData({
        page: 1,
        sel: ''
      })
      t.getList()
    }
  },

  onReachBottom(e) {
    if (t.data.openMove) {
      t.setData({
        isMove: true,
        page: ++t.data.page
      })
      t.getList()
      console.log('到底拉', e)
    }
  },

  getTypeList() {
    // 获取分类
    api.houseworkType({}, res => {
      res.data.list.unshift({
        id: '',
        name: "全部"
      })
      console.log('分类', res.data.list)
      t.setData({
        navList: res.data.list
      })
    })
  },

  getList() {
    t.setData({
      isLoading: true
    })
    var parameter = {
      alliance_id: t.data.allianceData.alliance_id,
      type_id: t.data.sel,
      keyword: t.data.keyword,
      page: t.data.page
    }
    console.log('parameter', parameter)
    // 获取列表
    api.houseworkList(parameter, res => {
      var list = t.data.isMove ? t.data.goodsList.concat(res.data.list) : res.data.list
      console.log('列表', list)
      if (list) {
        t.setData({
          goodsList: list,
          isLoading: false,
          isMove: false,
          openMove: res.data.list.length > 0
        })
      }
    })
  },

  bindKeyArea(e) {
    const areaKeyword = e.detail.value
    t.setData({
      areaKeyword
    })
  },

  switchArea() {
    t.setData({
      areaKeyword: '',
      isShowArea: true
    })
  },

  areaChange(e) {
    var item = e.currentTarget.dataset.item
    t.setData({
      allianceData: item
    })
  },

  submitArea() {
    if (t.data.allianceData.alliance_id) {
      t.getList()
      t.setData({
        isShowArea: false
      })
      app.globalData.allianceData = t.data.allianceData
    } else {
      wx.showToast({
        icon: 'none',
        title: '请至少选择一个区域'
      })
    }
  },

  onAreaKeyword() {
    if (t.data.areaKeyword) {
      t.getAreaList()
    }
  },

  getAreaKeyword() {
    api.allianceList({
      keyword: t.data.areaKeyword || ''
    }, res => {
      console.log('有默认地址后的区域', res.data.list[0])
      t.setData({
        allianceData: res.data.list[0]
      })
      app.globalData.allianceData = res.data.list[0]
      t.getList()
    })
  },

  getAreaList() {
    api.allianceList({
      keyword: t.data.areaKeyword || ''
    }, res => {
      console.log('所有区域', res.data.list)
      t.setData({
        areaList: res.data.list
      })
    })
  },

  onLoad: function (options) {
    t = this;
  },

  onShow: function () {
    t.getTypeList()
    t.getAreaList()
    let allianceData = app.globalData.allianceData
    if (allianceData) {
      t.setData({
        allianceData
      })
      t.getList()
    } else {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          let opt = {}
          opt.latitude = res.latitude
          opt.longitude = res.longitude
          api.allianceMatching(opt, res => {
            console.log(res.data)
            t.setData({
              allianceData: res.data
            })
            t.getList()
          })
        }
      })
    }
  }
})