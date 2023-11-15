var t, api = require("../../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top3: [],
    list: [],
    statu: 3, // 0:本周1:本月2:今年3:总
    allowAdd: true,
    titleTop: wx.getMenuButtonBoundingClientRect().top,
    titleHeight: wx.getMenuButtonBoundingClientRect().height,
    chaertn: '--'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    t = this
  },

  switchTab(e) {
    const status = parseInt(e.currentTarget.dataset.status);
    t.setData({
      statu: status
    })
    t.getList()
  },

  getList() {
    let opt = {}
    opt.uid = wx.getStorageSync("user_id")
    opt.statu = t.data.statu
    api.getRanking(opt, function (res) {
      if (res.data.list && res.data.list.length > 0) {
        const list = res.data.list.slice(3)
        console.log(list)
        t.setData({
          top3: res.data.list.slice(0, 3),
          list: res.data.list.slice(3),
          chaertn: res.data.chaertn
        })
      } else {
        t.setData({
          top3: [],
          list: [],
          chaertn: res.data.chaertn
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    t.setData({
      list: [],
      statu: 3, // 0:本周1:本月2:今年3:总
      allowAdd: true
    })
    t.getList();
   		// 这里兼容自定义tab
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
			})
		}

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // if(t.data.allowAdd){
    //   t.setData({
    //     page:t.data.page+1
    //   })
    //   t.getList()
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  
})