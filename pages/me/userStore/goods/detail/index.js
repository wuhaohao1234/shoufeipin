let _this, api = require("../../../../../utils/api");

Page({
	data: {
		id:"",
		detail: {},
		picture:"",
		cid:"",
		name:"",
		points:"",
		inventory:"",
		details:"",
		sort:"",
		status:"",
		imgList:[],
		categories:[],
		cateArr:[],
		cateArrIndex:0
	},

	deleteImg: function(e) {
		var t = e.currentTarget.dataset.id, a = this.data.imgList;
		a.splice(t, 1), this.setData({
			imgList: a
		});
	},
	uplaod: function() {
		wx.chooseImage({
			count: 3,
			sizeType: [ "original", "compressed" ],
			success: function(tmp) {
				var a = tmp.tempFilePaths, s = tmp.tempFilePaths.length, d = 1;
				_this.setData({
					loading: !1
				});
				for (var n in a) wx.uploadFile({
					url: api.serverPath+"/common/upload",
					filePath: a[n],
					name: "file",
					formData:{
						'token':wx.getStorageSync("token"),
						'file':a[n]
					},
					success: function(res) {
						var a = JSON.parse(res.data),
							i = _this.data.imgList;
						if (i.length <=3){
							i.push(a.data),
								_this.setData({
									imgList: i
								}), d == s && _this.setData({
								loading: !0
							}), d += 1;
						}

					}
				});
			}
		});
	},
	
	onLoad: function (i) {
		_this = this


		api.shopAdminGoodsCategory(function (res) {


			let cateArr = []
			let cateData = res.data.list
			let cateArrIndex = 0

			for (let item of res.data.list) {
				cateArr.push(item.name)
			}
			_this.setData({
				categories:res.data.list,
				cateArr,
				cateArrIndex
			})
			console.log("看看有没有id：",i.id)
			if (i.id){
				console.log("有id：",i.id)
				_this.setData({
					id:i.id
				})
				let opt = {}
				opt.goods_id = i.id
				api.shopGoodsDetail(opt, function (res) {
					let picture = [];
					for (let pic of res.data.picture){
						picture.push({
							url:pic
						})
					}
					_this.setData({
						detail:res.data,
						imgList:picture
					})
					let categories = cateData
					for (let k in categories) {
						console.log("res.data.cid:",res.data.cid)
						if (categories[k].id === res.data.cid){
							console.log("categories:",categories)
							console.log("kkkkkkkkkkk:",k)
							_this.setData({
								cateArrIndex:k
							})
						}
					}
				})
			}
		})

	},
	onShow() {
		// _this.getData()
	},
	bindPickerChange(e){
		this.setData({
			cateArrIndex: e.detail.value
		})
	},
	getData:function (){
		if (_this.data.id){
			api.allianceAdminSitePrice({site_id:_this.data.id},function (res) {
				_this.setData({
					list:res.data.list
				})
			})
		}
	},
	formSubmit: function (e) {
		console.log(e)
		let opt = {}
		opt.name = e.detail.value.name
		opt.status = e.detail.value.default ? 1 : 0
		if (_this.data.imgList){
			let picture = [];
			for (let pic of _this.data.imgList){
				picture.push(pic.url)
			}
			opt.picture = JSON.stringify(picture);
		}else{
			opt.picture = _this.data.detail.picture
		}
		opt.points = e.detail.value.points
		// opt.points = 0;
		opt.money = e.detail.value.money
		opt.sort = e.detail.value.sort
		opt.inventory = e.detail.value.inventory
		opt.details = e.detail.value.details
		for (let cate of _this.data.categories) {
			if (cate.name=== _this.data.cateArr[_this.data.cateArrIndex]){
				opt.cid = cate.id
			}
		}
		if (_this.data.id){
			opt.id = _this.data.id
			api.shopAdminGoodsEdit(opt, function () {
				wx.showToast({
					title: "修改成功",
					icon: "none"
				})
				setTimeout(function () {
					wx.navigateBack()
				}, 900)
			})
		}else{
			api.shopAdminGoodsAdd(opt, function () {
				wx.showToast({
					title: "添加成功",
					icon: "none"
				})
				setTimeout(function () {
					wx.navigateBack()
				}, 900)
			})
		}

	}
});