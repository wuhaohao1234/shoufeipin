// pages/index/garbageIdentification/garbageIdentification.js
const app = getApp(), api=require("../../../utils/api")
var  t;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		the_text:"",
		modalName:""
	},

	searchText:function (e){
		let opt = {}
		opt.keyword = t.data.the_text;
		api.getCateByText(opt,function (res) {
			console.log(res)
			t.checkResource(res.data.result)
		})
	},

	checkResource:function (res){
		console.log(res)
		t.setData({
			content:res,
			modalName:"showResource"
		})
	},

	textInput:function (e){
		let value = e.detail.value;
		t.setData({
			the_text:value
		})
		console.log(t.data.the_text)
	},

	showModal: function(e) {
		this.setData({
			modalName: e.currentTarget.dataset.target
		});
	},
	hideModal: function(e) {
		this.setData({
			modalName: null
		});
	},

	photo:function (){

		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			success: function (c) {
				var a = c.tempFilePaths, s = c.tempFilePaths.length, d = 1;
				for (var n in a) {
					wx.uploadFile({
						url: api.serverPath+"/common/upload",
						filePath: a[n],
						name: "file",
						formData:{
							'token':wx.getStorageSync("token"),
							'file':a[n]
						},
						success: function (r) {
							var a = JSON.parse(r.data)
							let opt = {};
							opt.img_url = a.data.url;
							api.getCateByPhone(opt, function (res){
								t.checkResource(res.data.result)
							})
						}
					});
				}
			}
		});
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