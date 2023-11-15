// pages/recovery/recovery.js
var uploadFile = require("../../utils/uploadFile.js");
var t,
	api = require("../../utils/api"),
	app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		timeList: [],
		allTimeList: [],
		checkWeight: "",
		whiteList: [],
		slot_id: 0,
		address: {},
		last_address_id: 0,
		marker: {},
		// 大种类列表
		cateList: [],
		checkCateId: 0,
		date: "2020-07-01",
		disabled: false, //设置是否能点击 false可以 true不能点击
		startDate: "2020-01-01 00:00",
		endDate: "2025-01-01 00:00",
		placeholder: "请选择时间",
		imgList: [],
		loading: !0,
		period_interval: 1,
		// 所有小种类列表
		category: [],
		// 所有被选择的需要卖的种类列表
		needSellCategory: [],
		// 所有被选择的需要卖的种类列表
		needSellCategoryTmp: [],
		// 控制小种类抽屉是否显示的
		categoryPopupShow: false,
		showPrice: true,
		recycle_type_data: [],
		describe: "",
		canCreate: true,
		one_in: false,
		showClausePropup: 0,
		clauseContent: "",
		float_price_is_open: 0,
		appName: "",
		// 图片
		picture: [],
		message_remark: "",
		titleTop: wx.getMenuButtonBoundingClientRect().top,
		titleHeight: wx.getMenuButtonBoundingClientRect().height,
    yjsy: "0.0元",
    calendar:[],
    countTime:{
      end_time:'上门',
      id:0,
      start_time:'尽快'
    },
    dateCount:'',
    fingerpostVisible:false,
    showIndex: 10,
    questList: [{
      title: '花纸板和黄纸板放在一起卖怎么选择呢？',
      content: "添加废品的时候选择统货纸即可。",
      t:false,
    }, {
      title: '下单完成以后回收员一直未上门？',
      content: "可以咨询微信公众号人工客服催促或者拨打回收员电话联系看看",
      t:false,
    }, {
      title: '回收员称重结算以后如何支付呢？',
      content: "可以要求回收员微信支付，支付宝支付，或者现金支付。",
      t:false,
    },{
      title: '找客服一直没人回复怎么回事呢？',
      content: "由于咨询人数较多，您下单完成以后可以直接联系回收小哥。客服可能会回复比较慢。",
      t:false,
    },{
      title: '预约回收下单成功以后还需要操作什么呢',
      content: "当您预约下单成功以后，无需其他操作，您可以联系回收员，当回收员上门回收的时候也会提前联系您。",
      t:false,
    },{
      title: '家电如何回收呢？',
      content: "家电一般按台回收，例如：小冰箱多少钱一台，大冰箱多少钱一台，单开门的冰箱，双开门的冰箱价格都是不一样的，您下单选择好需要卖的废品可以上传图片，我们的回收员会给您打电话报价，确定价格没问题，我们的回收员会上门结算。",
      t:false,
    },
    {
      title: '推广员如何申请？',
      content: "可以联系公众号客服或者小程序客服，申请推广员成功将获取一张推广码，只要用户扫一下你的推广码，将终身成为你的团队成员，，只要该用户卖废品，您将获得佣金比例提成，睡觉都能赚钱。",
      t:false,
    },{
      title: '商铺/企业/街道/社区/政府如何申请合作？',
      content: "可以直接咨询微信公众号客服或者小程序客服申请合作，合作的单位价格还是很有优势的，合作的个体工商户，在合作期内免费代办营业执照，免费做工商年报。",
      t:false,
    },
    {
      title: '衣服回收怎么回收？',
      content: "添加废品的时候直接选择衣服下单即可， 脏，发霉，工作服，老人衣服，小孩开裆裤不要，其他的都要。",
      t:false,
    }]
		// communityList:[],
    // communityIndex: 0,
    
	},

	uploadAvatar: function() {
		let that = this;
		wx.chooseMedia({
			count: 9,
			mediaType: ["image"],
			sourceType: ["album", "camera"],
			sizeType: ["original", "compressed"],
			success: function(t) {
				var a = t.tempFiles.map((item) => item.tempFilePath);
				var files = that.data.picture;
				that.postimg(files, a, function(arr) {
					that.setData({
						picture: arr,
					});
				});
			},
		});
  },
  panel: function (e) {
    this.data.questList[e.currentTarget.dataset.index].t = !this.data.questList[e.currentTarget.dataset.index].t
    this.setData({
      questList:this.data.questList
    })
    if (e.currentTarget.dataset.index != this.data.showIndex) {
      this.setData({
        showIndex: e.currentTarget.dataset.index,
      })
    } 
    else {
      this.setData({
        showIndex: 10
      })
    }
  },
  goHome: function(){
    wx.switchTab({
      url:'/pages/index/index'
    })
  },
  
  setKjVal:function(val){
    if(val.target.dataset.id) {
      t.setData({
        message_remark: this.data.message_remark += val.target.dataset.id,
      });
    }
  },
  showzFingerpostDialog: function(){
    this.setData({
      fingerpostVisible:!this.data.fingerpostVisible,
		});
  },
  goPhone : function(ev){
    wx.makePhoneCall({
      phoneNumber: ev.currentTarget.dataset.phone //仅为示例，并非真实的电话号码
    })
  },
  getDay: function(){
    console.log(123)
    let days = [];
    var day = new Date();
    //明天的时间
    var day3 = new Date();
    var s3 =
      day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();
    console.log(s3);

    for(let i = 0; i <= 24 * 6; i += 24){		//144是前六天的小时数
     //明天加上明天的后6天
        // let dateItem=new Date(Date.getTime() - i * 60 * 60 * 1000);	//使用（当天）时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        let dateItem = new Date(day3.getTime() + i * 60 * 60 * 1000); //使用（第二天）时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
        let y = dateItem.getFullYear(); //获取年份
        let m = dateItem.getMonth() + 1; //获取月份js月份从0开始，需要+1
        let d = dateItem.getDate(); //获取日期
        m = this.addDate0(m); //给为单数的月份补零
        d = this.addDate0(d); //给为单数的日期补零
        let valueItem= y + '-' + m + '-' + d;	//组合
        days.push(valueItem);	//添加至数组
    }
    console.log('最近七天日期：',days);
    //将获取到的日期顺序排列
    let arr=days;
    let obj={};
    for (let key in arr) {
         obj[key] = arr[key];
     };
    let newObj = Object.keys(obj).map(val => ({
            day: obj[val]
     }));
    console.log('jbk',newObj)

    const dayArr = newObj.map((item,i) => {
      if(i == 0) {
        item.week = '今天'
      } else if(i == 1) {
        item.week = '明天'
      }else {
        item.week = this.getWeek(item.day)
      }
      item.date = item.day.split('-')[1] + '月' + item.day.split('-')[2] + '日'
      return item
    })
    console.log('最终',dayArr)
    this.setData({
      dateCount:dayArr[0].date,
			calendar: dayArr,
		});


  },
  getWeek :function(time) {
    const weekNum = new Date(time).getDay();
    let week = "";
    switch (weekNum) {
      case 0:
        week = "星期天";
        break;
      case 1:
        week = "星期一";
        break;
      case 2:
        week = "星期二";
        break;
      case 3:
        week = "星期三";
        break;
      case 4:
        week = "星期四";
        break;
      case 5:
        week = "星期五";
        break;
      case 6:
        week = "星期六";
        break;
    }
    return week;
  },
  addDate0: function(time) {
    if (time.toString().length == 1) {
      time = '0' + time.toString();
    }
    return time;
  },
	// 上传图片
	postimg: function(files, tempFilePaths, callback) {
		wx.showLoading({
			title: "上传中",
		});
		uploadFile
			.service(tempFilePaths)
			.then((results) => {
				if (files.length == 0) {
					files = results.map((item) => {
						return item.url;
					});
				} else {
					files = files.concat(
						results.map((item) => {
							return item.url;
						})
					);
				}
				callback(files);
				wx.hideLoading();
			})
			.catch(function(results) {});
	},

	closeImg(e) {
		let id = e.currentTarget.dataset.id;
		let upImg = this.data.picture;
		let newUpImg = [];
		upImg.forEach((item, index) => {
			if (index != id) {
				newUpImg.push(item);
			}
		});
		this.setData({
			picture: newUpImg,
		});
	},
	checkIn: function(e) {
		let item = e.currentTarget.dataset.item;
		let type = t.data.recycle_type_data;

		if (item.is_in) {
			for (let eKey in type) {
				if (type[eKey].id === item.id) {
					this.removeNeedSellCategory(item.id);
					type.splice(eKey, 1);
					break;
				}
			}
		} else {
			type.push({
				id: item.id,
				money: item.money,
				unit_name: item.unit_name
			});
			this.addNeedSellCategory(item.id);
		}

		t.setData({
			recycle_type_data: type
		});
		t.checkCategory();
		setTimeout(() => {
			this.updateYjsy()
		}, 0);
	},
	removeNeedSellCategory: function(id) {
		let needSellCategory;

		// 抽屉是打开的，所以只放到临时列表
		if (this.data.categoryPopupShow) {
			needSellCategory = this.data.needSellCategoryTmp;
		} else {
			needSellCategory = this.data.needSellCategory;
		}

		for (let index in needSellCategory) {
			if (needSellCategory[index].id === id) {
				needSellCategory.splice(index, 1);
				break;
			}
		}
		if (this.data.categoryPopupShow) {
			t.setData({
				needSellCategoryTmp: needSellCategory
			});
		} else {
			t.setData({
				needSellCategory: needSellCategory
			});
		}
	},
	addNeedSellCategory: function(id) {
		let category = this.data.category;
		let needSellCategory;

		// 抽屉是打开的，所以只放到临时列表
		if (this.data.categoryPopupShow) {
			needSellCategory = this.data.needSellCategoryTmp;
		} else {
			needSellCategory = this.data.needSellCategory;
		}

		for (let index in category) {
			if (category[index].id === id) {
				let needSellCategoryIds = needSellCategory.map(s => s.id);
				if (!needSellCategoryIds.includes(id)) {
					needSellCategory.push({
						...category[index],
						// 默认
						is_in: true
					});
				}
				break;
			}
		}

		if (this.data.categoryPopupShow) {
			t.setData({
				needSellCategoryTmp: needSellCategory
			});
		} else {
			t.setData({
				needSellCategory: needSellCategory
			});
		}
	},

	editDescribe: function(e) {
		t.setData({
			describe: e.detail.value,
		});
	},

	checkShowPrice: function() {
		t.setData({
			showPrice: !t.data.showPrice,
		});
	},

	toTerms: function(e) {
		wx.navigateTo({
			url: "/pages/terms/terms",
		});
	},
	bindCommunityChange: function(e) {
		this.setData({
			communityIndex: e.detail.value,
		});
	},
	bindDateChange: function(e) {
		let value = e.currentTarget.dataset.id;
		let old_value = e.currentTarget.dataset.id;
		value = value.replace(/-/g, "/"); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
		let checkData = new Date(value);
		let checkDataTime = checkData.getTime();
		let ttime = new Date();
		let nowTime =
			ttime.getFullYear() +
			"/" +
			(ttime.getMonth() + 1) +
			"/" +
			ttime.getDate();
		let nowData = new Date(nowTime);
		let nowDataTime = nowData.getTime();
		if (nowDataTime === checkDataTime) {
			t.checkData();
		} else if (nowDataTime > checkDataTime) {
			return false;
		} else if (nowDataTime < checkDataTime) {
			t.setData({
				timeList: t.data.allTimeList,
			});
		}
		t.setData({
      date: old_value,
      dateCount:old_value.split('-')[1] + '月' + old_value.split('-')[2] + '日'
		});
	},

	checkResource: function(res) {
		t.setData({
			content: res,
			modalName: "showResource",
		});
	},

	textInput: function(e) {
		let value = e.detail.value;
		t.setData({
			the_text: value,
		});
	},

	showModal: function(e) {
		this.setData({
			modalName: e.currentTarget.dataset.target,
		});
	},
	hideModal: function(e) {
		this.setData({
			modalName: null,
		});
	},

	createRecycle1: function() {
		t.createRecycle(1);
	},
	createRecycle2: function(e) {
		let type = e.currentTarget.dataset.type;
		t.setData({
			period_interval: type,
		});
		t.hideModal();
		t.createRecycle(2);
	},

	createRecycle3: function() {
		t.createRecycle(5);
	},
	onMessageRemark(e) {
		let value = e.detail.value;
		t.setData({
			message_remark: value,
		});
	},
	createRecycle: function(type) {
		if (t.data.canCreate === false) {
			wx.showToast({
				icon: "none",
				title: "请勿短时间内连续提交",
			});
			return;
		}
		t.setData({
			canCreate: false,
		});
		setTimeout(function() {
			t.setData({
				canCreate: true,
			});
		}, 8000);
		api.template(function(res) {
			let ids = [];
			for (let id of res.data.collector_order) {
				ids.push(id);
			}
			wx.requestSubscribeMessage({
				tmplIds: ids,
				success(res) {
					let opt = {};
					opt.slot_id = t.data.slot_id;
					opt.address_id = t.data.address.id;
					if (!opt.address_id) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收地址",
						});
						return;
					}
					if (t.data.recycle_type_data.length === 0) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收类型",
						});
						return;
					}
					// if(t.data.recycle_community_is_required){
					//   if(t.data.communityIndex <= 0){
					//     wx.showToast({
					//       icon: "none",
					//       title: "小区是必选的"
					//     })
					//     return
					//   }
					// }
					// if(t.data.recycle_community_is_show && t.data.communityIndex > 0 && t.data.communityList[t.data.communityIndex]){
					//   opt.community_id = t.data.communityList[t.data.communityIndex]
					// }
					opt.recycle_type_data = JSON.stringify(t.data.recycle_type_data);
					opt.type = type;
					if (type === 2) {
						opt.period_interval = t.data.period_interval;
					}
					opt.estimate_weight = t.data.checkWeight;
					if (!opt.estimate_weight) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收重量",
						});
						return;
					}
					opt.describe = t.data.describe;
					opt.message_remark = t.data.message_remark;
					opt.reservation_date = t.data.date;
					opt.picture = JSON.stringify(t.data.picture);
					wx.showLoading({
						title: "预约中,请稍后",
					});
					api.createRecycle(opt, function(res) {
						wx.hideLoading();
						wx.showToast({
							mask: true,
							duration: 2000,
							title: "预约成功",
						});
						setTimeout(function() {
							wx.switchTab({
								url: "/pages/recovery/order/order",
							});
						}, 2000);
					});
					setTimeout(function() {
						wx.hideLoading();
					}, 5000);
				},
				fail: function() {
					let opt = {};
					opt.slot_id = t.data.slot_id;
					opt.address_id = t.data.address.id;
					if (!opt.address_id) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收地址",
						});
						return;
					}
					opt.type = type;
					if (type === 2) {
						opt.period_interval = t.data.period_interval;
					}
					opt.estimate_weight = t.data.checkWeight;
					if (!opt.estimate_weight) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收重量",
						});
						return;
					}
					if (t.data.recycle_type_data.length === 0) {
						wx.showToast({
							icon: "none",
							title: "请先选择回收类型",
						});
						return;
					}
					// if(t.data.recycle_community_is_required){
					//   if(t.data.communityIndex <= 0){
					//     wx.showToast({
					//       icon: "none",
					//       title: "小区是必选的"
					//     })
					//     return
					//   }
					// }
					// if(t.data.recycle_community_is_show && t.data.communityIndex > 0 && t.data.communityList[t.data.communityIndex].id){
					//   opt.community_id = t.data.communityList[t.data.communityIndex].id
					// }
					opt.recycle_type_data = JSON.stringify(t.data.recycle_type_data);
					opt.describe = t.data.describe;
					opt.message_remark = t.data.message_remark;
					opt.reservation_date = t.data.date;

					opt.picture = JSON.stringify(t.data.picture);
					wx.showLoading({
						title: "预约中,请稍后",
					});
					api.createRecycle(opt, function(res) {
						wx.hideLoading();
						wx.showToast({
							mask: true,
							duration: 2000,
							title: "预约成功",
						});
						setTimeout(function() {
							wx.switchTab({
								url: "/pages/recovery/order/order",
							});
						}, 2000);
					});
					setTimeout(function() {
						wx.hideLoading();
					}, 5000);
				},
				complete: function(res) {},
			});
		});
	},

	onPickerChange: function(e) {
		this.setData({
			date: e.detail.dateString,
		});
	},

	checkCate: function(e) {
		// this.rollbackRecycleType();
		
		let id = e.currentTarget.dataset.id;
		t.setData({
			checkCateId: id,
			showPrice: true,
		});

		t.checkCategory();
	},

	checkCategory: function() {
		for (let cateListElement of t.data.cateList) {
			if (t.data.checkCateId === cateListElement.id) {
				let product = cateListElement.product;
				for (let productKey in product) {
					/// 不在需要默认选中第一个了
					//        if (t.one_in) {
					//          let data = t.data.recycle_type_data;
					//          data.push({
					//            id: product[productKey].id,
					//            money: product[productKey].money,
					//            unit_name: product[productKey].unit_name
					//          });
					//          t.setData({
					//            recycle_type_data: data,
					//          });
					//          t.one_in = false;
					//        } else {
					//          product[productKey]["is_in"] = false;
					//        }

					product[productKey]["is_in"] = false;
					for (let type of t.data.recycle_type_data) {
						if (type.id === product[productKey].id) {
							product[productKey]["is_in"] = true;
							break;
						}
					}
				}
				t.setData({
					category: product,
				});
			}
		}
	},

	/* 点击分类“立即添加”按钮时的事件 */
	showCategoryPopupWindow: function() {
		console.log(123);
		// 如果当前状态为隐藏，则执行显示动画
		this.setData({
			needSellCategoryTmp: []
		});
		
		const categoryWindowAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		// 如果当前状态为隐藏，则执行显示动画
		this.setData({
			categoryPopupShow: true
		});
		
		// 计算了小程序按钮的位置
		categoryWindowAnimation.height("82.5%").step();

		this.setData({
			categoryWindowAnimationData: categoryWindowAnimation.export()
		});
		
		const categoryBgAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		categoryBgAnimation.opacity(1).step();
		this.setData({
			categoryBgAnimation: categoryBgAnimation.export()
		});
	},
	
	rollbackRecycleType: function() {
		let rollbackRecycleTypeData = this.data.needSellCategory.map(s => {
			return {
		           id: s.id,
		           money: s.money,
		           unit_name: s.unit_name
		         };
		});

		this.setData({
			recycle_type_data: rollbackRecycleTypeData
		});

		t.checkCategory();
		// console.log("this.data.needSellCategory", t.data.needSellCategory);
		// console.log("this.data.recycle_type_data", this.data.recycle_type_data);
	},

	/* 选择了但又关闭了，需要回滚选择的数据 */
	closeCategoryPopupWindow: function() {
		const categoryWindowAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		categoryWindowAnimation.height(0).step();
		setTimeout(()=>{
			this.setData({
				categoryPopupShow: false
			});
		}, 300)
		this.rollbackRecycleType();
		this.setData({
			categoryWindowAnimationData: categoryWindowAnimation.export(),
			needSellCategoryTmp: []
		});
		
		const categoryBgAnimation = wx.createAnimation({
			duration: 300,
			timingFunction: 'ease'
		});
		categoryBgAnimation.opacity(0).step();
		this.setData({
			categoryBgAnimation: categoryBgAnimation.export()
		});
	},
	
	categoryProductList: function() {
		return t.data.cateList.flatMap(cate=>{
			return cate.product;
		});
	},
	
	confirmNeedSellCategory: function() {
		let data = this.categoryProductList().filter(c=>{
			return this.data.recycle_type_data.map(i=>i.id).includes(c.id)
    });
		this.setData({
			needSellCategory: data
		});
		// const categoryWindowAnimation = wx.createAnimation();
		// categoryWindowAnimation.height(0).step();
		this.setData({
			// categoryWindowAnimationData: categoryWindowAnimation.export(),
			categoryPopupShow: false
		});
		// console.log("this.data.needSellCategory", t.data.needSellCategory);
		// console.log("this.data.recycle_type_data", this.data.recycle_type_data);
	},

	toPrice: function() {
		let id = t.data.checkCateId;
		let address_id = t.data.address.id;
		if (address_id) {
			wx.navigateTo({
				url: "/pages/recovery/recoveryPrice/recoveryPrice?address_id=" +
					address_id +
					"&cate_id =" +
					id,
			});
		} else {
			wx.navigateTo({
				url: "/pages/recovery/recoveryPrice/recoveryPrice?cate_id=" + id,
			});
		}
	},

	updateYjsy() {
		const weight = t.data.checkWeight
		const a = weight.replace("kg", "").split("-")[0] * 2;
		const b = weight.replace("kg", "").split("-")[1] * 2;

		const noNum = []
		const sumNum = []
		t.data.recycle_type_data.forEach(item => {
			if (item.unit_name == "台" || item.unit_name == "件") {
				noNum.push(item.money)
			} else {
				sumNum.push(item.money)
			}
    })
    

		const sumPrice = sumNum.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
		const avg = sumPrice / sumNum.length;
    const noNumPrice = noNum.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
    
		const leftPrice = sumNum.length ?  a * avg + noNumPrice  : noNumPrice
    const rightPrice = sumNum.length ?  b * avg + noNumPrice : noNumPrice
    
    let price = sumNum.length ? `${leftPrice.toFixed(2)}元 ~ ${rightPrice.toFixed(2)}元` : noNumPrice + '元'
		t.setData({
			yjsy: price,
		});
	},

	checkWeightHandler: function(e) {
		let weight = e.currentTarget.dataset.weight;
		t.setData({
			checkWeight: weight,
		});
		setTimeout(() => {
			this.updateYjsy()
		}, 0);
	},

	checkDataHandler: function(e) {
    let id = e.currentTarget.dataset.id;
    const time = t.data.allTimeList.find(i => i.id == id)
		t.setData({
      slot_id: id,
      countTime: time
		});
	},

	checkAddress: function() {
		wx.navigateTo({
			url: "/pages/me/userAddress/userAddress",
		});
	},

	checkMarker: function() {
		wx.switchTab({
			url: "/pages/launchPoint/launchPoint",
		});
	},

	toRecoveryPrice(e) {},

	enter() {
		wx.navigateTo({
			url: "/pages/recovery/appointmentSuccessful/appointmentSuccessful",
		});
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
						data: JSON.stringify(tempAddress.data),
					},
					function(res) {
						if (res.code == 0) {
							wx.setStorageSync(
								"TEMP_ADDRESS_SAVE",
								JSON.stringify({
									time: new Date().getTime(),
									data: 1,
								})
							);
						}
					}
				);
			}
		}
	},

	checkData: function(params) {
		let e = new Date();
		let hours = e.getHours();
		let list = [];
		list.push({
			id: 0,
			start_time: "尽快",
			end_time: "上门",
		});
		for (let timeItem of t.data.timeList) {
			if (parseInt(timeItem.start_time) >= hours) {
				list.push(timeItem);
			}
		}
		if (list.length > 0) {
			t.setData({
				timeList: list,
			});
		} else {
			let selectTime =
				e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + (e.getDate() + 1);
			t.setData({
				date: selectTime,
				placeholder: selectTime,
			});
		}

	},
	htmlEscape: function(str) {
		// return text.replace(/[<>"&]/g, function(match, pos, originalText){
		//     switch(match){
		//     case "<": return "&lt;";
		//     case ">":return "&gt;";
		//     case "&":return "&amp;";
		//     case "\"":return "&quot;";
		//   }
		// });
		var temp = "";
		if (str.length == 0) return "";
		temp = str.replace(/&amp;/g, "&");
		temp = temp.replace(/&lt;/g, "<");
		temp = temp.replace(/&gt;/g, ">");
		temp = temp.replace(/&nbsp;/g, " ");
		temp = temp.replace(/&#39;/g, "'");
		temp = temp.replace(/&quot;/g, '"');
		return temp;
	},
	escape2Html: function(str) {
		var arrEntities = {
			lt: "<",
			gt: ">",
			nbsp: " ",
			amp: "&",
			quot: '"',
		};
		return str
			.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
				return arrEntities[t];
			})
			.replace(/&nbsp;/g, "\xa0");
	},
	hideClause() {
		t.setData({
			showClausePropup: 0,
		});
	},
	getAppName() {
		api.aboutUs(function(res) {
			t.setData({
				appName: res.data.name,
			});
		});
	},
	showClause() {
		api.getClause(function(res) {
			var html = t.escape2Html(res.data.recycle_clause_order);
			t.setData({
				showClausePropup: 1,
				clauseContent: html,
			});
		});
	},
	onPageScroll: function (e) {
		if (e.scrollTop === 0) {
			let footerBarAnimation = this.footerBarAnimationData;
			if (!footerBarAnimation) {
				footerBarAnimation = wx.createAnimation({
					duration: 500,
					timingFunction: 'ease'
				});
			}
			footerBarAnimation.translateY("100%").step();
			this.setData({
				footerBarAnimationData: footerBarAnimation.export()
			})
		} else {
			let footerBarAnimation = this.footerBarAnimationData;
			if (!footerBarAnimation) {
				footerBarAnimation = wx.createAnimation({
					duration: 500,
					timingFunction: 'ease'
				});
			}
			footerBarAnimation.translateY("0").step();
			this.setData({
				footerBarAnimationData: footerBarAnimation.export()
			})
		}
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		t = this;
		t.one_in = true;
		api.getWeight(function(res) {
			let weightList = [];
			for (let listElement of res.data.list) {
				let item = listElement.replace("公斤", "kg");
				weightList.push(item);
			}
			t.setData({
				weightList: weightList,
			});
			if (weightList.length > 0) {
				t.setData({
					checkWeight: weightList[0],
				});
			}
		});
		api.getCommunity({}, function(res) {
			res.data.list.unshift({
				id: 0,
				name: "请选择"
			});
			console.info("getCommunity", res.data.list);
			t.setData({
				communityList: res.data.list,
			});
		});
		api.slot(function(res) {
			let list = res.data.list;
			list.unshift({
				id: 0,
				start_time: "尽快",
				end_time: "上门",
			});
			t.setData({
				timeList: res.data.list,
				allTimeList: list,
			});
			let e = new Date();
			let selectTime =
				e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate();
        let y = e.getFullYear(); //获取年份
        let m = e.getMonth() + 1; //获取月份js月份从0开始，需要+1
        let d = e.getDate(); //获取日期
        m = t.addDate0(m); //给为单数的月份补零
        d = t.addDate0(d); //给为单数的日期补零
        let valueItem= y + '-' + m + '-' + d;	//组合
			t.setData({
				date: valueItem,
				placeholder: selectTime,
			});
			t.checkData();
		});
		t.updateTempAddress();

		setTimeout(() => {
			this.updateYjsy();
    }, 800);
    
    t.getDay()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		t.getAppName();
		let address = app.globalData.address;
		let token = wx.getStorageSync("token");

		api.pluginIsOpen(function(res) {
			t.setData({
				float_price_is_open: res.data.float_price_is_open,
				recycle_community_is_show: res.data.recycle_community_is_show,
				recycle_community_is_required: res.data.recycle_community_is_required,
			});
		});
		// 判断是否从首页分类携带ID进入
		if (app.globalData.switchId) {
			t.setData({
				checkCateId: app.globalData.switchId,
				showPrice: true,
			});
		}
		if (token) {
			if (address) {
				t.setData({
					address,
				});
				t.getClassify(address);
			} else {
				api.getAddress(function(res) {
					if (res.data.list.length > 0) {
						for (let address of res.data.list) {
							if (address.is_default === 1) {
								t.setData({
									address,
								});
								t.getClassify(address);
								break;
							}
						}
						if (!t.data.address.id) {
							t.setData({
								address: res.data.list[0],
							});
							t.getClassify(res.data.list[0]);
						}
					} else {
						t.getClassify("");
					}
				});
			}
		} else {
			t.getClassify("");
		}
		// 这里兼容自定义tab
		if (typeof this.getTabBar === "function" && this.getTabBar()) {
			this.getTabBar().setData({
				isShowTabBar: false,
			});
		}
	},

	// 获取分类
	getClassify: function(address) {
		if (address && address.id !== t.data.last_address_id) {
			t.setData({
				checkCateId: 0,
				last_address_id: address.id,
			});
		}
		api.recyclePriceUser({
				address_id: address ? address.id : 123,
			},
			function(res) {
				t.setData({
					cateList: res.data.list,
				});
				if (res.data.list.length > 0) {
					if (t.data.checkCateId === 0) {
						t.setData({
							checkCateId: res.data.list[0].id,
						});
						t.checkCategory();
					} else {
						t.checkCategory();
					}
				}
			}
		);
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {},
});