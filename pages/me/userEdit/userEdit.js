// pages/me/userInfo/userInfo.js
var t, api = require("../../../utils/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        avatar: "",
        gender: "",
        second: 60,
        alreadySend: false,
        send: true,
        phone: ""
    },

    getPhoneNumber:function (res){
        console.log(res)
        let opt = {}
        opt.data = res.detail.encryptedData
        opt.iv = res.detail.iv

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
    },

    formSubmit: function (e) {
        let opt = e.detail.value;
        t.changeUser2(opt)
    },
    changeUser2: function (opt) {
        api.changeUser2(opt, function (res) {
            console.log(res)
            if (res.code === 0) {
                wx.showToast({
                    icon: "none",
                    title: "修改成功"
                })
                setTimeout(function () {
                    wx.navigateBack()
                }, 800)
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        api.getUserInfo(function (res) {
            t.setData({
                userInfo: res.data,
                avatar: res.data.avatar,
                gender: res.data.gender,
                phone: res.data.phone,
                real_name:res.data.real_name
            })
        })
        t.setData({
            uid: wx.getStorageSync("user_id")
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