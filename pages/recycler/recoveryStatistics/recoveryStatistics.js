// pages/recycler/recoveryStatistics/recoveryStatistics.js
// pages/recycler/recycler.js
var t, api=require("../../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		type:"1",
		info:{}
	},
	checkTab:function(e){
		let type = e.currentTarget.dataset.type;
		t.setData({
			type
		})
		t.getData()
	},

	getData:function (){
		let opt = {}
		opt.type = t.data.type
		api.collectorStat(opt,function (res) {
			t.setData({
				info:res.data
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t=this;
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