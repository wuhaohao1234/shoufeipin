// pages/shop/goodsInfo/goodsInfo.js
var t, api = require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 2000,
		duration: 500,
		goods:{}
	},

	toConfirmOrder: function (e) {
		console.log(JSON.stringify(t.data.goods))
		wx.navigateTo({
			url: "/pages/shop/confirmOrder/confirmOrder?id="+t.data.goods.id
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		let id = options.id;
		let opt = {};
		opt.id = id
		api.goodsDetail(opt, function (res) {
			t.setData({
				goods:res.data
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