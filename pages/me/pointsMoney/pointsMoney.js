// pages/me/getUserChange/getUserChange.js
var t;
const api = require("../../../utils/api");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: null,
		get_points: '',
		cateMoney: 0 ,
		radio: 0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		api.getUserInfo(function (res) {
			t.setData({
				userInfo:res.data,
			})
			wx.setStorageSync("userInfo", res.data)
		})
		
		api.pointsMoneyRadio(function(res){
			t.setData({
				radio: res.data.points_money_radio
			})
		})
	},

	getAll:function(){
		t.setData({
      get_points:t.data.userInfo.points,
      cateMoney: (t.data.userInfo.points * t.data.radio).toFixed(2),
		})
	},

	changeGetPoints: function(e){
		t = this;
		var lastMoneyRadio = t.data.radio;
		var myPoints = e.detail.value;
		if(myPoints){
			t.setData({
				get_points: myPoints,
				cateMoney: (myPoints * lastMoneyRadio).toFixed(2),
			})
		}else{
			t.setData({
				get_points: '',
				cateMoney: 0,
			})
		}
	},

	/**
	 * 提交
	 */
	entersubmit: function(){
			t = this;
			if(t.data.get_points == ''){
				wx.showToast({
					icon:"none",
					title:"请输入兑换积分"
				})
				return false;
			}
			api.commonConvert({points:t.data.get_points},function(res){
				if(res.code == 0){
					wx.showToast({
						icon:"none",
						title:"兑换成功"
					})
					t.onLoad();
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