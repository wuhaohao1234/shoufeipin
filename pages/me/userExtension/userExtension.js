// pages/me/userExtension/userExtension.js
var t;
const api = require("../../../utils/api");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: "",
		img: "",
		bg: "https://cdn.wuhuit.com/fths/images/test/bg.jpg",
		poseter: 'https://cdn.wuhuit.com/80/03d4360b33e84ae42496a919e9e4ef.png',
		isPlacard: false,
		avatar: null,
		savePoster: '',
	},
	drawImage() {
		var that = this;
		wx.showLoading({
			title: '生成海报中...',
		})
		var userInfo = wx.getStorageSync('userInfo')
		wx.downloadFile({
			url: userInfo.avatar,
			success: (res) => {
				t.setData({
					avatar: res.tempFilePath
				})
			},
			fail: function (res) {},
		});
		wx.downloadFile({
			url: t.data.poseter,
			success: (res) => {
				console.log("下载poster：", res);
				that.drawQr(res.tempFilePath)
			},
			fail: function (res) {
				console.log("下载poster 错误：", res);
			},
		});
	},
	drawCircular(context, width, height, x, y, url) {
		var avatarurl_width = width;
		var avatarurl_heigth = height;
		var avatarurl_x = x;
		var avatarurl_y = y;
		context.save();
		context.beginPath();
		context.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
		context.clip();
		context.drawImage(url, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth);

		// 
		
		context.restore();
	},
	// 在canvas上画二维码图片的位置
	drawQr(poseter) {
		var that = this;
		// this.ctx = wx.createCanvasContext('myCanvas',this)
		wx.downloadFile({
			url: t.data.img, //仅为示例，并非真实的资源
			success: (res) => {
				let mobile = wx.getSystemInfoSync();
				let rpx = mobile.windowWidth / 375; //（375px为iphone6屏幕宽度）
				var context = wx.createCanvasContext('1')
				context.drawImage(poseter, 0, 0, 317 * rpx, 564 * rpx)
 
				// 二维码
				context.rect(194 * rpx, 430 * rpx, 100 * rpx, 100 * rpx)
				context.setFillStyle('#FFFFFF')
				context.fill()
				context.drawImage(res.tempFilePath, 194 * rpx, 430 * rpx, 100 * rpx, 100 * rpx)
				context.setFillStyle('#FFFFFF')
				context.setFontSize('16');
				context.textAlign = 'center'
				context.fillText("长按识别", 242 * rpx, 548 * rpx, 100 * rpx)

				// 头像
				var userInfo = wx.getStorageSync('userInfo')
				context.setFillStyle('#FFFFFF')
				context.setFontSize('15');
				context.textAlign = 'left'
				context.fillText(userInfo.nickname, 66 * rpx, 492 * rpx, 180 * rpx)
				context.fillText("保护环境人人有责", 66 * rpx, 512 * rpx, 180 * rpx)
				that.drawCircular(context, 40 * rpx, 40 * rpx,20 * rpx, 480 * rpx,t.data.avatar) 

				context.draw()

				setTimeout(function () {
					that.handleCanvarToImg()
					wx.hideLoading({
						success: (res) => {},
					})
				}, 1);

			}
		});


	},
	toStrategy: function () {
		wx.navigateTo({
			url: "/pages/me/Strategy/Strategy"
		})
	},

	toUserExtensionList: function () {
		wx.navigateTo({
			url: "/pages/me/userExtensionList/userExtensionList"
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		t = this;
		wx.showShareMenu({
			menus: ['shareAppMessage', 'shareTimeline'], // 需要显示的转发按钮名称列表.合法值包含 "shareAppMessage"、"shareTimeline"
			success(res) {
				console.log(res);
			},
			fail(e) {
				console.log(e);
			}
		});
		api.aboutUs(function (res) {
			t.setData({
				bg: res.data.recommend_pic,
				poseter: res.data.poster_pic
			})
		})
		api.getUserInfo(function (res) {
			console.log(res)
			t.setData({
				userInfo: res.data
			})
			wx.setStorageSync("userInfo", res.data)
		})
		let opt = {}
		opt.page = "pages/index/index"
		opt.scene = 'share-' + wx.getStorageSync("user_id")
		api.qrCode(opt, function (res) {
			console.log(res)
			t.setData({
				img: res.data.url
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

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
	// 分享朋友圈
	onShareTimeline() {
		return {
			title: "手机下单预约  废品上门回收", // 转发后 所显示的title
			path: "/pages/index/index?type=share&uid=" + wx.getStorageSync("user_id"),
			imageUrl: this.data.savePoster,

			success: (res) => { // 成功后要做的事情
				console.log(res);
				// console.log
			},
			fail: function (res) {
				// 分享失败
				console.log(res)
			}
		}
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
			title: "手机下单预约  废品上门回收", // 转发后 所显示的title
			path: "/pages/index/index?type=share&uid=" + wx.getStorageSync("user_id"),
			imageUrl: this.data.savePoster,

			success: (res) => { // 成功后要做的事情
				console.log(res);
				// console.log
			},
			fail: function (res) {
				// 分享失败
				console.log(res)
			}
		}
	},
	makerPlacard: function () {
		console.log('生成海报')
		t.setData({
			isPlacard: true
		})
		t.drawImage()
	},
	placardClose: function () {
		console.log('关闭海报')
		t.setData({
			isPlacard: false
		})
	},

	// 把canvas 文件保存成图片 
	handleCanvarToImg() {
		var that = this;
		wx.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: 1904,
			height: 3384,
			destWidth: 1904,
			destHeight: 3384,
			canvasId: '1',
			success(res) {
				wx.hideLoading()
				that.setData({
					savePoster: res.tempFilePath
				})
				console.log("canvas生成出来的海报：", res.tempFilePath)
			},
			fail(res) {
				console.log("生成图片失败：", res)

			}
		}, this);
	},
	saveFail(res) {
		if (res.errMsg == "canvasToTempFilePath: fail canvas is empty" || res.errMsg == "saveImageToPhotosAlbum:fail auth deny" || res.errMsg == "saveImageToPhotosAlbum:fail authorize no response") {
			wx.showModal({
				title: "提示",
				content: "请在设置中打开相册权限!",
				success: function (res) {
					if (res.confirm) {
						wx.openSetting({
							success(res) {

							}
						});
					} else if (res.cancel) {

					}
				}
			})
		}
	},
	// 保存图片到相册
	newSaveCanvasImage() {
		// let contentData = this.contentData || {}
		// this.postShareNum(contentData.id, 2)

		var that = this;
		wx.showLoading({
			title: "正在保存海报"
		})
		if (this.data.savePoster) {
			wx.hideLoading()
			wx.saveImageToPhotosAlbum({
				filePath: that.data.savePoster,
				success: function () {
					wx.showToast({
						title: '下载海报成功',
					});
				},
				fail(res) {
					that.saveFail(res)
				}
			});
		} else {
			wx.showToast({
				icon: "none",
				title: "图片保存失败"
			})
		}
	},
})