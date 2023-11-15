// pages/convenience/convenience/index.js
const a = getApp();
const api = require("../../../utils/api")
let t;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            {
                id: 1,
                name: "ceshi",
                tag: "XXXXXX",
                background: "#efefef",
                img: "http://himg.bdimg.com/sys/portrait/item/0cc2e4b88ae5b1b1e68993e6a5bce4b8bbdf1d.jpg"
            },
            {
                id: 1,
                name: "ceshi",
                tag: "XXXXXX",
                background: "#e3e6ee",
                img: "http://himg.bdimg.com/sys/portrait/item/0cc2e4b88ae5b1b1e68993e6a5bce4b8bbdf1d.jpg"
            }
        ]
    },

    create: function (e) {
        console.log(e)
        let id = e.currentTarget.dataset.id
        if (id) {
            wx.navigateTo({
                url: '/pages/convenient/create/create?id=' + id + "&name=" + e.currentTarget.dataset.name,
            })
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this
        let selfAddress = wx.getStorageSync("selfAddress")
        t.setData({
            selfAddress:selfAddress
        })
        let opt = {}
        opt.province = selfAddress.address_component.province
        opt.city = selfAddress.address_component.city
        opt.district = selfAddress.address_component.district
        opt.street = selfAddress.address_component.street
        opt.latitude = selfAddress.location.lat
        opt.longitude = selfAddress.location.lng
        api.convenientIndex(opt, function (res) {
            t.setData({
                list:res.data.list
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