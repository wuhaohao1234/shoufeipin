// pages/shop/goodsInfo/goodsInfo.js
var t, api = require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
		indicatorDots: true,
		vertical: false,
		autoplay: true,
		interval: 2000,
		duration: 500,
		goods:{},
		modalName:null,
		number:1,
		buyer_remark:""
	},

	toConfirmOrder: function (e) {
		t.showModal()
	},

	editNumber:function (e) {
		let val = e.detail.value;
		t.setData({
			number:val
		})
	},

	editRemark:function (e) {
		let val = e.detail.value;
		t.setData({
			buyer_remark:val
		})
	},

	showModal: function(e) {
		this.setData({
			modalName: "getGoods"
		});
	},
	hideModal: function(e) {
		this.setData({
			modalName: null
		});
	},
	enterGetGoods:function () {
		let opt = {}
		opt.goods_id = t.data.id
		opt.number = t.data.number
		opt.buyer_remark = t.data.buyer_remark
		api.shopBuy(opt, function (res) {
			wx.showModal({
				showCancel:false,
				content:"购买成功",
				success:function (res) {
					wx.navigateTo({
						url:"/pages/store/orders/orders"
					})
				}
			})
		})
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		let id = options.id;
		let opt = {};
		opt.goods_id = id
		api.shopGoodsDetail(opt, function (res) {
			t.setData({
				goods:res.data,
				id:options.id
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