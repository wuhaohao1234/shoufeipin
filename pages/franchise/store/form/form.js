// pages/franchisee/store/form/form.js
let t;
const api = require("../../../../utils/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code_number: "",
        name: "",
    },
    formSubmit: function (e) {
        let opt = {}
        opt.remark = e.detail.value.remark
        opt.money = e.detail.value.money
        opt.code_number = t.data.code_number
        if (!opt.remark || !opt.money || !opt.code_number) {
            wx.showToast({
                icon: "none",
                title: "请完整填写参数"
            })
            return
        }
        api.storeCreate(opt, function (res) {
            wx.showToast({
                title: "修改成功",
                icon: "none"
            })
            setTimeout(function () {
                wx.navigateTo({
                    url:"/pages/franchisee/store/order"
                })
            }, 900)
        })


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this
        let code_number = options.code_number
        t.setData({
            code_number
        })
        let opt = {}
        opt.code_number = code_number
        api.storeCodeUser(opt, function (res) {
            t.setData({
                name: res.data.nickname
            })
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