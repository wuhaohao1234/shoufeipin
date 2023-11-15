const ajax = require('./ajax.js');
import map from "./map.js";

const map_key = "HODBZ-ZEDRP-KJ4DP-L3IOA-MK3B3-3FBMZ";

function getOpenId(code, success) {
	ajax.t_request({
		url: '/user/openid',
		data: {
			code: code
		},
		success: success
	}, false)
}

function nearbyCollector(opt, success) {
	ajax.t_request({
		url: "/recycle/nearbyCollector",
		data: opt,
		success: success
	}, false)
}

function indexPage(success) {
	ajax.t_request({
		url: '/common/index',
		success: success
	}, false)
}

function category(success) {
	ajax.t_request({
		url: '/common/guide',
		success: success
	}, false)
}

function userLogin(userInfo, success) {
	let that = this
	userInfo.openid = wx.getStorageSync('openid');
	if( userInfo.nickName){
		userInfo.nickname = userInfo.nickName;
		delete userInfo.nickName;
	}
	if( userInfo.avatarUrl){
		userInfo.avatar = userInfo.avatarUrl;
		delete userInfo.avatarUrl;
	}
	if (wx.getStorageSync("recommend_id")) {
		userInfo.recommend_id = wx.getStorageSync("recommend_id")
		wx.removeStorageSync("recommend_id")
	}
	if (!userInfo.openid) {
		console.info('wuxiang')
		wx.login({
			success(res) {
				that.getOpenId(res.code, function (res) {
					wx.setStorageSync('openid', res.data.openid);
					userInfo.openid = res.data.openid
					ajax.t_request({
						url: '/user/login',
						data: userInfo,
						success: success
					}, false)
				})
			}
		})

	} else {
		ajax.t_request({
			url: '/user/login',
			data: userInfo,
			success: success
		}, false)
	}

}

/**
 * 更新临时坐标地址
 * @param opt
 * @param success
 */
function updateTempAddress(opt, success) {
	ajax.t_request({
		url: '/user/updateTempAddress',
		method: "post",
		data: opt,
		success: success
	}, false)
}

function newsCategory(success) {
	ajax.t_request({
		url: '/news/category',
		success: success
	}, false)
}

function getNewsByCateAndPage(opt, success) {
	ajax.t_request({
		url: '/news/index',
		data: opt,
		success: success
	}, false)
}

function getNewsById(opt, success) {
	ajax.t_request({
		url: '/news/detail',
		data: opt,
		success: success
	}, false)
}

function getUserInfo(success) {

	ajax.t_request({
		url: '/user/info',
		success: success
	})
}

function uploadFile(imgList, tempFilePaths, success) {

	ajax.t_uploadFile({
		url: '/common/upload',
		imgList: imgList,
		tempFilePaths: tempFilePaths,
		success: success
	}, false)
}

function changeUser(opt, success) {
	ajax.t_request({
		url: '/user/person',
		data: opt,
		method: "post",
		success: success
	})
}

function changeUser2(opt, success) {
	ajax.t_request({
		url: '/user/bind',
		data: opt,
		method: "post",
		success: success
	})
}

function submitBindUserCode(opt, success) {
	ajax.t_request({
		url: '/user/submitBindUserCode',
		data: opt,
		method: "post",
		success: success
	})
}



function getDistrict(success) {
	ajax.t_request({
		url: '/common/district',
		success: success
	}, false)
}

function getTown(adcode, success) {
	ajax.t_request({
		url: '/common/street',
		data: {
			'adcode': adcode
		},
		success: success
	}, false)
}

function addAddress(opt, success) {
	ajax.t_request({
		url: '/address/create',
		method: "post",
		data: opt,
		success: success
	})
}

function getAddress(success) {
	ajax.t_request({
		url: '/address/index',
		success: success
	})
}

function checkDefaultAddress(opt, success) {
	ajax.t_request({
		url: '/address/default',
		data: opt,
		success: success
	})
}

function deleteAddress(opt, success) {
	ajax.t_request({
		url: '/address/remove',
		data: opt,
		success: success
	})
}

function updateAddress(opt, success) {

	ajax.t_request({
		url: '/address/update',
		method: "post",
		data: opt,
		success: success
	})
}

function mallCate(success) {
	ajax.t_request({
		url: '/mall/category',
		success: success
	})
}


function mallCommon(success) {
	ajax.t_request({
		url: '/mall/common',
		success: success
	})
}

function getGoodsByCateAndPage(opt, success) {
	ajax.t_request({
		url: '/mall/index',
		data: opt,
		success: success
	})
}


function goodsDetail(opt, success) {
	ajax.t_request({
		url: '/mall/detail',
		data: opt,
		success: success
	})
}

function mallCreate(opt, success) {
	ajax.t_request({
		url: '/mall/create',
		data: opt,
		method: "post",
		success: success
	})
}

function getShopOrder(opt, success) {
	ajax.t_request({
		url: '/mall/order',
		data: opt,
		success: success
	})
}


function getOrderById(opt, success) {
	ajax.t_request({
		url: '/mall/order_detail',
		data: opt,
		success: success
	})
}

function confirmReceipt(opt, success) {
	ajax.t_request({
		url: '/mall/confirm',
		data: opt,
		success: success
	})
}

//提现部分

function withdrawalList(opt, success) {
	ajax.t_request({
		url: '/withdraw/index',
		data: opt,
		success: success
	})
}


function getPhoneNumber(opt, success) {
	ajax.t_request({
		url: '/common/decodeNew',
		data: opt,
		success: success
	})
}

// function getPhoneNumberNew(opt, success) {
// 	ajax.t_request({
// 		url: '/common/decodeNew',
// 		data: opt,
// 		success: success
// 	})
// }


function wallet(success) {
	ajax.t_request({
		url: '/withdraw/wallet',
		success: success
	})
}

function enterWithdrawal(opt, success) {
	ajax.t_request({
		url: '/withdraw/apply',
		data: opt,
		success: success
	})
}

function recommend(success) {
	ajax.t_request({
		url: '/user/recommend',
		success: success
	})
}

function getCateByPhone(opt, success) {
	ajax.t_request({
		url: '/ai/image',
		data: opt,
		success: success
	})
}

function getCateByText(opt, success) {
	ajax.t_request({
		url: '/ai/text',
		data: opt,
		success: success
	})
}


function getWeight(success) {
	ajax.t_request({
		url: '/recycle/weight',
		method: "post",
		success: success
	}, false)
}

function getCommunity(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/recycle/community',
		method: "get",
		success: success
	}, false)
}

function getSite(opt, success) {
	ajax.t_request({
		url: '/recycle/site',
		data: opt,
		success: success
	})
}

function recyclePrice(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/recycle/price',
		success: success
	}, false)
}

function recyclePriceUser(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/recycle/priceUser',
		success: success
	}, false)
}


function createRecycle(opt, success) {
	ajax.t_request({
		url: '/recycle/create',
		method: "post",
		data: opt,
		success: success
	})
}

function getRecoveryOrder(opt, success) {
	ajax.t_request({
		url: '/recycle/order',
		data: opt,
		success: success
	})
}

function recycleDetail(opt, success) {
	ajax.t_request({
		url: '/recycle/detail',
		data: opt,
		success: success
	})
}


function slot(success) {
	ajax.t_request({
		url: '/recycle/slot',
		success: success
	}, false)
}

function getRecyclePeriod(opt, success) {
	ajax.t_request({
		url: '/recycle/period',
		data: opt,
		success: success
	})
}

function recyclePeriodList(opt, success) {
	ajax.t_request({
		url: '/recycle/periodList',
		data: opt,
		success: success
	})
}

function getCode(opt, success) {
	ajax.t_request({
		url: '/common/sms',
		data: opt,
		success: success
	})
}

function launchData(success) {
	ajax.t_request({
		url: '/common/data',
		success: success
	})
}


function collectorRegister(opt, success) {
	ajax.t_request({
		url: '/collector/register',
		data: opt,
		success: success
	})
}

function collectorIndex(success) {
	ajax.t_request({
		url: '/collector/index',
		success: success
	})
}


function collectorOrder(opt, success) {
	ajax.t_request({
		url: '/collector/order',
		data: opt,
		success: success
	})
}

function collectorOrderDetail(opt, success) {
	ajax.t_request({
		url: '/collector/detail',
		data: opt,
		success: success
	})
}


function collectorRefuse(opt, success) {
	ajax.t_request({
		url: '/collector/refuse',
		data: opt,
		success: success
	})
}

function collectorCreate(opt, success) {
	ajax.t_request({
		url: '/collector/create',
		data: opt,
		method: "post",
		success: success
	})
}

function collectorConfirm(opt, success) {
	ajax.t_request({
		url: '/collector/confirm',
		data: opt,
		success: success
	})
}

function collectorMdmCreate(opt, success) {
	ajax.t_request({
		url: '/collector/see',
		data: opt,
		method: "post",
		success: success
	})
}

function collectorStat(opt, success) {
	ajax.t_request({
		url: '/collector/stat',
		data: opt,
		method: "post",
		success: success
	})
}

function collectorTop(success) {
	ajax.t_request({
		url: '/collector/top',
		success: success
	})
}

function points(success) {
	ajax.t_request({
		url: '/user/points',
		success: success
	})
}

function money(opt, success) {
	ajax.t_request({
		url: '/user/money',
		data: opt,
		success: success
	})
}


function suggest(opt, success) {
	ajax.t_request({
		url: '/common/suggest',
		data: opt,
		success: success
	})
}

function getCity(success) {
	let m = new map({
		key: map_key
	})
	wx.getLocation({
		type: 'gcj02',
		altitude: true,
		success: (result) => {
			m.reverseGeocoder({
				location: {
					latitude: result.latitude,
					longitude: result.longitude
				},
				success: success,
				fail: function (a) {
					console.error(a);
				}
			});
		},
		fail: () => {},
		complete: () => {}
	});
}

function getCityByCoor(location, success) {
	let m = new map({
		key: map_key
	})
	m.reverseGeocoder({
		location: location,
		success: success,
		fail: function (a) {
			console.error(a);
		}
	});
}

function getCoordinate(address, success) {
	let m = new map({
		key: map_key
	})
	m.geocoder({
		address: address,
		success: success,
		fail: success
	});
}

function qrCode(opt, success) {
	ajax.t_request({
		url: '/common/code',
		data: opt,
		success: success
	})
}

function clause(success) {
	ajax.t_request({
		url: '/common/clause',
		success: success
	})
}

function aboutUs(success) {
	ajax.t_request({
		url: '/common/with',
		success: success
	}, false)
}


function bagBind(opt, success) {
	ajax.t_request({
		url: '/bag/bind',
		data: opt,
		success: success
	})
}


function site(opt, success) {
	ajax.t_request({
		url: '/site/site',
		data: opt,
		success: success
	}, false)
}

function sitePrice(opt, success) {
	ajax.t_request({
		url: '/site/price',
		data: opt,
		success: success
	}, false)
}


function userBag(opt, success) {
	ajax.t_request({
		url: '/bag/recode',
		data: opt,
		success: success
	})
}

function checkWorkStatus(opt, success) {
	ajax.t_request({
		url: '/collector/work',
		data: opt,
		success: success
	})
}


function clearOrder(opt, success) {
	ajax.t_request({
		url: '/recycle/clearOrder',
		data: opt,
		success: success
	})
}


function allianceApply(opt, success) {
	ajax.t_request({
		url: '/alliance/apply',
		data: opt,
		method: "post",
		success: success
	})
}

function collectorLocation(opt, success) {
	ajax.t_request({
		url: '/collector/location',
		data: opt,
		success: success
	})
}


function collectorGetUser(opt, success) {
	ajax.t_request({
		url: '/collector/getUser',
		data: opt,
		success: success
	})
}

function userPhone(opt, success) {
	ajax.t_request({
		url: '/user/phone',
		data: opt,
		success: success
	})
}

function bagDetail(opt, success) {
	ajax.t_request({
		url: '/bag/detail',
		data: opt,
		success: success
	})
}

function bagGetUser(opt, success) {
	ajax.t_request({
		url: '/bag/getUser',
		data: opt,
		success: success
	})
}

function storeCode(success) {
	ajax.t_request({
		url: '/shop/code',
		success: success
	})
}

function storeOrder(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/store/userOrder',
		success: success
	})
}

function storeOrderDetail(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/store/userOrder',
		success: success
	})
}

function convenientIndex(opt, success) {
	ajax.t_request({
		method: "post",
		data: opt,
		url: '/convenient/index',
		success: success
	})
}

function convenientCreate(opt, success) {
	ajax.t_request({
		method: "post",
		data: opt,
		url: '/convenient/create',
		success: success
	})
}

function convenientOrder(opt, success) {
	ajax.t_request({
		method: "post",
		data: opt,
		url: '/convenient/userOrder',
		success: success
	})
}

function convenientOrderDetail(opt, success) {
	ajax.t_request({
		method: "post",
		data: opt,
		url: '/convenient/userOrderDetail',
		success: success
	})
}

function convenientOrderClear(opt, success) {
	ajax.t_request({
		method: "post",
		data: opt,
		url: '/convenient/userOrderClear',
		success: success
	})
}

function allianceIndex(success) {
	ajax.t_request({
		url: '/alliance/index',
		success: success
	})
}

function template(success) {
	ajax.t_request({
		url: '/common/template',
		success: success
	})
}

function recycleComment(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/recycle/comment',
		success: success
	})
}

function recycleCommentShow(opt, success) {
	ajax.t_request({
		data: opt,
		url: '/recycle/commentShow',
		success: success
	})
}

/**
 * 加盟商开关商户功能
 * @param success
 */
function pluginIsOpen(success) {
	ajax.t_request({
		url: '/common/pluginIsOpen',
		success: success
	})
}

/**
 * 加盟商扫码获取用户
 * @param opt
 * @param success
 */
function storeCodeUser(opt, success) {
	ajax.t_request({
		url: '/shopAdmin/codeUser',
		data: opt,
		success: success
	})
}

function storeCreate(opt, success) {
	ajax.t_request({
		url: '/shopAdmin/create',
		data: opt,
		success: success
	})
}

/**
 * 加盟商扫码订单列表
 * @param opt
 * @param success
 */
function storeOrder2(opt, success) {
	ajax.t_request({
		url: '/store/order',
		data: opt,
		success: success
	})
}

/**
 * 用户充值
 * @param opt
 * @param success
 */
function userRecharge(opt, success) {
	ajax.t_request({
		url: '/user/recharge',
		data: opt,
		success: success
	})
}


/**
 * 回收要求
 * @param success
 */
function requirement(success) {
	ajax.t_request({
		url: '/common/requirement',
		success: success
	}, false)
}




/**
 * 团队创建
 * @param opt
 * @param success
 */
function teamCreate(opt, success) {
	ajax.t_request({
		url: '/team/create',
		data: opt,
		success: success
	})
}



/**
 * 编辑创建
 * @param opt
 * @param success
 */
function teamEdit(opt, success) {
	ajax.t_request({
		url: '/team/edit',
		data: opt,
		success: success
	})
}



/**
 * 我的团队
 * @param opt
 * @param success
 */
function teamMe(opt, success) {
	ajax.t_request({
		url: '/team/me',
		data: opt,
		success: success
	})
}


/**
 * 解散我的团队
 * @param opt
 * @param success
 */
function teamDismiss(opt, success) {
	ajax.t_request({
		url: '/team/dismiss',
		data: opt,
		success: success
	})
}


/**
 * 个人排行
 * @param opt
 * @param success
 */
function teamPersonTop(opt, success) {
	ajax.t_request({
		url: '/team/personTop',
		data: opt,
		success: success
	})
}

/**
 * 团队排行
 * @param opt
 * @param success
 */
function teamTeamTop(opt, success) {
	ajax.t_request({
		url: '/team/teamTop',
		data: opt,
		success: success
	})
}

/**
 * 签到
 * @param opt
 * @param success
 */
function welfareCheckin(opt, success) {
	ajax.t_request({
		url: '/Welfare/checkin',
		data: opt,
		success: success
	})
}

/**
 * 签到数据
 * @param opt
 * @param success
 */
function welfareCheckinData(opt, success) {
	ajax.t_request({
		url: '/Welfare/checkinData',
		data: opt,
		success: success
	})
}


/**
 * 任务数据
 * @param opt
 * @param success
 */
function welfareTaskData(opt, success) {
	ajax.t_request({
		url: '/Welfare/taskData',
		data: opt,
		success: success
	})
}

/**
 * 分享获取奖励
 * @param opt
 * @param success
 */
function welfareTaskShare(opt, success) {
	ajax.t_request({
		url: '/Welfare/taskshare',
		data: opt,
		success: success
	})
}

/**
 * 分享获取奖励
 * @param opt
 * @param success
 */
function welfareTaskGet(opt, success) {
	ajax.t_request({
		url: '/Welfare/taskGet',
		data: opt,
		success: success
	})
}

/**
 * 加入团队
 * @param opt
 * @param success
 */
function teamTeamJoin(opt, success) {
	ajax.t_request({
		url: '/team/teamJoin',
		data: opt,
		success: success
	})
}

/**
 * 退出团队
 * @param opt
 * @param success
 */
function teamQuit(opt, success) {
	ajax.t_request({
		url: '/team/quit',
		data: opt,
		success: success
	})
}


/**
 * 抽奖设置
 * @param success
 */
function lotterySetting(success) {
	ajax.t_request({
		url: '/Lottery/setting',
		success: success
	})
}


/**
 * 中奖公告
 * @param success
 */
function lotteryAnnouncement(success) {
	ajax.t_request({
		url: '/Lottery/announcement',
		success: success
	})
}


/**
 * 抽奖奖品
 * @param success
 */
function lotteryProduct(success) {
	ajax.t_request({
		url: '/Lottery/product',
		success: success
	})
}


/**
 * 抽奖開始
 * @param opt
 * @param success
 */
function lotteryDraw(opt, success) {
	ajax.t_request({
		url: '/Lottery/draw',
		data: opt,
		success: success
	})
}

/**
 * 选定地址
 * @param opt
 * @param success
 */
function lotteryLogistics(opt, success) {
	ajax.t_request({
		url: '/Lottery/logistics',
		data: opt,
		success: success
	})
}

/**
 * 中奖记录
 * @param opt
 * @param success
 */
function lotteryRecode(opt, success) {
	ajax.t_request({
		url: '/Lottery/recode',
		data: opt,
		success: success
	})
}

// 公益回收分类
function selfCate(opt, success) {
	ajax.t_request({
		url: '/recycle/selfCate',
		data: opt,
		success: success
	})
}

// 创建公益回收订单接口
function createSelfOrder(opt, success) {
	ajax.t_request({
		url: '/recycle/createSelfOrder',
		data: opt,
		success: success
	})
}

// 取消公益回收订单接口
function cancelSelfOrder(opt, success) {
	ajax.t_request({
		url: '/recycle/cancelSelfOrder',
		data: opt,
		success: success
	})
}

// 公益回收订单列表接口
function selfOrder(opt, success) {
	ajax.t_request({
		url: '/recycle/selfOrder',
		data: opt,
		success: success
	})
}

// 公益订单详情接口
function selfOrderDetail(opt, success) {
	ajax.t_request({
		url: '/recycle/selfOrderDetail',
		data: opt,
		success: success
	})
}

// 奖金记录
function userBonus(opt, success) {
	ajax.t_request({
		url: '/user/bonus',
		data: opt,
		success: success
	})
}

// 免责条款

function getClause(success) {
	ajax.t_request({
		url: '/common/clause',
		success: success
	})
}

// 排行榜
function getRanking(opt, success) {
	ajax.t_request({
    url: '/Charts/lists',
    data: opt,
		success: success
	})
}


module.exports = {
  getRanking: getRanking,
	lotteryRecode: lotteryRecode,
	lotteryLogistics: lotteryLogistics,
	lotteryDraw: lotteryDraw,
	lotteryProduct: lotteryProduct,
	lotteryAnnouncement: lotteryAnnouncement,
	lotterySetting: lotterySetting,
	teamEdit: teamEdit,
	teamQuit: teamQuit,
	teamTeamJoin: teamTeamJoin,
	welfareTaskGet: welfareTaskGet,
	welfareTaskShare: welfareTaskShare,
	welfareTaskData: welfareTaskData,
	welfareCheckinData: welfareCheckinData,
	welfareCheckin: welfareCheckin,
	teamTeamTop: teamTeamTop,
	teamPersonTop: teamPersonTop,
	teamDismiss: teamDismiss,
	teamMe: teamMe,
	teamCreate: teamCreate,
	requirement: requirement,
	nearbyCollector: nearbyCollector,
	recyclePriceUser: recyclePriceUser,
	userRecharge: userRecharge,
	storeCodeUser: storeCodeUser,
	storeCreate: storeCreate,
	storeOrder2: storeOrder2,
	pluginIsOpen: pluginIsOpen,
	recycleCommentShow: recycleCommentShow,
	recycleComment: recycleComment,
	template: template,
	allianceIndex: allianceIndex,
	convenientOrderClear: convenientOrderClear,
	convenientOrderDetail: convenientOrderDetail,
	convenientOrder: convenientOrder,
	convenientCreate: convenientCreate,
	convenientIndex: convenientIndex,
	storeOrderDetail: storeOrderDetail,
	storeOrder: storeOrder,
	storeCode: storeCode,
	bagGetUser: bagGetUser,
	bagDetail: bagDetail,
	userPhone: userPhone,
	collectorGetUser: collectorGetUser,
	collectorLocation: collectorLocation,
	launchData: launchData,
	allianceApply: allianceApply,
	serverPath: ajax.serverPath,
	collectorOrderDetail: collectorOrderDetail,
	clearOrder: clearOrder,
	checkWorkStatus: checkWorkStatus,
	userBag: userBag,
	getCityByCoor: getCityByCoor,
	site: site,
	sitePrice: sitePrice,
	bagBind: bagBind,
	slot: slot,
	points: points,
	money: money,
	suggest: suggest,
	getOpenId: getOpenId,
	indexPage: indexPage,
	userLogin: userLogin,
	category: category,
	newsCategory: newsCategory,
	getNewsByCateAndPage: getNewsByCateAndPage,
	getNewsById: getNewsById,
	getUserInfo: getUserInfo,
	uploadFile: uploadFile,
	changeUser: changeUser,
	getDistrict: getDistrict,
	getTown: getTown,
	addAddress: addAddress,
	getAddress: getAddress,
	checkDefaultAddress: checkDefaultAddress,
	deleteAddress: deleteAddress,
	updateAddress: updateAddress,
	mallCate: mallCate,
	mallCommon: mallCommon,
	getGoodsByCateAndPage: getGoodsByCateAndPage,
	goodsDetail: goodsDetail,
	mallCreate: mallCreate,
	getShopOrder: getShopOrder,
	getOrderById: getOrderById,
	confirmReceipt: confirmReceipt,
	withdrawalList: withdrawalList,
	wallet: wallet,
	enterWithdrawal: enterWithdrawal,
	recommend: recommend,
	getCateByPhone: getCateByPhone,
	getCateByText: getCateByText,
	getWeight: getWeight,
	getCommunity: getCommunity,
	getSite: getSite,
	recyclePrice: recyclePrice,
	createRecycle: createRecycle,
	getRecoveryOrder: getRecoveryOrder,
	recycleDetail: recycleDetail,
	getRecyclePeriod: getRecyclePeriod,
	recyclePeriodList: recyclePeriodList,
	getCode: getCode,
	collectorRegister: collectorRegister,
	collectorIndex: collectorIndex,
	collectorOrder: collectorOrder,
	collectorRefuse: collectorRefuse,
	collectorCreate: collectorCreate,
	collectorConfirm: collectorConfirm,
	collectorMdmCreate: collectorMdmCreate,
	collectorStat: collectorStat,
	collectorTop: collectorTop,
	getCity: getCity,
	getCoordinate: getCoordinate,
	qrCode: qrCode,
	clause: clause,
	aboutUs: aboutUs,
	getPhoneNumber: getPhoneNumber,
	// getPhoneNumberNew: getPhoneNumberNew,
	changeUser2: changeUser2,
  submitBindUserCode:submitBindUserCode,
	// 公益回收
	selfCate: selfCate,
	createSelfOrder: createSelfOrder,
	cancelSelfOrder: cancelSelfOrder,
	selfOrder: selfOrder,
	selfOrderDetail: selfOrderDetail,
	// 奖金记录
	userBonus: userBonus,
	getClause: getClause,
	//wxi
	updateTempAddress:updateTempAddress
}

module.exports.mallCate2 = function (success) {
	ajax.t_request({
		url: '/shop/category',
		success: success
	})
}

/**
 * 附近门店
 * @param opt
 * @param success
 */
module.exports.shop = function (opt, success) {
	ajax.t_request({
		url: '/Shop/shop',
		data: opt,
		success: success
	})
}

module.exports.shopInfo = function (opt, success) {
	ajax.t_request({
		url: '/Shop/shopInfo',
		data: opt,
		success: success
	})
}

module.exports.shopGoods = function (opt, success) {
	ajax.t_request({
		url: '/Shop/shopGoods',
		data: opt,
		success: success
	})
}

module.exports.goodsCategory = function (success) {
	ajax.t_request({
		url: '/shop/shopGoodsCategory',
		success: success
	})
}

module.exports.shopAdminInfo = function (success) {
	ajax.t_request({
		url: '/ShopAdmin/info',
		success: success
	})
}

module.exports.shopApply = function (opt, success) {
	ajax.t_request({
		url: '/shop/apply',
		data: opt,
		success: success
	})
}

module.exports.shopAdminCheck = function (opt, success) {
	ajax.t_request({
		url: '/ShopAdmin/check',
		data: opt,
		success: success
	})
}

module.exports.commonConvert = function (opt, success) {
	ajax.t_request({
		url: '/common/convert',
		data: opt,
		success: success
	})
}

module.exports.pointsMoneyRadio = function (success) {
	ajax.t_request({
		url: '/common/pointsMoneyRadio',
		success: success
	})
}

module.exports.shopAdminGoodsCategory = function (success) {
	ajax.t_request({
		url: '/ShopAdmin/goodsCategory',
		success: success
	})
}

module.exports.shopAdminGoodsList = function (success) {
	ajax.t_request({
		url: '/ShopAdmin/goodsList',
		success: success
	})
}

/**
 * 门店商品添加
 * @param opt
 * @param success
 */
module.exports.shopAdminGoodsAdd = function (opt, success) {
	ajax.t_request({
		url: '/ShopAdmin/goodsAdd',
		data: opt,
		success: success
	})
}

/**
 * 门店商品编辑
 * @param opt
 * @param success
 */
module.exports.shopAdminGoodsEdit = function (opt, success) {
	ajax.t_request({
		url: '/ShopAdmin/goodsEdit',
		data: opt,
		success: success
	})
}


/**
 * 门店商品刪除
 * @param opt
 * @param success
 */
module.exports.shopAdminGoodsDel = function (opt, success) {
	ajax.t_request({
		url: '/ShopAdmin/goodsDel',
		data: opt,
		success: success
	})
}



/**
 * 门店商品詳情
 * @param opt
 * @param success
 */
module.exports.shopGoodsDetail = function (opt, success) {
	ajax.t_request({
		url: '/Shop/goodsDetail',
		data: opt,
		success: success
	})
}

module.exports.storeOrderNew = function (opt, success) {
	ajax.t_request({
		url: '/shopAdmin/orderNew',
		data: opt,
		success: success
	})
}

module.exports.shopAdminUpdate = function (opt, success) {
	ajax.t_request({
		url: '/ShopAdmin/update',
		data: opt,
		success: success
	})
}

module.exports.pluginIsOpen = function ( success) {
	ajax.t_request({
		url: '/common/pluginIsOpen',
		success: success
	},false)
}

module.exports.bindUserCode = function ( opt, success, check_token = false) {
	ajax.t_request({
    url: '/user/bindUserCode',
    data: opt,
		success: success
	},check_token)
}