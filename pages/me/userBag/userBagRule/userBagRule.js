// pages/me/userBag/userBagRule/userBagRule.js
var t, api = require("../../../../utils/api")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:""
  },

  escape2Html: function (str) {
    var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
    return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }).replace(/&nbsp;/g, "\xa0");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    t = this
    api.clause(function (res) {
      let recycle_bag_help = t.escape2Html(res.data.recycle_bag_help)
      t.setData({
        content:recycle_bag_help
      })
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})