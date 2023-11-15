// pages/shop/shopOrder/orders.js
var t, api=require("../../../utils/api");
const qrcode = require('../../../libs/qrcode/index');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order_status:1,
		orders:[],
		img:"",
		modalName:null,
	},
	drawQrcode(params) {
		let img = qrcode.outputQRCodeBase64(params.toString(), {
			size: t.data.size,
			color: '#000000',
			padding: 16,
			background: '#ffffff'
		});
		t.setData({
			img
		})
	},
	showModal: function(e) {
		this.setData({
			modalName: "showQrCode"
		});
	},
	hideModal: function(e) {
		this.setData({
			modalName: null
		});
	},

	showQrCode:function (e) {
		let id = e.currentTarget.dataset.id
		if (id){
			t.drawQrcode(id)
			t.showModal()
		}
	},

	checkTab: function (e) {
  	    let order_status = e.currentTarget.dataset.status
		t.setData({
			order_status,
			orders:[],
		})
		t.getShopOrder()
	},

	orderDetail:function(e){
		let id = e.currentTarget.dataset.id
		let status = e.currentTarget.dataset.status
		wx.navigateTo({
			url:"/pages/shop/orderDetail/orderDetail?id="+id+"&status="+status
		})
	},
	getShopOrder:function(){
		let opt = {}
		opt.order_status = t.data.order_status
		api.shopOrder(opt, function (res) {
			t.setData({
				orders:res.data.list
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
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
			order_status:1,
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
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})