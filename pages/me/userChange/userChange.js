// pages/me/userChange/userChange.js

var t;
const api  = require("../../../utils/api");
import { withdrawalList } from "../../../utils/api";

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		status:"0",
		page:1,
		list:[],
		allowAdd:true,
		info:{},
		modalName:null,
    money:"",
    radio: null
	},
	editMoney:function (e){
		console.log(e)
		let val = e.detail.value
		this.setData({
			money:val
		})
	},
	enterUserRecharge:function (){
		let opt = {}
		opt.money = this.data.money
		api.userRecharge(opt, function (res) {
			wx.requestPayment({
				timeStamp: res.data.option.timeStamp,
				nonceStr: res.data.option.nonceStr,
				package: res.data.option.package,
				signType: res.data.option.signType,
				paySign: res.data.option.paySign,
				success:function(){
					console.log('ok')
					t.hideModal()
					t.setData({
						order_status:"",
						page:1,
						orders:[],
					})
					t.getList()
					api.wallet(function(res) {
						t.setData({
							info:res.data
						})
					})
				},
				fail:function(){
					console.log('err')
				}
			})
		})
	},
	userRecharge:function(){
		this.setData({
			modalName : "userRecharge"
		})
	},

	hideModal(e) {
		this.setData({
			modalName : null
		})
	},
	checkTab: function (e) {
		let status = e.currentTarget.dataset.status
		t.setData({
			status,
			page:1,
			list:[],
			allowAdd:true
		})
		t.getList()
	},

	getChange:function(e){
		let money = e.currentTarget.dataset.money;
		wx.navigateTo({
			url: "/pages/me/getUserChange/getUserChange?money="+money
		})
  },
  pointsMoney:function(e) {
    wx.navigateTo({
			url: "/pages/me/pointsMoney/pointsMoney"
		})
  },

	getList:function(){
		let opt = {}
		opt.page = t.data.page
		opt.status = t.data.status
		api.withdrawalList(opt, function (res) {
			if(res.data.list.length > 0){
				t.setData({
					list:t.data.list.concat(res.data.list),
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
    
    api.pointsMoneyRadio(function(res){
      if(res.data.points_money_radio && res.data.points_money_radio != 0 ) {
        t.setData({
          radio: res.data.points_money_radio
        })
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
		t.setData({
			order_status:"",
			page:1,
			list:[],
		})
		t.getList()
		api.wallet(function(res) {
			t.setData({
				info:res.data
			})
		})
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