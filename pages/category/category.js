// pages/category/category.js
var t, app = getApp();
var api = require("../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cate_id: 1,
		category:[],
		check_cate:{}
	},
	checkTab: function (e) {
		let id = e.currentTarget.dataset.id;
		for (let item of this.data.category){
			if (item.id === id){
				t.setData({
					check_cate: item,
				})
				break;
			}
		}
		t.setData({
			cate_id: id,
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
		api.category(function (res) {
			let category = res.data.list
			let cate_id = category[0].id;
			let check_cate = category[0]
			if(app.globalData.cate_id){
				cate_id=app.globalData.cate_id
				for (let cate of category) {
					if(cate.id == cate_id){
						check_cate = cate
					}
				}
			}
			t.setData({
				category,
				cate_id,
				check_cate,
				city:wx.getStorageSync("city")
			})
		})
		// 这里兼容自定义tab
		if (typeof this.getTabBar === 'function' && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 1
			})
		}
	}
})