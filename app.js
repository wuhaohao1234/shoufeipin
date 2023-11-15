//app.js
let api = require("./utils/api")
import Store from "./utils/store.js";
let store = new Store({
	debug: false,
	state: {
		menu: [],
		menu_bak: [{//备份
			pagePath: "/pages/index/index",
			iconPath: "/images/tab/index.png",
			selectedIconPath: "/images/tab/index-index.png",
			text: "首页"
		}, {
			pagePath: "/pages/news/news",
			iconPath: "/images/tab/shop.png",
			selectedIconPath: "/images/tab/shop-index.png",
			text: "环保新闻"
		}, {
			pagePath: "/pages/recovery/recovery",
			iconPath: "/images/tab/recovery.png",
			selectedIconPath: "/images/tab/recovery.png",
			text: "一键回收",
			bulge: 'bulge'
		}, {
			pagePath: "/pages/launchPoint/launchPoint",
			iconPath: "/images/tab/launchPoint.png",
			selectedIconPath: "/images/tab/launchPoint-index.png",
			text: "服务点"
		},
			{
				pagePath: "/pages/me/me",
				iconPath: "/images/tab/me.jpg",
				selectedIconPath: "/images/tab/me-index.png",
				text: "我的"
			}], // 导航栏
	},
});
App({
	store: store,
	onLaunch: function () {
		wx.enableAlertBeforeUnload({
			message: "是否返回",
			success: ()=>{
				wx.navigateBack({
				  delta: 1
				});
			}
		})
		// 展示本地存储能力
		let openid = wx.getStorageSync('openid');
		if(!openid){
			wx.login({
				success: res => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					let code = res.code;
					api.getOpenId(code, function (res) {
						wx.setStorageSync('openid', res.data.openid);
					})
				}
			})
		}
		// // 登录
		// let token = wx.getStorageSync('token');
		// console.log(token)
		// if(!token){
		// 	// 获取用户信息
		// 	wx.getSetting({
		// 		success: res => {
		// 			if (res.authSetting['scope.userInfo']) {
		// 				// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		// 				wx.getUserInfo({
		// 					success: res => {
		// 						// 可以将 res 发送给后台解码出 unionId
		// 						this.globalData.userInfo = res.userInfo
		//
		// 						// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
		// 						// 所以此处加入 callback 以防止这种情况
		// 						if (this.userInfoReadyCallback) {
		// 							this.userInfoReadyCallback(res)
		// 						}
		// 					}
		// 				})
		// 			}else{
		// 				wx.navigateTo({
		// 					url: '/pages/login/login'
		// 				})
		// 			}
		// 		}
		// 	})
		// }

		api.getDistrict(function (res) {
			console.log(res)
			wx.setStorageSync("allData", res.data.list)
		})

	},
	userInfoReadyCallback(res){
		api.userLogin(res.userInfo, function (res) {
			wx.setStorageSync('token', res.data.token);
			wx.setStorageSync('user_id', res.data.user_id);
		})
	},

	globalData: {
		userInfo: null,
		switchId: '', // 分类ID进入一件回收页面
		nav:[]
	}
})