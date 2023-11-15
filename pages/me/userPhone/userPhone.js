// pages/me/userInfo/userInfo.js
var t, api=require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		second: 60,
		alreadySend: false,
		send: true,
		phone:""
	},

	editPhone:function(e){
		let val = e.detail.value;
		t.setData({
			phone:val
		})
	},
	getCode:function(){
		let opt = {}
		opt.phone = t.data.phone
		if("" != opt.phone && "undefined" != opt.phone && /^1[3456789]\d{9}$/.test(opt.phone)){
			api.getCode(opt, function (res){
				wx.showToast({
					icon:"none",
					title:"信息已发送"
				})
				let interval = res.data.interval
				t.setData({
					alreadySend: true,
					send: false
				})
				t.timer()
			})
		}else{
			wx.showToast({
				icon:"none",
				title:"请正确填写手机号码"
			})
		}
	},
	timer: function () {
		let promise = new Promise((resolve, reject) => {
			let setTimer = setInterval(
				() => {
					this.setData({
						second: this.data.second - 1
					})
					if (this.data.second <= 0) {
						this.setData({
							second: 60,
							alreadySend: false,
							send: true
						})
						resolve(setTimer)
					}
				}
				, 1000)
		})
		promise.then((setTimer) => {
			clearInterval(setTimer)
		})
	},
	checkPhone:function (phone){
		return /^1[3456789]\d{9}$/.test(phone);
	},
	formSubmit:function(e){
		let userInfo  = e.detail.value;
		if (userInfo.phone != t.data.userInfo.phone){
			if(userInfo.code < 6){
				wx.showToast({
					icon:"none",
					title:"修改手机需验证手机号码"
				})
				return false
			}
			let opt = {}
			opt.code = userInfo.code;
			api.userPhone(opt, function (res) {
				t.changeUser(userInfo)
			})
		}else{
			t.changeUser(userInfo)
		}
	},
	changeUser:function(userInfo){
		api.changeUser(userInfo ,function (res) {
			console.log(res)
			if (res.code === 0){
				wx.showToast({
					icon:"none",
					title:"修改成功"
				})
				setTimeout(function () {
					wx.navigateBack()
				}, 800)
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		api.getUserInfo(function (res) {
			t.setData({
				userInfo:res.data,
				avatar:res.data.avatar,
				gender:res.data.gender,
				phone:res.data.phone
			})
		})
		t.setData({
			uid:wx.getStorageSync("user_id")
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