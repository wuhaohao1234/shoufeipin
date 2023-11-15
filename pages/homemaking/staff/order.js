var t;
var api = require("../../../utils/homemakingApi")

Page({

  data: {
    isLoading: true,
    isMove: false,
    openMove: true,
    page: 1,
    status: '',
    orderList: []
  },
  onTake(e) {
    let id = e.currentTarget.dataset.id
    wx.showModal({
      title: '温馨提示',
      content: '确定接受该订单吗？',
      success(res) {
        if (res.confirm) {
          api.orderTake({
            id: id
          }, res => {
            var status = 'orderList[' + index + '].order_status'
            t.setData({
              [status]: 1
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onFinish(e) {
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '请确保该服务已完成',
      confirmText: '确定完成',
      success(res) {
        if (res.confirm) {
          api.orderFull({
            id: id
          }, res => {
            var status = 'orderList[' + index + '].order_status'
            t.setData({
              [status]: 2
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  toDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/homemaking/staff/orderDetails?id=" + id
    })
  },
  checkTab: function (e) {
    let status = e.currentTarget.dataset.status
    t.setData({
      status,
      page: 1,
      orderList: []
    })
    t.getList()
  },

  getList() {
    t.setData({
      isLoading: true
    })
    var parameter = {
      order_status: t.data.status,
      page: t.data.page
    }
    console.log(parameter)
    // 获取列表
    api.staffOrderList(parameter, res => {
      var list = t.data.isMove ? t.data.orderList.concat(res.data.list) : res.data.list
      console.log('列表', list)
      t.setData({
        orderList: list,
        isLoading: false,
        isMove: false,
        openMove: res.data.list.length > 0
      })
    })
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

  onLoad: function (options) {
    t = this;
  },

  onShow: function () {
    t.getList()
  }
})