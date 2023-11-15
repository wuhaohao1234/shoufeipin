// pages/me/problemFeedback/problemFeedback.js
var t, api=require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name:"",
		phone:"",
		content:""
	},

	formSubmit:function(e){
		let opt = e.detail.value;
		api.suggest(opt,function (res) {
			wx.showToast({
				title:"反饋已提交"
			})

			setTimeout(function () {
				wx.navigateBack()
			}, 1000)
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this
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