//index.js
//获取应用实例
import api from "../../utils/api";
import {
	dateFormatting
} from "../../utils/util";

var _this,
	t,
	app = getApp();

Page({
	data: {
		adPopClosed: false,
		showMusicBox: false,
		mscBgAnimation: null,
		rotationDegrees: 0,
		mscContext: null,
		mscPlaying: false,
		banners: [],
		indicatorDots: false,
		autoplay: 1,
		interval: 5e3,
		duration: 1e3,
		announcement: "",
		recycle_convenient_is_open: false,
		markers: [],
		list: [],
		checkMarker: {},
		latitude: "",
		longitude: "",
		addressText: "",
		address: {},
		workday: "",
		indexData: "",
		index_adv_pic: "",
		ad_tiem: 5,
		adInterval: null,
		shareTitle: "",
		shareImage: "",
		cateList: [],
		checkCateId: 0,
		childCateList: [],
		childCateId: 0,
		productList: [],


		markers: [],
		list: [],
		checkMarker: {},
		latitude: "",
		longitude: "",

		type: 1,

		showAdPop: false,
		showProtPop: false,
		ggShow: false,
		ggnr: "",

		telShow: false,
		telList: [{
				name: "废品回收",
				checkIn: true,
				childs: [{
					name: "王师傅",
					tel: "18551014057",
					img: "http://gchscc.zaishenziyuan.cn/%E4%BE%BF%E6%B0%91%E7%94%B5%E8%AF%9D/%E7%8E%8B%E5%B8%88%E5%82%85.png",
				}, {
					name: "刘师傅",
					tel: "15195712972",
					img: "http://gchscc.zaishenziyuan.cn/%E4%BE%BF%E6%B0%91%E7%94%B5%E8%AF%9D/%E5%88%98%E5%B8%88%E5%82%85.png",
				}, {
					name: "卞师傅",
					tel: "13511561535",
					img: "http://gchscc.zaishenziyuan.cn/%E4%BE%BF%E6%B0%91%E7%94%B5%E8%AF%9D/%E5%8D%9E%E5%B8%88%E5%82%85.png",
				}]
			},
			{
				name: "家电维修",
				childs: []
			},
			{
				name: "工商注册",
				childs: [{
					name: "李会计",
					tel: "16565055554",
					img: "http://gchscc.zaishenziyuan.cn/%E4%BE%BF%E6%B0%91%E7%94%B5%E8%AF%9D/%E6%9D%8E%E4%BC%9A%E8%AE%A1.png"
				}]
			},
			{
				name: "管道疏通",
				childs: []
			},
			{
				name: "家政保洁",
				childs: []
			},
			{
				name: "开锁换锁",
				childs: []
			},
			{
				name: "教育培训",
				childs: []
			},
			{
				name: "其他服务",
				childs: []
			}

		],
		curTels: [],
		titleTop: wx.getMenuButtonBoundingClientRect().top,
		titleHeight: wx.getMenuButtonBoundingClientRect().height,
		hzshow: false
	},
	playMusic() {
		if (!this.data.mscPlaying) {
			this.data.mscContext.play();
		} else {
			this.data.mscContext.pause();
		}

		this.rotateMscBg();

		this.setData({
			mscPlaying: !this.data.mscPlaying
		});
	},
	rotateMscBg: function() {
		this.setData({
			isRotating: !this.data.isRotating
		});
	},
	kfClick() {
		wx.openCustomerServiceChat({
			extInfo: {
				url: 'https://work.weixin.qq.com/kfid/kfc6369209f095342eb'
			},
			corpId: 'ww7e84823e74f6682a', //企业微信ID
			success(res) {
				console.log(res)
			},
			fail(err) {
				console.log(err)
			}
		})

	},
	handleHzshow() {
		this.setData({
			hzshow: true
		})
	},
	handleHzHide() {
		this.setData({
			hzshow: false
		})
	},
	recoveryList: function(res) {
		wx.navigateTo({
			url: "/pages/recycler/list/list",
		});
	},
	tabtelShow() {
		this.setData({
			telShow: true,
		})
	},
	tabtelHide() {
		this.setData({
			telShow: false,
		})
	},
	protClick() {
		const protAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		protAnimation.width('100%').step();
		this.setData({
			protAnimation: protAnimation.export()
		});
		this.setData({
			showProtPop: true,
		})
	},
	hideProtPop() {
		const protAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		protAnimation.translateX('-100%').step();

		this.setData({
			protAnimation: protAnimation.export()
		});
		setTimeout(() => {
			this.setData({
				showProtPop: false,
			})
		}, 300)
	},
	initAdImg() {
		let showAdPopTimer = setTimeout(() => {
		  this.setData({
		    showAdPop: true
		  })
		}, this.data.ad_tiem * 1000)
		
		this.setData({
			showAdPopTimer: showAdPopTimer
		})
		
		let adInterval = setInterval(() => {
			if (this.data.ad_tiem == 1) {
				this.getTabBar().setData({
					isShowTabBar: true,
				});
				this.setData({
					showAdPop: true
				});

			}

			if (this.data.ad_tiem > 0) {
				let time = this.data.ad_tiem - 1;
				this.setData({
					ad_tiem: time,
				});
			} else {
				clearInterval(adInterval);

			}
		}, 1000);
		
		this.setData({
			adInterval: adInterval,
		});
	},
	hideAdImg() {
		clearTimeout(this.data.showAdPopTimer);
		this.setData({
			ad_tiem: 0,
			adInterval: null
		});
		
		this.getTabBar().setData({
			isShowTabBar: true,
		});

		setTimeout(() => {
			const adPopAnimation = wx.createAnimation({
				duration: 300,
				timingFunction: 'ease'
			});
			this.setData({
				adPopAnimation: adPopAnimation.export()
			});
			this.setData({
				showAdPop: true
			});
			const adPopBgAnimation = wx.createAnimation({
				duration: 300,
				timingFunction: 'ease'
			});
			adPopBgAnimation.opacity(1).step();
			// adPopBgAnimation.backgroundColor("rgba(0, 0, 0, 0.5)").step();
			this.setData({
				adPopBgAnimation: adPopBgAnimation.export(),
			});
		}, 100)
	},

	pageScrollToBottom: function() {
		wx.createSelectorQuery()
			.select("#page")
			.boundingClientRect(function(rect) {
				if (rect) {
					// 使页面滚动到底部
					wx.pageScrollTo({
						scrollTop: rect.height,
					});
				}
			})
			.exec();
	},

	toSite: function(e) {
		let marker = e.currentTarget.dataset.marker;
		wx.openLocation({
			latitude: parseFloat(marker.latitude),
			longitude: parseFloat(marker.longitude),
			name: marker.name,
			address: marker.address,
		});
	},
	showContent: function(e) {
		let content = e.currentTarget.dataset.content;
		this.setData({
			ggShow: true,
			ggnr: content
		})
	},
	hideGg: function() {
		this.setData({
			ggShow: false
		})
	},
	toConvenient: function() {
		wx.navigateTo({
			url: "/pages/convenient/convenience/index",
		});
	},
	toStoreCode: function() {
		wx.navigateTo({
			url: "/pages/me/storeCode/storeCode",
		});
	},
	toData: function() {
		wx.navigateTo({
			url: "/pages/me/launchData/launchData",
		});
	},
	toLink: function() {
		let t = this;
		wx.navigateTo({
			url: t.data.indexData.show_pic_url,
			fail: function() {
				wx.switchTab({
					url: t.data.indexData.show_pic_url,
				});
			},
		});
	},
	toRecovery: function(e) {
		let id = e.currentTarget.dataset.id;
		if (id) {
			app.globalData.switchId = id;
		}
		wx.navigateTo({
			url: "/pages/recovery/recovery",
		});
	},
	toRecoveryNew: function() {
		this.setData({
			showProtPop: false,
		})
		wx.navigateTo({
			url: "/pages/recovery/recovery",
		});
	},
	makePhoneCall: function(e) {
		let phone = e.currentTarget.dataset.phone;
		if (phone) {
			wx.makePhoneCall({
				phoneNumber: phone,
			})
		}
	},
	toPrice: function() {
		wx.navigateTo({
			url: "/pages/recovery/recoveryPrice/recoveryPrice",
		});
	},

	toStrategy: function() {
		wx.navigateTo({
			url: "/pages/me/Strategy/Strategy",
		});
	},

	toGarbageIdentification() {
		wx.navigateTo({
			url: "/pages/index/garbageIdentification/garbageIdentification",
		});
	},
	toCate: function(e) {
		let id = e.currentTarget.dataset.id;
		if (id) {
			app.globalData.cate_id = id;
		}
		wx.switchTab({
			url: "/pages/category/category",
		});
	},
	toPoint: function() {
		wx.switchTab({
			url: "/pages/launchPoint/launchPoint",
		});
	},
	toNews() {
		wx.switchTab({
			url: "/pages/news/news",
		});
	},
	// 跳转到资讯详情
	toNewsInfo: function(e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "/pages/news/newsInfo/newsInfo?id=" + id,
		});
	},
	// 跳转到公益回收
	toDispose: function() {
		wx.navigateTo({
			url: "/pages/publicBenefit/recovery",
		});
	},
	toShop() {
		wx.navigateTo({
			url: "/pages/shop/shop",
		});
	},
	toBanner(e) {
		let nav = e.currentTarget.dataset.url;
		wx.navigateTo({
			url: nav,
		});
	},
	toNav(e) {
		let nav = e.currentTarget.dataset.item;
		let jump_type = nav.jump_type;
		let link = nav.link.trim();
		switch (jump_type) {
			case 0:
				wx.navigateTo({
					url: link,
				});
				break;
			case 1:
				wx.navigateTo({
					url: link,
				});
			case 2:
				wx.navigateToMiniProgram({
					appId: nav.appid,
					path: nav.link,
					success(res) {
						console.log(res);
					},
				});
		}
	},
	checkData: function(paramObj) {
		var lng1 = paramObj.lng1;
		var lat1 = paramObj.lat1;

		var lng2 = paramObj.lng2;
		var lat2 = paramObj.lat2;

		var radLat1 = (lat1 * Math.PI) / 180.0;
		var radLat2 = (lat2 * Math.PI) / 180.0;
		var a = radLat1 - radLat2;
		var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
		var s =
			2 *
			Math.asin(
				Math.sqrt(
					Math.pow(Math.sin(a / 2), 2) +
					Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
				)
			);
		s = s * 6378.137; // EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;

		s = s * 1000;

		if (isNaN(s)) {
			return 0 + "m";
		}

		if (s > 1000) {
			//    大于1000米时
			s = Math.floor((s / 1000) * 100) / 100;
			s = s + "km";
		} else {
			//    小于1000米直接返回
			s = s + "m";
		}

		return s;
	},

	markertap(e) {
		let t = this;
		let id = e.detail.markerId;
		for (let item of t.data.list) {
			if (item.id === id) {
				let paramObj = {};
				paramObj.lng1 = item.longitude;
				paramObj.lat1 = item.latitude;
				paramObj.lng2 = t.data.longitude;
				paramObj.lat2 = t.data.latitude;
				item.meter = t.checkData(paramObj);
				let location = {};
				location.longitude = item.longitude;
				location.latitude = item.latitude;
				api.getCityByCoor(location, function(res) {
					item.address = res.result.address;
					let opt = {};
					opt.id = item.id;
					api.sitePrice(opt, function(res) {
						item.priceList = res.data.list;
						console.log(getApp().globalData.marker);
						t.setData({
							checkMarker: item,
						});

						t.pageScrollToBottom();
					});
				});
				break;
			}
		}
	},

	t_phone: function() {
		api.aboutUs(function(res) {
			wx.makePhoneCall({
				phoneNumber: res.data.service_tel,
			});
		});
	},
	runMscAni() {
		this.animate('.msc-pic-icon', [{
				rotate: 0
			},
			{
				rotate: 360
			},
		], 5000, function() {
			this.stopMscAni();
			this.runMscAni();
		}.bind(this))
	},
	stopMscAni() {
		this.clearAnimation('.msc-pic-icon')
	},

	//事件处理函数
	bindViewTap: function() {},
	closePlayMusic(e) {
		this.stopMscAni();
		this.animate('.msc-wrapper', [{
				translateX: '0'
			},
			{
				translateX: '100%'
			},
		], 500, function() {
			this.data.mscContext.pause();
			this.setData({
				showMusicBox: false
			})
		}.bind(this))
	},
	onLoad: function(options) {
		_this = this;

		let mscCtx = wx.createInnerAudioContext();
		mscCtx.src =
			'http://gchscc.zaishenziyuan.cn/e9/%E9%9F%B3%E4%B9%90/8bb069f6730a11eeb7c000163e054ea3.mp3';
		mscCtx.onPlay(function() {
			console.log("播放中");
			_this.runMscAni();
		});
		mscCtx.onPause(function() {
			console.log("已暂停");
			_this.stopMscAni();
		});
		mscCtx.onStop(function() {
			console.log("已停止");
		});
		this.setData({
			mscContext: mscCtx
		});

		if (Array.isArray(this.data.telList) && this.data.telList.length > 0) {
			this.setData({
				curTels: this.data.telList[0].childs
			})
		}

		wx.showShareMenu({
			// 需要显示的转发按钮名称列表.合法值包含 "shareAppMessage"、"shareTimeline"
			menus: ["shareAppMessage", "shareTimeline"],
			success(res) {},
			fail(e) {},
		});
		if (options.type === "share") {
			let uid = options.uid;
			if (uid) {
				wx.setStorageSync("recommend_id", uid);
				wx.removeStorageSync("token");
			}
		}
		if (options.scene) {
			let data = options.scene;
			if (data.indexOf("share") >= 0) {
				let uid = data.split("-")[1];
				if (uid) {
					wx.setStorageSync("recommend_id", uid);
					wx.removeStorageSync("token");
				}
			} else if (data.substr(0, 4) == "user") {
				// 用户推广码
				if (!wx.getStorageSync("token")) {
					wx.setStorageSync("user_code", data);
					wx.setStorageSync("user_code_login", 1);
				}
				wx.setStorageSync("user_code", data);
				api.bindUserCode({
					code_number: data
				}, function(res) {
					if (!res.data) {
						wx.showModal({
							title: "提示",
							content: res.msg,
							showCancel: false,
						});
					} else {
						if (res.data.bind_status == 1) {
							wx.setStorageSync("recommend_id", res.data.bind_uid);
							wx.setStorageSync("recomment_id", res.data.bind_uid);
							wx.removeStorageSync("token");
						} else {
							// 没有绑定过，跳新页面
							wx.navigateTo({
								url: "/pages/me/bindData/bindData",
							});
						}
					}
				});
			} else {
				_this.setData({
					code: options.scene,
				});
			}
		}
		
		wx.showLoading();
		api.indexPage(function(res) {
			wx.hideLoading();
			_this.setData({
				banners: res.data.banner,
				nav: res.data.nav,
				recycle_data: res.data.recycle_data,
				announcement: res.data.announcement,
				rubbish_category: res.data.rubbish_category,
				index_picture: res.data.index_picture,
				index_url: res.data.index_url,
				news_list: res.data.news_list,
				index_adv_pic: res.data.index_adv_pic,
			});
			getApp().globalData.nav = res.data.nav;
			getApp().store.setState({
				menu: res.data.menu,
			});
			if (!res.data.index_adv_pic) {
				_this.setData({
					ad_tiem: 0,
				});
				_this.setData({
					showAdPop: true
				})
		
		
			} else {
				if (_this.data.ad_tiem == 5) {
					_this.getTabBar().setData({
						isShowTabBar: false,
					});
				}
			}
		});

		api.requirement(function(res) {
			_this.setData({
				requirement: res.data.list,
			});
		});
		api.aboutUs(function(res) {
			wx.setNavigationBarTitle({
				title: res.data.name,
			});
			_this.setData({
				workday: res.data.workday,
				indexData: res.data,
			});
		});

		api.getCity(function(res) {
			wx.setStorageSync("city", res.result.address_component.city);
			wx.setStorageSync("selfAddress", res.result);
			wx.setStorageSync(
				"tempAddress",
				JSON.stringify({
					time: new Date().getTime(),
					data: res.result
				})
			);
			_this.updateTempAddress();

			_this.setData({
				city: res.result.address_component.city,
				addressText: res.result.formatted_addresses.recommend,
			});
		});
		let token = wx.getStorageSync("token");
		if (token) {
			_this.updateTempAddress();

			api.getUserInfo(function(res) {
				_this.setData({
					userInfo: res.data,
				});
				wx.setStorageSync("userInfo", res.data);
				if (res.data.is_collector === 1) {
					wx.getLocation({
						success: function(res) {
							let opt = {};
							opt.latitude = res.latitude;
							opt.longitude = res.longitude;
							api.collectorLocation(opt, function(res) {
								console.log(res);
							});
						},
					});
				}
			});
		}
		let t = this;
		wx.getLocation({
			type: "wgs84",
			success(res) {
				let opt = {};
				opt.latitude = res.latitude;
				opt.longitude = res.longitude;
				_this.setData({
					latitude: res.latitude,
					longitude: res.longitude,
				});
				api.nearbyCollector(opt, function(res) {
					// res.data.list[0].latitude = '32.086356'
					// res.data.list[0].longitude = '112.200966'
					// res.data.list[1].latitude = '32.091010'
					// res.data.list[1].longitude = '112.198906'
					// res.data.list[2].latitude = '32.080829'
					// res.data.list[2].longitude = '112.203026'
					let markers = [];
					for (let item of res.data.list) {
						let marker = {
							// iconPath: item.avatar,
							iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%81/%E5%9B%BE%E5%8F%B8%E6%9C%BA-20230912-37342100.png',
							id: item.id,
							// name: item.name,
							latitude: item.latitude,
							longitude: item.longitude,
							width: 48,
							height: 48,
							// callout: {
							// 	content: "名字：" + item.name + "\n电话：" + item.phone,
							// },
						};
						markers.push(marker);
					}
					t.setData({
						markers: markers,
						list: res.data.list,
					});
				});
			},
		});

		this.getPriceClassify();

		this.mapData()

		// let showAdPopTimer = setTimeout(() => {
		//   this.setData({
		//     showAdPop: true
		//   })
		// }, 6000)
		
		// this.setData({
		// 	showAdPopTimer: showAdPopTimer
		// })
	},
	onShow: function() {
		console.log("this.data.showAdPop", this.data.showAdPop);
		console.log("this.data.adPopClosed", this.data.adPopClosed);
		if (this.data.adPopClosed) {
			this.setData({
				showMusicBox: true
			})
		}
		let token = wx.getStorageSync("token");

		let isCode = wx.getStorageSync("user_code_login");
		if (token && isCode) {
			let userCode = wx.getStorageSync("user_code");
			// 绑定
			api.bindUserCode({
					code_number: userCode
				},
				function(res) {
					wx.removeStorageSync("user_code_login");
					wx.removeStorageSync("user_code");
					if (!res.data) {
						wx.showModal({
							title: "提示",
							content: res.msg,
							showCancel: false,
						});
					} else {
						wx.setStorageSync("recommend_id", res.data.bind_uid);
						wx.removeStorageSync("token");
					}
				},
				true
			);
		}

		this.updateTempAddress();

		if (token && _this.data.code) {
			wx.showModal({
				title: "綁定通知",
				content: "是否使用环保袋",
				cancelText: "我先看看",
				confirmText: "确认绑定",
				success: function(res) {
					if (res.confirm) {
						api.getUserInfo(function(res) {
							let userInfo = res.data;
							if (
								userInfo.phone == "" ||
								userInfo.phone == null ||
								userInfo.real_name == "" ||
								userInfo.real_name == null ||
								userInfo.address == "" ||
								userInfo.address == null
							) {
								wx.navigateTo({
									url: "/pages/me/userInfo/userInfo",
								});
							} else {
								let opt = {};
								opt.code_number = _this.data.code;
								_this.setData({
									code: null,
								});
								api.bagBind(opt, function(res) {
									if (res.code === 0) {
										wx.showModal({
											title: "綁定通知",
											content: "绑定垃圾袋成功",
											showCancel: false,
										});
									}
								});
							}
						});
					} else {
						_this.setData({
							code: null,
						});
					}
				},
			});
		}
		// 获取数据
		// wx.showLoading();
		// api.indexPage(function(res) {
		// 	wx.hideLoading();
		// 	_this.setData({
		// 		banners: res.data.banner,
		// 		nav: res.data.nav,
		// 		recycle_data: res.data.recycle_data,
		// 		announcement: res.data.announcement,
		// 		rubbish_category: res.data.rubbish_category,
		// 		index_picture: res.data.index_picture,
		// 		index_url: res.data.index_url,
		// 		news_list: res.data.news_list,
		// 		index_adv_pic: res.data.index_adv_pic,
		// 	});
		// 	getApp().globalData.nav = res.data.nav;
		// 	getApp().store.setState({
		// 		menu: res.data.menu,
		// 	});
		// 	if (!res.data.index_adv_pic) {
		// 		_this.setData({
		// 			ad_tiem: 0,
		// 		});
		// 		_this.setData({
		// 			showAdPop: true
		// 		})


		// 	} else {
		// 		if (_this.data.ad_tiem == 5) {
		// 			_this.getTabBar().setData({
		// 				isShowTabBar: false,
		// 			});
		// 		}
		// 	}
		// });
		if (token) {
			api.pluginIsOpen(function(res) {
				if (res.data.recycle_prepare_is_open) {
					api.getUserInfo(function(res) {
						let userInfo = res.data;
						if (!userInfo.phone || !userInfo.real_name) {
							wx.showModal({
								showCancel: false,
								content: "请先完善个人信息",
								success(res) {
									wx.navigateTo({
										url: "/pages/me/userEdit/userEdit",
									});
								},
							});
						}
					});
					_this.setData({
						recycle_convenient_is_open: true,
					});
				}
			});
			// 通过地址获取分类
			let address = app.globalData.address;
			if (address) {
				this.getClassify(address);
			} else {
				api.getAddress(function(res) {
					if (res.data.list.length > 0) {
						for (let address of res.data.list) {
							if (address.is_default === 1) {
								_this.setData({
									address: address,
								});
								_this.getClassify(address);
								break;
							}
						}
						if (!_this.data.address.id) {
							_this.getClassify(res.data.list[0]);
						}
					} else {
						_this.getClassify("");
					}
				});
			}
		} else {
			this.getClassify("");
		}
		// 这里兼容自定义tab
		if (typeof this.getTabBar === "function" && this.getTabBar()) {
			this.getTabBar().setData({
				selected: 0,
			});
		}
	},

	updateTempAddress() {
		var token = wx.getStorageSync("token");
		if (!token) {
			return false;
		}
		let canSave = true;
		var address_save = wx.getStorageSync("TEMP_ADDRESS_SAVE");
		if (address_save) {
			address_save = JSON.parse(address_save);
			canSave = new Date().getTime() - address_save.time > 1000 * 86400; //一天更新一次地址
		}
		if (canSave) {
			let tempAddress = wx.getStorageSync("tempAddress");
			if (tempAddress) {
				tempAddress = JSON.parse(tempAddress);
				api.updateTempAddress({
						data: JSON.stringify(tempAddress.data)
					},
					function(res) {
						if (res.code == 0) {
							wx.setStorageSync(
								"TEMP_ADDRESS_SAVE",
								JSON.stringify({
									time: new Date().getTime(),
									data: 1
								})
							);
						}
					}
				);
			}
		}
	},
	// 获取分类
	getClassify: function(address) {
		api.recyclePriceUser({
				address_id: address ? address.id : "",
			},
			function(res) {
				var list = res.data.list.map((item) => {
					return (item = {
						id: item.id,
						picture: item.picture,
						name: item.name,
						describe: item.describe,
					});
				});
				// _this.setData({
				//   cateList: list,
				// });
			}
		);
	},

	checkChildCate: function(e) {
		let id = e.currentTarget.dataset.id;
		const t = this;
		t.setData({
			childCateId: id,
		});
		for (let item of t.data.childCateList) {
			if (id === item.id) {
				t.setData({
					productList: item.product,
				});

				t.checkProductList();
			}
		}
	},

	handleTelParentTap(e) {
		const childs = e.currentTarget.dataset.childs
		const item = e.currentTarget.dataset.i


		const data = this.data.telList.slice(0)

		data.forEach((ele, i) => {
			ele.checkIn = false
			if (item == i) {
				ele.checkIn = true
			}
		})
		this.setData({
			curTels: childs,
			telList: data
		})
	},

	checkProductList: function() {
		const t = this;
		let newProducts = [];
		let products = t.data.productList;
		let check_product = app.globalData.products;
		for (let product of products) {
			product.isCheck = false;
			if (check_product && check_product.length > 0) {
				for (let check_item of check_product) {
					if (check_item.name === product.name) {
						product.isCheck = true;
						break;
					}
				}
			}

			newProducts.push(product);
		}
		t.setData({
			productList: newProducts,
		});
	},

	getPriceClassify: function(options) {
		const t = this;
		// let address_id = options.address_id;
		// let cate_id = options.cate_id;
		let address_id, cate_id;
		let token = wx.getStorageSync("token");
		if (token) {
			if (address_id) {
				api.recyclePrice({
					address_id: address_id
				}, function(res) {
					t.setData({
						cateList: res.data.list,
					});
					if (t.data.cateList.length > 0) {
						for (let cateListElement of t.data.cateList) {
							if (cateListElement.id == cate_id) {
								t.setData({
									checkCateId: cateListElement.id,
									childCateList: cateListElement.category,
								});
								if (t.data.childCateList.length > 0) {
									t.setData({
										childCateId: t.data.childCateList[0].id,
										productList: t.data.childCateList[0].product,
									});
									t.checkProductList();
								}
								break;
							}
						}
					} else {
						wx.showModal({
							showCancel: false,
							content: "该地区暂未开通服务",
						});
					}
				});
			} else {
				let address = app.globalData.address;
				if (address) {
					t.setData({
						address,
					});
					api.recyclePrice({
						address_id: address.id
					}, function(res) {
						t.setData({
							cateList: res.data.list,
						});
						if (t.data.cateList.length > 0) {
							for (let cateListElement of t.data.cateList) {
								if (cateListElement.id == cate_id) {
									t.setData({
										checkCateId: cateListElement.id,
										childCateList: cateListElement.category,
									});
									if (t.data.childCateList.length > 0) {
										t.setData({
											childCateId: t.data.childCateList[0].id,
											productList: t.data.childCateList[0].product,
										});
										t.checkProductList();
									}
									break;
								}
							}
						} else {}
					});
				} else {
					api.getAddress(function(res) {
						if (res.data.list.length > 0) {
							for (let address of res.data.list) {
								if (address.is_default === 1) {
									t.setData({
										address,
									});
									api.recyclePrice({
										address_id: address.id
									}, function(res) {
										t.setData({
											cateList: res.data.list,
										});
										if (t.data.cateList.length > 0) {
											for (let cateListElement of t.data.cateList) {
												if (cateListElement.id == cate_id) {
													t.setData({
														checkCateId: cateListElement
															.id,
														childCateList: cateListElement
															.category,
													});
													if (t.data.childCateList.length > 0) {
														t.setData({
															childCateId: t.data
																.childCateList[0]
																.id,
															productList: t.data
																.childCateList[0]
																.product,
														});
														t.checkProductList();
													}
													break;
												}
											}
										} else {}
									});
									break;
								}
							}
							if (!t.data.address.id) {
								t.setData({
									address: res.data.list[0],
								});
								api.recyclePrice({
									address_id: address.id
								}, function(res) {
									t.setData({
										cateList: res.data.list,
									});
									if (t.data.cateList.length > 0) {
										for (let cateListElement of t.data.cateList) {
											if (cateListElement.id == cate_id) {
												t.setData({
													checkCateId: cateListElement.id,
													childCateList: cateListElement
														.category,
												});
												if (t.data.childCateList.length > 0) {
													t.setData({
														childCateId: t.data
															.childCateList[0].id,
														productList: t.data
															.childCateList[0]
															.product,
													});
													t.checkProductList();
												}
												break;
											}
										}
									} else {}
								});
							}
						} else {
							api.recyclePrice({
								address_id: ""
							}, function(res) {
								t.setData({
									cateList: res.data.list,
								});
								if (t.data.cateList.length > 0) {
									for (let cateListElement of t.data.cateList) {
										if (cateListElement.id == cate_id) {
											t.setData({
												checkCateId: cateListElement.id,
												childCateList: cateListElement
													.category,
											});
											if (t.data.childCateList.length > 0) {
												t.setData({
													childCateId: t.data
														.childCateList[0].id,
													productList: t.data
														.childCateList[0].product,
												});
												t.checkProductList();
											}
											break;
										}
									}
								} else {}
							});
						}
					});
				}
			} {
				api.recyclePrice({
					address_id: ""
				}, function(res) {
					t.setData({
						cateList: res.data.list,
					});
					if (t.data.cateList.length > 0) {
						for (let cateListElement of t.data.cateList) {
							let check_id = cate_id ? cate_id : t.data.cateList[0].id;
							if (cateListElement.id == check_id) {
								t.setData({
									checkCateId: cateListElement.id,
									childCateList: cateListElement.category,
								});
								if (t.data.childCateList.length > 0) {
									t.setData({
										childCateId: t.data.childCateList[0].id,
										productList: t.data.childCateList[0].product,
									});
									t.checkProductList();
								}
								break;
							}
						}
					} else {}
				});
			}
		} else {
			api.recyclePrice({
				address_id: ""
			}, function(res) {
				t.setData({
					cateList: res.data.list,
				});
				if (t.data.cateList.length > 0) {
					for (let cateListElement of t.data.cateList) {
						let check_id = cate_id ? cate_id : t.data.cateList[0].id;
						if (cateListElement.id == check_id) {
							t.setData({
								checkCateId: cateListElement.id,
								childCateList: cateListElement.category,
							});
							if (t.data.childCateList.length > 0) {
								t.setData({
									childCateId: t.data.childCateList[0].id,
									productList: t.data.childCateList[0].product,
								});
								t.checkProductList();
							}
							break;
						}
					}
				} else {}
			});
		}
	},

	checkCate: function(e) {
		let id = e.currentTarget.dataset.id;
		const t = this;
		t.setData({
			checkCateId: id,
			childCateList: [],
			childCateId: 0,
			productList: [],
		});

		for (let item of t.data.cateList) {
			if (id === item.id) {
				t.setData({
					childCateList: item.category,
				});
				if (item.category.length > 0) {
					t.setData({
						childCateId: item.category[0].id,
						productList: item.category[0].product,
					});

					t.checkProductList();
				}
			}
		}
	},

	onShareAppMessage: function() {
		return {
			title: this.data.indexData.share_title,
			path: "/pages/index/index",
			imageUrl: this.data.indexData.share_image_url,
		};
	},


	checkmarker2: function() {

		this.setData({
			checkMarker: []
		})
	},

	toSite: function(e) {
		let marker = e.currentTarget.dataset.marker;
		wx.openLocation({
			latitude: parseFloat(marker.latitude),
			longitude: parseFloat(marker.longitude),
			name: marker.name,
			address: marker.address
		})
	},

	regionchange(e) {
	},

	checkData: function(paramObj) {
		var lng1 = paramObj.lng1
		var lat1 = paramObj.lat1

		var lng2 = paramObj.lng2
		var lat2 = paramObj.lat2

		var radLat1 = lat1 * Math.PI / 180.0;
		var radLat2 = lat2 * Math.PI / 180.0;
		var a = radLat1 - radLat2;
		var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
		var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
			Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * 6378.137; // EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;

		s = s * 1000

		if (isNaN(s)) {
			return 0 + 'm';
		}

		if (s > 1000) {
			//    大于1000米时
			s = Math.floor(s / 1000 * 100) / 100;
			s = s + 'km'
		} else {
			//    小于1000米直接返回
			s = s + 'm'
		}

		return s;
	},

	toList: function(res) {
		wx.navigateTo({
			url: "/pages/recycler/list/list"
		})
	},
	mapData() {
		var t = this;
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				let opt = {}
				opt.latitude = res.latitude
				opt.longitude = res.longitude
				t.setData({
					latitude: res.latitude,
					longitude: res.longitude
				})
				api.nearbyCollector(opt, function(res) {
					// res.data.list[0].latitude = '32.086356'
					// res.data.list[0].longitude = '112.200966'
					// res.data.list[1].latitude = '32.091010'
					// res.data.list[1].longitude = '112.198906'
					// res.data.list[2].latitude = '32.080829'
					// res.data.list[2].longitude = '112.203026'


					let markers = []
					for (let item of res.data.list) {
						let marker = {
							// iconPath: item.avatar,
							iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%81/%E5%9B%BE%E5%8F%B8%E6%9C%BA-20230912-37342100.png',
							id: item.id,
							// name: item.name,
							latitude: item.latitude,
							longitude: item.longitude,
							phone: item.phone,
							width: 48,
							height: 48,
							// callout: {
							// 	content: "名字：" + item.name + "\n电话：" + item.phone
							// }
						}
						markers.push(marker)
					}
					t.setData({
						markers: markers,
						list: res.data.list
					})

					// if (options.id) {
					// 	let data = {}
					// 	data.detail = {}
					// 	data.detail.markerId = options.id
					// 	t.markertap(data)
					// }
				})
			}
		})

	},
	lxkh() {
		wx.navigateTo({
			url: "serve",
		});
	},
	toServe: function() {
		wx.makePhoneCall({
			phoneNumber: '18551014057', // 替换为要拨打的电话号码
			success: function() {
				console.log('拨打电话成功！');
			},
			fail: function() {
				console.log('拨打电话失败！');
			}
		});
	},
	onCopy(e) {
		let id = "bianhaihong5201314"
		wx.setClipboardData({
			data: id,
		})
		wx.showToast({
			icon: "none",
			title: "复制成功",
		});
	},
	phoneOn(e) {
		let phone = e.currentTarget.dataset.t;
		wx.makePhoneCall({
			phoneNumber: phone, //此号码仅用于测试
			success: function() {
				console.log("拨打电话成功！")
			},
			fail: function() {
				console.log("拨打电话失败！")
			}
		})
	},
	checkmarker1(e) {
		this.data.checkMarker
		let index = e.target.dataset.index
		let data = [];
		if (index == 1) {
			//
			this.b();
		} else {
			this.a();
		}
		this.setData({
			type: index,
			checkMarker: {}
		})
	},
	b() {
		var t = this;
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				let opt = {}
				opt.latitude = res.latitude
				opt.longitude = res.longitude
				t.setData({
					latitude: res.latitude,
					longitude: res.longitude
				})
				api.nearbyCollector(opt, function(res) {
					// res.data.list[0].latitude = '32.086356'
					// res.data.list[0].longitude = '112.200966'
					// res.data.list[1].latitude = '32.091010'
					// res.data.list[1].longitude = '112.198906'
					// res.data.list[2].latitude = '32.080829'
					// res.data.list[2].longitude = '112.203026'


					let markers = []
					for (let item of res.data.list) {
						let marker = {
							// iconPath: item.avatar,
							iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%81/%E5%9B%BE%E5%8F%B8%E6%9C%BA-20230912-37342100.png',
							id: item.id,
							// name: item.name,
							latitude: item.latitude,
							longitude: item.longitude,
							phone: item.phone,
							width: 48,
							height: 48,
							// callout: {
							// 	content: "名字：" + item.name + "\n电话：" + item.phone
							// }
						}
						markers.push(marker)
					}
					t.setData({
						markers: markers,
						list: res.data.list
					})

				})
			}
		})

	},

	a() {
		let t = this;
		wx.getLocation({
			type: 'wgs84',
			success(res) {
				let opt = {}
				opt.latitude = res.latitude
				opt.longitude = res.longitude
				t.setData({
					latitude: res.latitude,
					longitude: res.longitude
				})
				api.site(opt, function(res) {
					// res.data.list[0].latitude = '32.086356'
					// res.data.list[0].longitude = '112.200966'

					let markers = []
					for (let item of res.data.list) {
						let marker = {
							// iconPath: item.picture,
							iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%81/%E5%9B%BE%E5%8F%B8%E6%9C%BA-20230912-37342100%20%282%29.png',
							id: item.id,
							// name: item.name,
							latitude: item.latitude,
							longitude: item.longitude,
							width: 48,
							height: 48,
							// callout: {
							//     content: "姓名：" + item.name + " \n电话：" + item.phone
							// }
						}
						markers.push(marker)
					}
					t.setData({
						markers: markers,
						list: res.data.list
					})
				})
			}
		})

	},


	hideAdPop(e) {
		const adPopAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		adPopAnimation.translateY("100%").step();
		setTimeout(() => {
			this.setData({
				showAdPop: false
			});
		}, 300)
		const adPopBgAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		adPopBgAnimation.opacity("0").step();
		this.setData({
			adPopAnimation: adPopAnimation.export(),
			adPopBgAnimation: adPopBgAnimation.export(),
			showMusicBox: true,
			adPopClosed: true
		});
	},
	toOrder(e) {
		wx.navigateTo({
			url: "/pages/recovery/recovery",
		});
	},
});