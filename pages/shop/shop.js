// pages/shop/shop.js
var t, api=require("../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cate_id: 0,
		category:[],
		goods:[],
		page:1,
		allowAdd:true,
		searchGoodsText:"",
		banners: [],
		indicatorDots: !0,
		autoplay: 1,
		interval: 5e3,
		duration: 1e3,
		navList: [{
			name: '每日签到',
			url: '/pages/team/signIn/signIn',
			icon: 'https://cdn.wuhuit.com/fths/check/check1.png'
		}, {
			name: '我的积分',
			url: '/pages/shop/pointsDetails/pointsDetails',
			icon: 'https://cdn.wuhuit.com/fths/check/check2.png'
		},
			{
			name: '地址管理',
			url: '/pages/me/userAddress/userAddress',
			icon: 'https://cdn.wuhuit.com/fths/check/check3.png'
		},
			{
			name: '兑换记录',
			url: '/pages/shop/shopOrder/shopOrder',
			icon: 'https://cdn.wuhuit.com/fths/check/check4.png'
		}],
	},

	goto(e) {
		var jumpUrl = e.currentTarget.dataset.url
		console.log(jumpUrl)
		wx.navigateTo({
			url: jumpUrl,
			fail:function () {
				wx.switchTab({
					url:jumpUrl
				})
			}
		})
	},

	toNav(e) {
		let link = e.currentTarget.dataset.link;

		wx.navigateTo({
			url: link,
			fail:function () {
				wx.switchTab({
					url:link
				})
			}
		})



	},

	searchGoods:function(e){
		if (t.data.searchGoodsText.length > 0){
			t.setData({
				cate_id: "",
				page:1,
				allowAdd:true,
				goods:[],
			})
		}


	},

	searchGoodsInput:function(e){
		let value = e.detail.value
		t.setData({
			searchGoodsText:value
		})
	},
	checkTab: function (e) {
		let id = e.currentTarget.dataset.id;
		t.setData({
			cate_id: id,
			page:1,
			allowAdd:true,
			goods:[],
		})
		t.getGoodsByCateAndPage()
	},

	toGoodsInfo: function (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "/pages/shop/goodsInfo/goodsInfo?id="+id
		})
	},

	toPointsDetails:function(){
		wx.navigateTo({
			url: "/pages/shop/pointsDetails/pointsDetails"
		})
	},

	getGoodsByCateAndPage:function(){
		let opt = {}
		opt.id = t.data.cate_id;
		opt.page = t.data.page
		api.getGoodsByCateAndPage(opt, function (res) {
			if(res.data.list.length > 0){
				t.setData({
					goods:t.data.goods.concat(res.data.list)
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
		// api.mallCate(function (res) {
		// 	let category = res.data.list
		// 	let cate_id = category[0].id;
		//
		//
		//
		// 	t.setData({
		// 		category,
		// 		cate_id,
		// 		userInfo:wx.getStorageSync("userInfo")
		// 	})
		// 	t.getGoodsByCateAndPage()
		//
		// })
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
		api.mallCate(function (res) {
			console.log(res)
			let category = res.data.list
			let cate_id = category[0].id;
			api.getUserInfo(function (res) {
				t.setData({
					userInfo: res.data
				})
				wx.setStorageSync("userInfo", res.data)
			})
			t.setData({
				uid: wx.getStorageSync("user_id")
			})
			t.setData({
				category,
				cate_id,
				goods: [],
				page: 1,
				allowAdd: true,
				searchGoodsText: ""
			})
			t.getGoodsByCateAndPage()

		})
		
		api.mallCommon(function (res) {
			t.setData({
				banners:res.data.banner
			})
		})
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
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
		if(t.data.allowAdd){
			t.setData({
				page:t.data.page+1
			})
			t.getGoodsByCateAndPage()
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})