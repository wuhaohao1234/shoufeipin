// pages/recycler/recycler.js
var t, api = require("../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		tab: "订单池",
		info: {},
		status: "1",
		orders: [],
		allowAdd: true,
		userInfo:{},
		refuse_reason:"",
		refuse_id:""
	},
	checkStatus(e){
		let opt = {}
		opt.work_status = e.currentTarget.dataset.status
		api.checkWorkStatus(opt, function (res) {
			switch (opt.work_status) {
				case "0":
					wx.showToast({
						title:"开始工作",
						icon:"none"
					})
					break
				case "1":
					wx.showToast({
						title:"请假成功",
						icon:"none"
					})
					break
			}
			api.getUserInfo(function (res) {
				t.setData({
					userInfo:res.data
				})
				wx.setStorageSync("userInfo", res.data)
			})
		})
	},
	toUser:function(e){
		let address = e.currentTarget.dataset.address
		api.getCoordinate(address, function(res){
			let location = res.result.location
			wx.openLocation({
				latitude: location.lat,
				longitude: location.lng,
				scale: 18,
				name: address,
				address: address,
				success: (result)=>{
					
				},
				fail: ()=>{},
				complete: ()=>{}
			});
		})
	},
	callUser:function(e){
		console.log(e)
		let phoneNumber = e.currentTarget.dataset.phonenumber
		wx.makePhoneCall({
			phoneNumber: phoneNumber,
			success: (result)=>{
				
			},
			fail: ()=>{},
			complete: ()=>{}
		});
	},
	orderDetail:function (e){
		let id = e.currentTarget.dataset.id
		if(id){
			wx.navigateTo({
				url: "/pages/recycler/orderDetail/detail?id="+id
			})
		}
		
	},

	editRefuse_reason:function(e){
		let val = e.detail.value
		t.setData({
			refuse_reason:val
		})
	},
	enterCollectorRefuse:function(){
		let opt = {}
		opt.id = t.data.refuse_id
		if (opt.id){
			opt.refuse_reason = t.data.refuse_reason
			api.collectorRefuse(opt,function (res) {
				t.setData({
					modalName: null
				})
				t.getOrder()
			})
		}

	},

	collectCreate:function (e){
		let id = e.currentTarget.dataset.id
		if(id){
			wx.navigateTo({
				url: "/pages/recycler/collector/create?oid="+id
			})
		}
	},

	collectorConfirm:function (e){
		let id = e.currentTarget.dataset.id
		let opt = {}
		opt.id = id
		api.collectorConfirm(opt,function (res) {
			t.getOrder()
		})
	},

	collectorRefuse:function(e){
		let refuse_id = e.currentTarget.dataset.id
		t.setData({
			modalName:"collectorRefuse",
			refuse_id:refuse_id
		})
	},

	toRanking: function () {
		wx.navigateTo({
			url: "/pages/recycler/ranking/ranking"
		})
	},

	toRecoveryStatistics: function () {
		wx.navigateTo({
			url: "/pages/recycler/recoveryStatistics/recoveryStatistics"
		})
	},

	scanUserCode:function (){
		wx.scanCode({
			success:function (res) {
				console.log(res)
				let recycle_user_id = res.result
				if (recycle_user_id && recycle_user_id.trim().length < 10){
					wx.navigateTo({
						url: "/pages/recycler/collector/mdm/create?recycle_user_id="+recycle_user_id
					})
				}else{
					let path = res.path.trim()
					if (path){
						let code = path.substring(path.length-13, path.length)
						console.log(code)
						wx.navigateTo({
							url: "/pages/recycler/collector/mdm/create?code="+code
						})
					}
				}

			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		t.setData({
			userInfo:wx.getStorageSync("userInfo")
		})
	},

	checkTab: function (e) {
		let status = e.currentTarget.dataset.status
		t.setData({
			status,
			orders: [],
			allowAdd: true
		})
		t.getOrder()
	},
	getOrder: function () {
		let opt = {}
		opt.status = t.data.status
		api.collectorOrder(opt, function (res) {
			t.setData({
				orders: res.data.list,
			})
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
		api.collectorIndex(function (res) {
			t.setData({
				info: res.data
			})
		})
		t.getOrder()
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