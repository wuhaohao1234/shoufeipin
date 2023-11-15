// pages/me/getUserChange/getUserChange.js
var t;
const api = require("../../../utils/api");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		money:"",
		get_money:"",
		recycle_withdraw_wechat_is_open: 0 ,
		alipay_account:'',
		// items: [
		//       {value: '0', name: '提现到银行卡',icon:'/images/yhkIcon.png'},
		// 	  {value: '1', name: '提现到微信',icon:'/images/wxIcon.png'},
		//       {value: '2', name: '提现到支付宝', icon:'/images/zfbIcon.png',checked: 'true'},
		//     ]
	},

	enterWithdrawal: function () {
		let opt = {}
		opt.money = t.data.get_money
		api.enterWithdrawal(opt, function(res) {
			console.log(res)
			wx.showToast({
				title: '提现申请已提交',
				icon: 'none',
				image: '',
				duration: 1500,
				mask: false,
				success: (result)=>{
					setTimeout(function(){
						wx.navigateBack({
							delta: 1
						});
					},1000)
				},
				fail: ()=>{},
				complete: ()=>{}
			});
		})
	},


  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }

    this.setData({
      items
    })
  },


	changeGetMoney:function(e){
		t.setData({
			get_money:e.detail.value
		})
	},
	goChangeZh:function(){
		wx.navigateTo({
			url:"/pages/me/bindAlipay/bindAlipay"
		})
	},

	getAll:function(){
		t.setData({
			get_money:t.data.money
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    console.log(options, 1233333222)
		t = this;
		let money = options.money
		t.setData({
			money
		})
		api.pluginIsOpen(function (res) {
			console.log(res)
			if(res.data.recycle_withdraw_wechat_is_open == 0){
				api.getUserInfo(function (res) {
					let userInfo = res.data
					console.log(userInfo,"*************8")
					if (userInfo.alipay_account == '' || userInfo.alipay_account == null||
						userInfo.real_name == '' || userInfo.real_name == null
					){
						wx.showModal({
							title:"綁定通知",
							content:"提现之前,请先绑定支付宝账号和真实姓名",
							showCancel:false,
							success: function () {
								wx.navigateTo({
									url:"/pages/me/bindAlipay/bindAlipay"
								})
							}
						})
					}
					else{

						t.setData({
							alipay_account:userInfo.alipay_account
						})
					}
				})
			}else{
				t.setData({
					recycle_withdraw_wechat_is_open:1
				})
			}

		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

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

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})