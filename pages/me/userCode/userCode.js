// pages/me/userCode/userCode.js
var t, api=require("../../../utils/api"), app = getApp();
const qrcode = require('../../../libs/qrcode/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},
	//绘制二维码
	drawQrcode(params) {
		let img = qrcode.outputQRCodeBase64(params, {
			size: t.data.size,
			color: '#000000',
			padding: 16,
			background: '#ffffff'
		});
		t.setData({
			img
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		api.getUserInfo(function (res) {
			let userInfo = res.data
			if (!userInfo.phone || !userInfo.real_name){
				wx.showModal({
					showCancel:false,
					content:"请先完善个人信息",
					success(res) {
						wx.navigateTo({
							url:"/pages/me/userInfo/userInfo"
						})
					}
				})
			}else{
				wx.setStorageSync("userInfo", res.data)
				t.setData({
					userInfo
				})
				t.drawQrcode(wx.getStorageSync("user_id"))
			}
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