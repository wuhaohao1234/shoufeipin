// pages/me/userInfo/userInfo.js
var t, api=require("../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address:{},
		userInfo:{},
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
	checkAddress:function(){
		wx.navigateTo({
			url:"/pages/me/userAddress/userAddress"
		})
	},

	formSubmit:function(e){
		let userInfo  = e.detail.value;
		let address = getApp().globalData.address
		//验证地址
		if(!address){
			wx.showToast({
				icon:"none",
				title:"请添加收货地址"
			})
			return 
		}
		if(!userInfo.place) {
			wx.showToast({
				icon:"none",
				title:"请输入所属区域"
			})
			return
		}
		if(!userInfo.phone) {
			wx.showToast({
				icon:"none",
				title:"请填写电话号码"
			})
			return
		}
		if(!userInfo.real_name) {
			wx.showToast({
				icon:"none",
				title:"请填写真实姓名"
			})
			return
		}
		// userInfo.avatar = t.data.avatar
		// userInfo.gender = t.data.gender
		userInfo.is_register = 1;
		t.changeUser(userInfo)
	},
	changeUser:function(userInfo){
		api.changeUser(userInfo ,function (res) {
			console.log(res)
			if (res.code === 0){
				wx.showToast({
					icon:"none",
					title:"注册成功"
				})
				setTimeout(function () {
					wx.switchTab({
						url: "/pages/me/me",
						success: function (e) {
							var page = getCurrentPages().pop();
							if (page == undefined || page == null) return;
							page.onShow();
						}
        	})
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
	onShow: function (app) {
		t = this;
		let address = getApp().globalData.address
		if (address){
			t.setData({
				address
			})
		}else{
			api.getAddress(function (res) {
				if (res.data.list.length > 0){
					for (let address of res.data.list){
						if (address.is_default === 1){
							t.setData({
								address
							})
							break;
						}
					}
					if (!t.data.address.id){
						t.setData({
							address:res.data.list[0]
						})
					}
				}
			})
		}

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