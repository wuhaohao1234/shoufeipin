// pages/me/userAddress/userAddress.js
var _this, api = require("../../../utils/api"), app=getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list:[],
	},

	addAddress:function(){
		wx.navigateTo({
			url:"/pages/me/userAddress/detail/index"
		})
	},
	getAddress:function(){
		api.getAddress(function (res) {
			_this.setData({
				list:res.data.list
			})
		})
	},

	editAddress:function(e){
		let address = e.currentTarget.dataset.address;
		address =  JSON.stringify(address)
		wx.navigateTo({
			url:"/pages/me/userAddress/detail/index?address="+address
		})
	},

	checkAddress:function(e){
		app.globalData.address = e.currentTarget.dataset.address;
		wx.navigateBack()
	},

	deleteAddress:function(e){
		let id = e.currentTarget.dataset.id;
		let opt = {};
		opt.id = id;
		api.deleteAddress(opt, function (res) {
			_this.getAddress()
		})
	},

	checkDefaultAddress:function(e){
		let id = e.currentTarget.dataset.id;
		let opt = {};
		opt.id = id;
		api.checkDefaultAddress(opt, function (res) {
			_this.getAddress()
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		_this=this
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
		_this.getAddress();
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