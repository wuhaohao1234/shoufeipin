// pages/news/newsInfo/newsInfo.js
var t, api = require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		id:1,
		news:{}
	},

	getNewsById:function(){
		let opt= {};
		opt.id = t.data.id;
		api.getNewsById(opt, function (res) {
			console.log(res)
			res.data.content = res.data.content.replace(/&nbsp;/g,"\xa0")
			t.setData({
				news:res.data
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		let id = options.id;
		t.setData({
			id
		})
		t.getNewsById()
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