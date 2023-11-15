// pages/team/signIn/signIn.js
var t, api = require("../../../utils/api")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: {},
        userInfo: {},
        signData: {},
        taskData: []
    },
    toLogin:function () {
        wx.navigateTo({
            url:"/pages/login/login"
        })
    },
    welfareTaskGet: function (e) {
        console.log(e)
        let ident = e.currentTarget.dataset.ident;
        let opt = {}
        opt.ident = ident
        api.welfareTaskGet(opt, function (res) {
            console.log(res)
            t.getData()
        })
    },
    toUserInfo: function () {
        wx.navigateTo({
            url: "/pages/me/userInfo/userInfo"
        })
    },
    toRecovery: function () {
        wx.navigateTo({
            url: "/pages/recovery/recovery"
        })
    },
    toFriends: function () {
        wx.navigateTo({
            url: "/pages/me/userExtension/userExtension"
        })
    },

    getData: function () {

        api.welfareCheckin({}, function (res) {
            t.setData({
                data: res.data
            })
            api.welfareCheckinData({}, function (res) {
                t.setData({
                    signData: res.data
                })
            })
            api.getUserInfo(function (res) {
                t.setData({
                    userInfo: res.data
                })
            })
            api.welfareTaskData({}, function (res) {
                t.setData({
                    taskData: res.data.list
                })
            })

        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this


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
        t.getData()
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
       api.welfareTaskShare({}, function (res) {
       						setTimeout(function () {
       							t.getData()
       						}, 3000)
       					})
        return {
			title:'',
			path:'/pages/team/signIn/signIn',
            success: (res) => {
				console.log("分享成功!");
			 
            },
            fail: (res) => {
                console.log("转发失败", res);
            }
        }

    }
})