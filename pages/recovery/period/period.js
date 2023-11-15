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
		wx.navigateTo({
			url:"/pages/recovery/recovery"
		})
	},

	phone:function(e){
		let phoneNumber = e.currentTarget.dataset.number
		wx.makePhoneCall({
			phoneNumber:phoneNumber
		})
	},

	toDetail:function(e){
		let pid = e.currentTarget.dataset.pid
		if(pid){
			wx.navigateTo({
				url:"/pages/recovery/period/detail/detail?pid="+pid
			})
		}
		
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
		api.getRecyclePeriod(opt, function (res) {
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