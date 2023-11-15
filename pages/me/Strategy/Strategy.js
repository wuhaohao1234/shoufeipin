// pages/me/Strategy/Strategy.js
const api = require("../../../utils/api");
var t;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		showJoin:false,
		from_uid:"",
		content:"",
	},

	escape2Html: function (str) {
		var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
		return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }).replace(/&nbsp;/g, "\xa0");
	},
	acceptInvitation:function(a){
		let opt = a.detail.userInfo
		opt.recommend_id = t.data.from_uid
		api.userLogin(opt ,function(res) {
		    wx.setStorageSync('token', res.data.token);
		    wx.setStorageSync('user_id', res.data.user_id);
		    wx.showToast({
				title:"接受邀請成功"
			})
			setTimeout(function(){
				wx.switchTab({
					url:"/pages/index/index"
				})
			}, 1000)
		});
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		t = this;
		let from_uid = options.uid ? options.uid : options.scene;
		// from_uid = "000550"
		if (from_uid) {
			t.setData({
				showJoin:true,
				from_uid
			})
		}
		api.clause(function(res){
			let content = res.data.recycle_recommend_collector
			t.setData({
				content:t.escape2Html(content)
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
