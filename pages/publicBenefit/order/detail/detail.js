// pages/recovery/order/detail/detail.js
var t;
var api = require("../../../../utils/api")
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
		let opt = {}
		opt.id = options.id;
		api.selfOrderDetail(opt, function (res) {
			console.log(res)
			t.setData({
				info:res.data,
				id: options.id
			})
		})
	},
	
	toRecovery:function (){
		wx.navigateTo({
			url:"/pages/recovery/recovery"
		})
	},
	clearOrder:function(e){
		let opt = {}
		opt.id = this.data.id
		wx.showModal({
			title: '提示',
			content: '确定取消该订单吗？',
			success (res) {
				if (res.confirm) {
					api.cancelSelfOrder(opt, function (res) {
						wx.navigateBack()
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	
	phone:function(e){
		let phoneNumber = e.currentTarget.dataset.number
		wx.makePhoneCall({
			phoneNumber:phoneNumber
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