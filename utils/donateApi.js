// 针对捐赠的API
const ajax = require('./ajax.js');


// 列表
function donateList(opt, success) {
	ajax.t_request({
		url: '/donate/index',
		data: opt,
		method: "post",
		success: success
	})
}

// 详情
function donateDetail(opt, success) {
	ajax.t_request({
		url: '/donate/detail',
		data: opt,
		method: "post",
		success: success
	})
}

// 提交捐钱
function submitDonate(opt, success) {
	ajax.t_request({
		url: '/donate/donate',
		data: opt,
		method: "post",
		success: success
	})
}

// 排行榜
function rankingList(opt, success) {
	ajax.t_request({
		url: '/donate/ranking',
		data: opt,
		method: "post",
		success: success
	})
}

// 证书
function certificate(success) {
	ajax.t_request({
		url: '/donate/certificate',
		method: "post",
		success: success
	})
}


module.exports = {
	donateList: donateList,
	donateDetail: donateDetail,
	submitDonate: submitDonate,
	rankingList: rankingList,
	certificate: certificate
}