// pages/shop/confirmOrder/confirmOrder.js
var t, api = require("../../../utils/api"), app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address:{},
		goods:{},
		goods_num:1,
	},

	checkAddress:function(){
		wx.navigateTo({
			url:"/pages/me/userAddress/userAddress"
		})
	},

	addGoodsNum:function(){
		if (t.data.goods_num < t.data.goods.inventory){
			t.setData({
				goods_num:t.data.goods_num+1
			})
		}else{
			wx.showToast({
				title:"库存不足",
				icon:"none"
			})
		}
	},

	delGoodsNum:function(){
		if (t.data.goods_num > 1){
			t.setData({
				goods_num:t.data.goods_num-1
			})
		}
	},

	enterOrder:function(){
		let opt = {};
		opt.goods_id = t.data.goods.id;
		opt.goods_num = t.data.goods_num;
		opt.address_id = t.data.address.id;
		opt.pay_type = 1;
		opt.remark = "";

		if (opt.goods_id == "" || opt.goods_id == undefined){
			wx.showToast({
				title:"请确认商品信息",
				icon:"error"
			})
			return
		}
		if (opt.goods_num == "" || opt.goods_num == undefined){
			wx.showToast({
				title:"请确认商品数量",
				icon:"error"
			})
			return
		}
		if (opt.address_id == "" || opt.address_id == undefined){
			wx.showToast({
				title:"请确认地址信息",
				icon:"error"
			})
			return
		}

		api.mallCreate(opt, function (res) {
			wx.showToast({
				title:"下单成功",
				icon:"success"
			})

			setTimeout(function() {
				wx.reLaunch({
					url:"/pages/shop/shopOrder/shopOrder"
				})
			}, 1000);
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id;
		t = this;
		let opt = {};
		opt.id = id
		api.goodsDetail(opt, function (res) {
			t.setData({
				goods:res.data
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
		let address = app.globalData.address
		if (address){
			t.setData({
				address
			})
		}else{
			api.getAddress(function (res) {
				if (res.data.list.length > 0){
					for (let address of res.data.list){
						if (address.is_default === 1){
							t.setData({
								address
							})
							break;
						}
					}
					if (!t.data.address.id){
						t.setData({
							address:res.data.list[0]
						})
					}
				}
			})
		}

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