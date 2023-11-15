 var serverPath = "https://www.zaishenziyuan.cn/recycle/api";
function t_request(opt, check_token = true) {

	var token = wx.getStorageSync("token");
	if (check_token && !token) {
		wx.showToast({
			title: "该功能需要登录",
			position: 'bottom',
			icon: "none"
		})
		setTimeout(function () {
			wx.hideToast();
			wx.navigateTo({
				url: "/pages/login/login"
			})
		}, 600);
		return false;
	} else {
		if (token && opt.url.indexOf('token=') === -1) {
			if (opt.url.indexOf('?') === -1) {
				opt.url += "?token=" + token;
			} else {
				opt.url += "&token=" + token;
			}
		}
		let header = {
			token: token
		}
		if (opt.method == "post"){
			header = {
				token: token,
				'content-type': 'application/x-www-form-urlencoded'
			}
		}
		wx.showNavigationBarLoading();
		wx.request({
			method: opt.method || 'GET',
			header: header,
			url: serverPath + opt.url,
			data: opt.data,
			success: function (res) {
				if (res.statusCode === 200) {
					if (res.data.code === 0 || res.data.code === 1) {
						if (opt.success) {
							opt.success(res.data);
						}
					} else if (res.data.code < 0) {
						wx.showModal({
							title: '提示',
							content: res.data.msg ,
							showCancel: false
						})
					}
				} else {

				}
			},
			fail: function () {
			},
			complete: function () {
				wx.hideNavigationBarLoading();
			}
		})
	}

}

function t_uploadFile(opt) {
	var token = wx.getStorageSync("token");
	if (opt.url.indexOf('?') === -1) {
		opt.url += "?token=" + token;
	} else {
		opt.url += "&token=" + token;
	}
	var a = opt.tempFilePaths, s = opt.tempFilePaths.length, d = 1;
	for (var n in a){
		wx.uploadFile({
			url: serverPath + opt.url,
			filePath: a[n],
			name: "file",
			success: function (t) {
				var a = JSON.parse(t.data)
				opt.imgList.push(a.data);
				if (d === s){
					opt.success(opt.imgList)
				}else{
					d+=1
				}

			}
		});
	}

}


module.exports = {
	t_request: t_request,
	t_uploadFile:t_uploadFile,
	serverPath:serverPath,
}
