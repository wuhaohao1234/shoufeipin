// pages/shop/pointsDetails/moneyDetails.js
var t, api=require("../../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list:[],
		userInfo:{}
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
		console.log(111111111)
		api.points(function (res) {
			console.log(22222222)
			console.log(res)
			api.getUserInfo(function (res2) {
				console.log(333333333)
				console.log(res2)
				t.setData({
					userInfo: res2.data
				})
				wx.setStorageSync("userInfo", res2.data)
			})
			t.setData({
				list:res.data.list
			})
		})
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