// pages/me/userBag/userBag.js
var t, api = require("../../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    allowAdd: true,
  },

  getListByCateAndPage() {
    let opt = {}
    opt.page = t.data.page
    api.storeOrderNew(opt, function (res) {
      if (res.data.list.length > 0) {
        t.setData({
          list: t.data.list.concat(res.data.list)
        })
      } else {
        t.setData({
          allowAdd: false
        })
        wx.showToast({
          title:"没有更多数据",
          icon:"none"
        })
      }

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    t = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    t.setData({
      list: [],
      page: 1,
      allowAdd: true
    })
    t.getListByCateAndPage();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(t.data.allowAdd){
      t.setData({
        page:t.data.page+1
      })
      t.getListByCateAndPage()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})