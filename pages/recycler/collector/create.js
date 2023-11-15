// pages/recycler/collector/create.js
var t, api = require("../../../utils/api"),app=getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		oid:"",
		products:[],
		address: "",
		latitude: "",
		longitude: "",
		collector_picture:"",
		collector_describe:"",
		imgList:[],
		loading: !0,
		total_money:0,

	},
	setTotal:function (){
		let total = 0
		for (let product of t.data.products) {
			total +=product.weight*product.money
		}
		total = total.toFixed(2)
		t.setData({
			total_money:total
		})
	},
	theEnterOrder:function(){
		wx.showModal({
			title:"提示",
			content:"请确认完成该订单",
			success: function (res) {
				if (res.cancel) {
					//点击取消,默认隐藏弹框
				} else {
					t.enterOrder()
				}
			}
		})
	},

	enterOrder:function (){
		let opt = {}
		opt.oid = t.data.oid
		opt.product = []
		for (let product of t.data.products) {
			let item = {};
			item['id'] = product.id
			item['weight'] = product.weight
			item['money'] = product.weight*product.money
			opt.product.push(item)
		}
		console.log(opt.product)
		opt.product = JSON.stringify(opt.product)
		opt.collector_describe = t.data.collector_describe
		opt.collector_picture = []
		for (let img of t.data.imgList) {
			opt.collector_picture.push(img.url)
		}
		opt.collector_picture = JSON.stringify(opt.collector_picture)
		api.collectorCreate(opt, function (res) {
			wx.showToast({
				title:"订单已完成"
			})

			setTimeout(function () {
				wx.navigateBack()
			},1000)
		})
	},

	deleteImg: function(e) {
		var t = e.currentTarget.dataset.id, a = this.data.imgList;
		a.splice(t, 1), this.setData({
			imgList: a
		});
	},
	uplaod: function() {
		wx.chooseImage({
			count: 3,
			sizeType: [ "original", "compressed" ],
			success: function(tmp) {
				var a = tmp.tempFilePaths, s = tmp.tempFilePaths.length, d = 1;
				t.setData({
					loading: !1
				});
				for (var n in a) wx.uploadFile({
					url: api.serverPath+"/common/upload",
					filePath: a[n],
					name: "file",
					formData:{
						'token':wx.getStorageSync("token"),
						'file':a[n]
					},
					success: function(res) {
						var a = JSON.parse(res.data),
							i = t.data.imgList;
						if (i.length <=3){
							i.push(a.data),
								t.setData({
									imgList: i
								}), d == s && t.setData({
								loading: !0
							}), d += 1;
						}

					}
				});
			}
		});
	},
	editDescribe:function (e){
		t.setData({
			collector_describe:e.detail.value
		})
	},

	toMap:function(){
		wx.chooseLocation({
			success:function (res) {
				console.log(res)
				t.setData({
					address:res.address,
					latitude:res.latitude,
					longitude:res.longitude,
				})
			}
		})
	},

	addProduct:function (){
		wx.navigateTo({
			url:"/pages/recovery/recoveryPrice/recoveryPrice"
		})
	},

	editWeight:function (e){
		console.log(e)
		let newProducts = []
		let value = e.detail.value
		let id = e.currentTarget.dataset.id
		for (let product of t.data.products) {
			if (product.id === id){
				product.weight = value
			}
			newProducts.push(product)
		}
		app.globalData.products = newProducts
		t.setData({
			products:newProducts
		})
		t.setTotal()
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		t.setData({
			oid:options.oid
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
		let check_product = app.globalData.products || []
		let newProducts = []
		for (let product of check_product) {
			console.log(product)
			if (!product.weight){
				product.weight = 1
			}
			newProducts.push(product)
		}
		app.globalData.products = newProducts
		t.setData({
			products:newProducts
		})

		t.setTotal()
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