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
  
  toDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/homemaking/order/details?id=" + id
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
    t.setData({isLoading: true})
    var parameter = {
      order_status: t.data.status,
      page: t.data.page
    }
    console.log(parameter)
    // 获取列表
    api.orderList(parameter, res => {
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

  onCancelOrder(e) {
    var id = e.currentTarget.dataset.id
    wx.showModal({
			title: '提示',
			content: '确定取消该订单吗？',
			success (res) {
				if (res.confirm) {
					api.cancelOrder({
            id: id
          }, res => {
            t.getList()
          })
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
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