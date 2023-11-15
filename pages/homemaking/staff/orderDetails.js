var t;
var api = require("../../../utils/homemakingApi")

Page({

  data: {
    infoData: null,
    id: null
  }, 

  onTake() {
    wx.showModal({
			title: '温馨提示',
			content: '确定接受该订单吗？',
			success (res) {
				if (res.confirm) {
          api.orderTake({ id: t.data.id }, res => {
            wx.navigateBack()
          })
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
  },
  onFinish() {
    wx.showModal({
			title: '温馨提示',
      content: '请确保该服务已完成',
      confirmText: '确定完成',
			success (res) {
				if (res.confirm) {
          api.orderFull({ id: t.data.id }, res => {
            wx.navigateBack()
          })
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
  },
  getData() {
    api.staffOrderDetail({ id: t.data.id }, res => {
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