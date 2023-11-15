// pages/recovery/order/detail/detail.js
var t;
var api = require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		info:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		t.setData({
			id:options.id
		})

	},

	getData:function(e){
		let opt = {}
		opt.id = t.data.id;
		api.collectorOrderDetail(opt, function (res) {
			console.log(res)
			t.setData({
				info:res.data
			})
		})
	},

	collectCreate:function (e){
		let id = t.data.info.id
		wx.navigateTo({
			url: "/pages/recycler/collector/create?oid="+id
		})
	},

	collectorConfirm:function (e){
		let id = t.data.info.id
		let opt = {}
		opt.id = id
		api.collectorConfirm(opt,function (res) {
			t.getData()
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
		t.getData()
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