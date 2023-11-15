// 针对家政的API
const ajax = require('./ajax.js');

// 获取用户地址
function getAddress(success) {
	ajax.t_request({
		url: '/address/index',
		success: success
	})
}

// 经纬度获取区域
function allianceMatching(opt, success) {
	ajax.t_request({
		url: '/housework/allianceMatching',
		data: opt,
		success: success
	})
}

// 区域列表
function allianceList(opt, success) {
	ajax.t_request({
		url: '/housework/allianceList',
		data: opt,
		method: "post",
		success: success
	})
}

// 检查该区域是否开通
function checkArea(opt, success) {
	ajax.t_request({
		url: '/housework/checkArea',
		data: opt,
		method: "post",
		success: success
	})
}

// 家政服务分类
function houseworkType(opt, success) {
	ajax.t_request({
		url: '/housework/houseworkType',
		data: opt,
		method: "post",
		success: success
	})
}

//家政服务列表
function houseworkList(opt, success) {
	ajax.t_request({
		url: '/housework/housework',
		data: opt,
		method: "post",
		success: success
	})
}

//家政服务详情
function houseworkDetail(opt, success) {
	ajax.t_request({
		url: '/housework/houseworkDetail',
		data: opt,
		method: "post",
		success: success
	})
}

// 预约订单
function reservation(opt, success) {
	ajax.t_request({
		url: '/HouseworkUser/reservation',
		data: opt,
		method: "post",
		success: success
	})
}

// 订单列表
function orderList(opt, success) {
	ajax.t_request({
		url: '/HouseworkUser/order',
		data: opt,
		method: "post",
		success: success
	})
}

// 订单详情
function orderDetail(opt, success) {
	ajax.t_request({
		url: '/HouseworkUser/orderDetail',
		data: opt,
		method: "post",
		success: success
	})
}

// 家艺师详情
function housekeeperDetail(opt, success) {
	ajax.t_request({
		url: '/HouseworkUser/housekeeperDetail',
		data: opt,
		method: "post",
		success: success
	})
}

// 判断和获取家艺师信息
function getInfo(success) {
	ajax.t_request({
		url: '/HouseworkRole/getInfo',
		method: "post",
		success: success
	})
}

// 通家政加盟商列表
function getAlliance(success) {
	ajax.t_request({
		url: '/HouseworkRole/getAlliance',
		method: "post",
		success: success
	})
}

// 申请家艺师
function applyStaff(opt, success) {
	ajax.t_request({
		url: '/HouseworkRole/apply',
		data: opt,
		method: "post",
		success: success
	})
}

// 家艺师-订单列表
function staffOrderList(opt, success) {
	ajax.t_request({
		url: '/HouseworkRole/order',
		data: opt,
		method: "post",
		success: success
	})
}

// 家艺师-订单详情
function staffOrderDetail(opt, success) {
	ajax.t_request({
		url: '/HouseworkRole/orderDetail',
		data: opt,
		method: "post",
		success: success
	})
}

// 家艺师-接单
function orderTake(opt, success) {
	ajax.t_request({
		url: '/HouseworkRole/orderTake',
		data: opt,
		method: "post",
		success: success
	})
}

// 家艺师-完成订单
function orderFull(opt, success) {
	ajax.t_request({
		url: '/HouseworkRole/orderFull',
		data: opt,
		method: "post",
		success: success
	})
}

// 用户取消订单
function cancelOrder(opt, success) {
	ajax.t_request({
		url: '/HouseworkUser/cancelOrder',
		data: opt,
		method: "post",
		success: success
	})
}

module.exports = {
	cancelOrder: cancelOrder,
	getAddress: getAddress,
	allianceMatching: allianceMatching,
	allianceList: allianceList,
  checkArea: checkArea,
  houseworkType: houseworkType,
  houseworkList: houseworkList,
  houseworkDetail: houseworkDetail,
  reservation: reservation,
  orderList: orderList,
  orderDetail: orderDetail,
  housekeeperDetail: housekeeperDetail,
  getInfo: getInfo,
  getAlliance: getAlliance,
  applyStaff: applyStaff,
  staffOrderList: staffOrderList,
  staffOrderDetail: staffOrderDetail,
  orderTake: orderTake,
	orderFull: orderFull
}