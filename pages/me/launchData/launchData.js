// pages/me/launchData/launchData.js
var wxCharts = require('../../../utils/wxcharts');
var t;
const api = require("../../../utils/api");

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		info: "",
		userInfo: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		api.launchData(function (res) {
			t.setData({
				info: res.data
			})
			let month_data = res.data.month_data;
			let month_arr = []
			let data_arr = []
			for (let monthDatum of month_data) {
				console.log(monthDatum.date)
				console.log(monthDatum.value)

				month_arr.unshift(monthDatum.date)
				data_arr.unshift(monthDatum.value)
			}
			console.log(month_arr)
			console.log(data_arr)
			new wxCharts({
				canvasId: 'columnCanvas',
				type: 'column',
				categories: month_arr,
				series: [{
					name: '回收重量',
					data: data_arr
				}],
				yAxis: {
					format: function (val) {
						return val;
					},
					min: 0,
				},
				width: 360,
				height: 240,
				legend: false, // 是否显示图表下方各类别的标识
				dataLabel: true, // 是否在图表中显示数据内容值
			});
		})
		api.getUserInfo(function (res) {
			t.setData({
				userInfo: res.data,
				uid: wx.getStorageSync("user_id")
			})

			wx.setStorageSync("userInfo", res.data)
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