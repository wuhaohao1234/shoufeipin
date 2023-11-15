// pages/shop/orderDetail/orderDetail.js
var t, api=require("../../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order:{},
		status:""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		let id = options.id;
		let status = options.status;
		console.log(options)
		t.setData({
			status
		})
		t.getOrderById(id);
	},

	toShop:function(e){
		console.log(111)
		wx.navigateTo({
			url: '/pages/shop/shop',
			success: (result)=>{
				
			},
			fail: ()=>{},
			complete: ()=>{}
		});
	},

	confirmReceipt:function(e){
		let id = e.currentTarget.dataset.id
		let opt = {};
		opt.id = id;
		api.confirmReceipt(opt, function (res) {
			wx.showToast({
				title:"确认成功",
				icon:"none"
			})

			setTimeout(function () {
				wx.navigateBack();
			}, 800)
		})
	},

	getOrderById:function(id){
		console.log(id)
		let opt = {};
		opt.id = id;
		api.getOrderById(opt,function (res) {
			console.log(res)
			let order = res.data;
			order.order_status = t.data.status
			t.setData({
				order
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