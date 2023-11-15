// pages/me/userInfo/userInfo.js
var t, api=require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		bindAlipay:{},
		avatar:"",
		gender:"",
		second: 60,
		alreadySend: false,
		send: true,
		phone:""
	},
	goToPhone() {
		wx.navigateTo({
			url: '/pages/me/userPhone/userPhone',
		})

	},
	//获取手机号
	getPhoneNumber:function (res){
		  let that = this
	    console.log(res)
	    let opt = {}
	    opt.data = res.detail.encryptedData
	    opt.iv = res.detail.iv
	
	    wx.login({
	        success:function (res) {
	            opt.code = res.code
	            api.getPhoneNumber(opt, function (res){
	                console.log(res)
	               that.setData({
	                    phone:res.data.phoneNumber
	                })
	            })
	        }
	    })
	},

	formSubmit:function(e){
		let userInfo  = e.detail.value;
		userInfo.avatar = t.data.avatar
		userInfo.gender = t.data.gender
		t.changeUser(userInfo)
	},
	changeUser:function(userInfo){
		api.changeUser(userInfo ,function (res) {
			console.log(res)
			if (res.code === 0){
				wx.showToast({
					icon:"none",
					title:"修改成功"
				})
				setTimeout(function () {
					wx.navigateBack()
				}, 800)
			}
		})
	},

	checkGender:function(e){
		let type = e.currentTarget.dataset.type;
		t.setData({
			gender:type
		})
	},

	uploadAvatar:function(){
		let that = this
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			success: function (t) {
				var a = t.tempFilePaths, s = t.tempFilePaths.length, d = 1;
				for (var n in a) {
					console.log(a[n])
					wx.uploadFile({
						url: api.serverPath+"/common/upload",
						filePath: a[n],
						name: "file",
						formData:{
							'token':wx.getStorageSync("token"),
							'file':a[n]
						},
						success: function (t) {
							var a = JSON.parse(t.data)
							that.setData({
								avatar:a.data.url
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
		t = this;
		api.getUserInfo(function (res) {
			t.setData({
				userInfo:res.data,
				avatar:res.data.avatar,
				gender:res.data.gender,
				phone:res.data.phone
			})
		})
		t.setData({
			uid:wx.getStorageSync("user_id")
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