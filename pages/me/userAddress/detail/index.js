var _this, t = getApp(), api = require("../../../../utils/api");

Page({
	data: {
		province: "",
		city: "",
		district: "",
		latitude: "",
		longitude: "",
		province_arr: [],
		check_province_arr: [],
		province_index: -1,
		city_arr: [],
		check_city_arr: [],
		city_index: -1,
		district_arr: [],
		check_district_arr: [],
		district_index: -1,
		town_arr: [],
		check_town_arr: [],
		town_index: -1,
		allData: [],
		detail: {},
		phone:'',
		communityList:[],
		communityIndex: 0
	},
	//获取手机号老版本 容易报错 暂时注释
	// getPhoneNumber:function (res){
	// 	  let that = this
	//     console.log(res)
	//     let opt = {}
	//     opt.data = res.detail.encryptedData
	//     opt.iv = res.detail.iv
	//
	//     wx.login({
	//         success:function (res) {
	//             opt.code = res.code
	//             api.getPhoneNumber(opt, function (res){
	//                 console.log(res)
	//                that.setData({
	//                     phone:res.data.phoneNumber
	//                 })
	//             })
	//         }
	//     })
	// },
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
	bindProvinceChange: function (e) {
		_this.setData({
			province_index: e.detail.value,
			city_arr: [],
			check_city_arr: [],
			city_index: -1,
			district_arr: [],
			check_district_arr: [],
			district_index: -1,
			town_arr: [],
			check_town_arr: [],
			town_index: -1,
		})

		let check_province = _this.data.check_province_arr[e.detail.value]
		for (let province of _this.data.allData) {
			if (check_province === province.name) {
				_this.setData({
					city_arr: province.child
				})
				let check_city_arr = [];
				for (let city of province.child) {
					check_city_arr.push(city.name)
				}
				_this.setData({
					check_city_arr
				})

			}
		}
	},
	bindCityChange: function (e) {
		_this.setData({
			city_index: e.detail.value,
			district_arr: [],
			check_district_arr: [],
			district_index: -1,
			town_arr: [],
			check_town_arr: [],
			town_index: -1,
		})
		let check_city = _this.data.check_city_arr[e.detail.value]
		for (let city of _this.data.city_arr) {
			if (check_city === city.name) {
				_this.setData({
					district_arr: city.child
				})
				let check_district_arr = [];
				for (let item of city.child) {
					check_district_arr.push(item.name)
				}
				_this.setData({
					check_district_arr
				})

			}
		}
	},
	bindDistrictChange: function (e) {
		_this.setData({
			district_index: e.detail.value,
			town_arr: [],
			check_town_arr: [],
			town_index: -1,
		})
		let check_district = _this.data.check_district_arr[e.detail.value]
		for (let district of _this.data.district_arr) {
			if (check_district === district.name) {
				api.getTown(district.adcode, function (res) {
					console.log(res)
					_this.setData({
						town_arr: res.data.list
					})
					console.log(_this.data.town_arr)
					let check_town_arr = [];
					for (let item of res.data.list) {
						check_town_arr.push(item.name)
					}
					_this.setData({
						check_town_arr
					})
				})
			}
		}
	},
	bindTownChange: function (e) {
		var d = this
		this.setData({
			town_index: e.detail.value
		})
	},
	initAddress: function (address) {
		console.info('address', address)
		let province = address.province,
			city = address.city,
			district = address.district,
			town = address.street;

		if (province) {
			for (let item in _this.data.check_province_arr) {
				if (_this.data.check_province_arr[item] === province) {
					_this.setData({
						province_index: item
					})
				}
			}
			// console.log(_this.allData)
			for (let province_item of _this.data.allData) {
				// console.log(province_item)
				if (province === province_item.name) {
					_this.setData({
						city_arr: province_item.child
					})
					let check_city_arr = [];
					for (let item of province_item.child) {
						check_city_arr.push(item.name)
					}
					_this.setData({
						check_city_arr
					})
					if (city) {
						for (let item in check_city_arr) {
							if (check_city_arr[item] === city) {
								_this.setData({
									city_index: item
								})
							}
						}
						for (let city_item of _this.data.city_arr) {
							if (city === city_item.name) {
								_this.setData({
									district_arr: city_item.child
								})
								let check_district_arr = [];
								for (let item of  city_item.child) {
									check_district_arr.push(item.name)
								}
								_this.setData({
									check_district_arr
								})

								if (district) {
									for (let item in check_district_arr) {
										if (check_district_arr[item] === district) {
											_this.setData({
												district_index: item
											})
										}
									}
									for (let item of _this.data.district_arr) {
										if (district === item.name) {
											let adcode = item.adcode
											api.getTown(adcode, function (res) {
												_this.setData({
													town_arr: res.data.list
												})
												let check_town_arr = [];
												for (let item of res.data.list) {
													check_town_arr.push(item.name)
												}
												_this.setData({
													check_town_arr
												})
												if (town) {
													for (let item in check_town_arr) {
														if (check_town_arr[item] === town || check_town_arr[item]  ===town+"道") {
															_this.setData({
																town_index: item
															})
														}
													}
												}
											})
										}
									}
								}
							}
						}
					}
				}
			}
		}
	},
	onLoad: function (i) {

		_this = this;
		_this.setData({
			allData: wx.getStorageSync("allData")
		})
		let check_province_arr = [];
		for (let item of _this.data.allData) {
			check_province_arr.push(item.name)
		}
		_this.setData({
			check_province_arr
		})
		// console.info('i', i)
		api.getCommunity({}, function (res) {
			// console.log('getCommunity', res.data.list)
			res.data.list.unshift({id:0,name:'请选择'})
			// console.info('getCommunity', res.data.list)
			_this.setData({
				communityList: res.data.list,
			})
			if(i.address){
				let address = JSON.parse(i.address);
				if(address.community_id){
					if(address.community_id){
						_this.data.communityList.forEach((item, index) => {
							if(item.id === address.community_id){
								_this.data.communityIndex = index
								_this.setData({
									communityIndex: index
								})
							}
						})
					}
				}
			}
		})
		if (i.address){
			let address = JSON.parse(i.address);
			if (address.id) {
				_this.setData({
					detail: address
				})
				_this.initAddress(_this.data.detail)
			}
		}else{
			api.getCity(function (res) {
				// console.log(res)
				_this.initAddress(res.result.address_component)
			})
		}

	},
	formSubmit: function (e) {
		"" != e.detail.value.phone && "undefined" != e.detail.value.phone ?
			"" != e.detail.value.name && "undefined" != e.detail.value.name ?
				/^1[3456789]\d{9}$/.test(e.detail.value.phone) ?
					"" != e.detail.value.address && "undefined" != e.detail.address ?
						"" != e.detail.value.address_detail && "undefined" != e.detail.address_detail ?
							_this.checkAddOrUpdate(e)
							: wx.showToast({
								title: "请填写服务详细地址",
								icon: "error"
							})
						: wx.showToast({
							title: "请填写服务地址",
							icon: "error"
						})
					: wx.showToast({
						title: "请检查手机格式",
						icon: "error"
					})
				: wx.showToast({
					title: "请填写联系人",
					icon: "error"
				})
			: wx.showToast({
				title: "请填写联系方式",
				icon: "error"
			});
	},
	getCoordinate:function(address, success){
		api.getCoordinate(address, function (res) {
			success(res)
		})
	},
	onShow(){
		api.pluginIsOpen(function (res) {
			_this.setData({
				recycle_community_is_show: res.data.recycle_community_is_show,
				recycle_community_is_required: res.data.recycle_community_is_required
			})
		})
	},
	bindCommunityChange: function (e){
		this.setData({
			communityIndex: e.detail.value
		})
	},
	checkAddOrUpdate:function (e) {

		if(_this.data.city_index<0){
			wx.showToast({
				title: "请选择城市",
				icon: "error"
			});
			return false
		}else if(_this.data.district_index<0){
			wx.showToast({
				title: "请选择区县",
				icon: "error"
			});
			return false
		}
		let community_id = 0
		if(_this.data.recycle_community_is_required){
			if(_this.data.communityIndex <= 0){
				wx.showToast({
					icon: "none",
					title: "小区是必选的"
				})
				return
			}
		}
		if(_this.data.recycle_community_is_show && _this.data.communityIndex > 0 && _this.data.communityList[_this.data.communityIndex]){
			community_id = _this.data.communityList[_this.data.communityIndex].id
		}
		let all_address = _this.data.check_province_arr[_this.data.province_index] +
			_this.data.check_city_arr[_this.data.city_index] +
			_this.data.check_district_arr[_this.data.district_index]+
			_this.data.check_town_arr[_this.data.town_index]+
			e.detail.value.address_detail
		_this.getCoordinate(all_address, function (res) {
			let latitude = res.result.location.lat
			let longitude = res.result.location.lng
			if (_this.data.detail.id){
				api.updateAddress({
					id: _this.data.detail.id,
					name: e.detail.value.name,
					phone: e.detail.value.phone,
					address: e.detail.value.address_detail,
					is_default: e.detail.value.default ? 1 : 0,
					province: _this.data.check_province_arr[_this.data.province_index],
					city: _this.data.check_city_arr[_this.data.city_index],
					district: _this.data.check_district_arr[_this.data.district_index],
					street: _this.data.check_town_arr[_this.data.town_index],
					longitude:longitude,
					latitude:latitude,
					community_id: community_id
				}, function (res) {
					wx.showToast({
						title: "修改成功",
						icon: "none"
					})
					setTimeout(function () {
						wx.navigateBack()
					}, 900)
				})
			}else{
				api.addAddress({
					name: e.detail.value.name,
					phone: e.detail.value.phone,
					address: e.detail.value.address_detail,
					is_default: e.detail.value.default ? 1 : 0,
					province: _this.data.check_province_arr[_this.data.province_index],
					city: _this.data.check_city_arr[_this.data.city_index],
					district: _this.data.check_district_arr[_this.data.district_index],
					street: _this.data.check_town_arr[_this.data.town_index],
					longitude:longitude,
					latitude:latitude,
					community_id: community_id
				}, function (res) {
					wx.showToast({
						title: "添加成功",
						icon: "none"
					})
					setTimeout(function () {
						wx.navigateBack()
					}, 900)
				})
			}
		})
	}
});