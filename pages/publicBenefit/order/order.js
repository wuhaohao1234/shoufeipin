// pages/recovery/order/order.js
var t;
var api = require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		status:"0",
		page:1,
		orders:[],
		allowAdd:true
	},
	toRecovery:function (){
		wx.switchTab({
			url:"/pages/publicBenefit/recovery"
		})
	},
	toComment:function(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:"/pages/publicBenefit/order/evaluate/evaluate?id="+id
		})
	},
	toShowComment:function(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:"/pages/publicBenefit/order/evaluate/evaluate?type=show&id="+id
		})
	},

	phone:function(e){
		let phoneNumber = e.currentTarget.dataset.number
		wx.makePhoneCall({
			phoneNumber:phoneNumber
		})
	},
	clearOrder:function(e){
		let id = e.currentTarget.dataset.id
		let opt = {}
		opt.id = id
		api.clearOrder(opt, function (res) {
			t.setData({
				order_status:"",
				page:1,
				orders:[],
			})
			t.getShopOrder()
		})
	},

	toDetail:function(e){
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url:"/pages/publicBenefit/order/detail/detail?id="+id
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
	},

	checkTab: function (e) {
		let status = e.currentTarget.dataset.status
		t.setData({
			status,
			page:1,
			orders:[],
			allowAdd:true
		})
		t.getShopOrder()
	},
	getShopOrder:function(){
		let opt = {}
		opt.page = t.data.page
		opt.status = t.data.status
		api.selfOrder(opt, function (res) {
			console.log(res.data.list)
			if(res.data.list.length > 0){
				t.setData({
					orders:t.data.orders.concat(res.data.list),
					allowAdd:true
				})
			}else{
				t.setData({
					allowAdd:false
				})
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
		t.setData({
			order_status:"",
			page:1,
			orders:[],
		})
		t.getShopOrder()
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
		if(t.data.allowAdd){
			t.setData({
				page:t.data.page+1
			})
			t.getShopOrder()
		}else{
			wx.showToast({
				title:"已无更多数据",
				icon:"none"
			})
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})