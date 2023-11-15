// pages/shop/shopOrder/shopOrder.js
var t, api=require("../../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		order_status:"",
		page:1,
		orders:[],
		allowAdd:true
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

	checkTab: function (e) {
  	    let order_status = e.currentTarget.dataset.status
		t.setData({
			order_status,
			page:1,
			orders:[],
			allowAdd:true
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
		opt.page = t.data.page
		opt.order_status = t.data.order_status
		api.getShopOrder(opt, function (res) {
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