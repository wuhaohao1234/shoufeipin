// pages/recovery/order/detail/detail.js
var t;
var api = require("../../../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		mapKey: '4H3BZ-CB4C3-ODF3R-YXGH2-MXZS2-WWBYH',
		collectors: [],
		info: {},
		showPop: false,
		latitude: "",
		longitude: "",
		markers: [],
		polyline: [],
		meter: ""
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		t = this;
		const _this = this;

		let opt = {}
		opt.id = options.id;
		api.recycleDetail(opt, function(res) {
			console.log("recycleDetail", res)
			t.setData({
				info: res.data
			})


			let curPos = null;

			wx.getLocation({
				isHighAccuracy: true,
				type: "gcj02",
				// type: "wgs84",
				success(res) {
					console.log("resp", res);
					let opt = {};
					opt.latitude = res.latitude;
					opt.longitude = res.longitude;
					_this.setData({
						latitude: res.latitude,
						longitude: res.longitude,
					});
					api.nearbyCollector(opt, function(cresp) {
						let markers = [];
						const lines = [];

						console.log("附件的回，", res, "我是", _this.data.info)
						_this.setData({
							collectors: cresp.data.list
						});
						console.log("collectors", cresp.data.list);
						for (let item of cresp.data.list) {
							const points = [];
							points.push({
								latitude: opt.latitude,
								longitude: opt.longitude
							})
							points.push({
								latitude: parseFloat(item.latitude),
								longitude: parseFloat(item.longitude)
							})
							lines.push({
								width: 2,
								color: "#00ff00",
								points
							})

							if (_this.data.info.cid === item.id) {
								wx.request({
									//地图WebserviceAPI驾车路线规划接口 请求路径及参数（具体使用方法请参考开发文档）
									url: `https://apis.map.qq.com/ws/direction/v1/driving/?key=${_this.data.mapKey}&from=${`${opt.latitude},${opt.longitude}`}&to=${`${item.latitude},${item.longitude}`}`,
									success(resp) {
										var result = resp.data.result
										var route = result.routes[0]
								
										var coors = route.polyline,
											pl = [];
										//坐标解压（返回的点串坐标，通过前向差分进行压缩）
										var kr = 1000000;
										for (var i = 2; i < coors.length; i++) {
											coors[i] = Number(coors[i - 2]) +
												Number(coors[i]) / kr;
										}
										//将解压后的坐标放入点串数组pl中
										for (var i = 0; i < coors.length; i +=
											2) {
											pl.push({
												latitude: coors[i],
												longitude: coors[i + 1]
											})
										}
										
										const op = _this.data.polyline || [];
										_this.setData({
											// 绘制路线
											polyline: [...op, {
												points: pl,
												color: '#58c16c',
												width: 6,
												borderColor: '#2f693c',
												borderWidth: 1
											}]
										})
									}
								})
							}

							let marker = {
								iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%81/%E5%9B%BE%E5%8F%B8%E6%9C%BA-20230912-37342100.png',
								id: item.id,
								latitude: item.latitude,
								longitude: item.longitude,
								width: 48,
								height: 48,
								customCallout: {
									display: 'ALWAYS'
								},
							};
							
							console.log("marker", marker);
							markers.push(marker);

							if (_this.data.info.cid == item.id) {
								curPos = {
									latitude: item.latitude,
									longitude: item.longitude
								}
							}
						}

						const paramObj = {};
						paramObj.lng1 = opt.longitude;
						paramObj.lat1 = opt.latitude;
						paramObj.lng2 = curPos.longitude;
						paramObj.lat2 = curPos.latitude;
						const meter = _this.checkData(paramObj);
						
						// 起点图标
						markers.push({
							iconPath: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/1/1/%E5%AE%9A%E4%BD%8D-%E4%BA%BA%E8%84%B8%E6%8A%93%E6%8B%8D.png',
							id: 0,
							latitude: opt.latitude,
							longitude: opt.longitude,
							width: 48,
							height: 48,
							customCallout: {
								display: 'ALWAYS',
								anchorX: 0, anchorY: -5
							},
						});

						_this.setData({
							markers: markers,
							// markers: markers.filter((i,index)=>{
							// 	return index!==0;
							// }),
							meter: meter
						});
						console.log("markers", markers);
					});
				},
			});
		})
	},

	onShowPop() {
		this.setData({
			showPop: true
		})
	},

	onHidePop() {
		this.setData({
			showPop: false
		})
	},

	toRecovery: function() {
		wx.navigateTo({
			url: "/pages/recovery/recovery"
		})
	},
	clearOrder: function(e) {
		let id = e.currentTarget.dataset.id
		let opt = {}
		opt.id = id
		api.clearOrder(opt, function(res) {
			wx.navigateBack()
		})
	},

	onCopy(e) {
		let id = e.currentTarget.dataset.id
		wx.setClipboardData({
			data: id,
		})
		wx.showToast({
			icon: "none",
			title: "复制成功",
		});
	},

	toComment: function(e) {
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: "/pages/recovery/order/evaluate/evaluate?id=" + id
		})
	},

	checkData: function(paramObj) {
		console.log("定位打印", paramObj)
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

		s = s.toFixed(2)

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

	phone: function(e) {
		let phoneNumber = e.currentTarget.dataset.number
		wx.makePhoneCall({
			phoneNumber: phoneNumber
		})
	},

	toShowComment: function(e) {
		let id = e.currentTarget.dataset.id
		wx.navigateTo({
			url: "/pages/recovery/order/evaluate/evaluate?type=show&id=" + id
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