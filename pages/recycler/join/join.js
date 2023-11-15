// pages/recycler/join/join.js
var t, api = require("../../../utils/api"), app = getApp()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address:{},
		identity_behind:"",
		identity_front:"",
		name:"",
		phone:"",
		second: 60,
		alreadySend: false,
		send: true,
		alliance_index:-1,
		check_alliance_arr:[],
		alliance_arr:[],
		latitude:"",
		longitude:""
	},

	chooseMap:function (res) {
		wx.chooseLocation({
			success(res) {
				console.log(res)
				t.setData({
					address_desc:res.name,
					latitude:res.latitude,
					longitude: res.longitude,
				})
			}
		})
	},

	bindAllianceChange:function (e){
		let val = e.detail.value;
		t.setData({
			alliance_index:val
		})
	},
	getPhoneNumber:function (res){
		if(res.detail.errMsg.indexOf('ok') < 0){
			wx.showToast({
				icon: 'error',
				title: '您拒绝了授权'
			})
			return
		}
		let opt = {}
		opt.data = res.detail.encryptedData
		opt.iv = res.detail.iv
		let t =this
		wx.checkSession({
			success () {
				console.info('success')
				t.getPhoneNum(opt)
			},
			fail () {
				console.info('fail')

				wx.login({
					success:function (res) {
						opt.code = res.code
						api.getPhoneNumber(opt, function (res){
							console.log(res)
							t.setData({
								phone:res.data.phoneNumber
							})
						})
					}
				})

			}
		})

	},
	getPhoneNum(opt, re = false){
		let t =this

		if(re){
			wx.login({
				success:function (res) {
					opt.code = res.code
					t.getPhoneNum(opt)
				}
			})
		}else{
			api.getPhoneNumber(opt, function (res){
				console.info(res)
				if(res.data.relogin){
					t.getPhoneNum(opt, true)
				}else{
					t.setData({
						phone:res.data.phoneNumber
					})
				}
			})
		}

	},

	formSubmit:function (e){
		let opt = e.detail.value;
		opt.identity_behind = t.data.identity_behind
		opt.identity_front = t.data.identity_front
		opt.address_id = t.data.address.id
		opt.latitude = t.data.latitude
		opt.longitude = t.data.longitude
	  opt.identity_number = '';
		if (!opt.latitude || !opt.longitude){
			wx.showToast({
				icon:"none",
				title:"请选择具体地址"
			})
			return false
		}

		for (let alliance of t.data.alliance_arr) {
			if (alliance.alliance_name === t.data.check_alliance_arr[t.data.alliance_index]){
				opt.alliance_id = alliance.id
			}
		}

		api.collectorRegister(opt, function (res) {
			wx.showToast({
				title:"申请成功"
			})

			setTimeout(function () {
				wx.navigateBack()
			},1000)
		})
	},

	phoneInput:function(e){
		let value = e.detail.value
		t.setData({
			phone:value
		})
	},

	getCode:function (){
		let opt = {}
		opt.phone = t.data.phone
		if("" != opt.phone && "undefined" != opt.phone && /^1[3456789]\d{9}$/.test(opt.phone)){
			api.getCode(opt, function (res){
				let interval = res.data.interval
				t.setData({
					alreadySend: true,
					send: false
				})
				t.timer()
			})
		}else{
			wx.showToast({
				icon:"none",
				title:"请正确填写手机号码"
			})
		}
	},
	timer: function () {
		let promise = new Promise((resolve, reject) => {
			let setTimer = setInterval(
				() => {
					this.setData({
						second: this.data.second - 1
					})
					if (this.data.second <= 0) {
						this.setData({
							second: 60,
							alreadySend: false,
							send: true
						})
						resolve(setTimer)
					}
				}
				, 1000)
		})
		promise.then((setTimer) => {
			clearInterval(setTimer)
		})
	},


	checkAddress:function(){
		wx.navigateTo({
			url:"/pages/me/userAddress/userAddress"
		})
	},

	uploadIdentity:function(e){
		let _this = this;
		let type = e.currentTarget.dataset.type;
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
							switch (type) {
								case "identity_behind":
									_this.setData({
										identity_behind:a.data.url
									})
									break
								case "identity_front":
									_this.setData({
										identity_front:a.data.url
									})
									break
							}



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
		t = this
		api.allianceIndex(function (res) {
			t.setData({
				alliance_arr:res.data.list
			})
			let check_alliance_arr = []
			for (let alliance of t.data.alliance_arr) {
				check_alliance_arr.push(alliance.alliance_name)
			}

			t.setData({
				check_alliance_arr
			})
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
		let address = app.globalData.address
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