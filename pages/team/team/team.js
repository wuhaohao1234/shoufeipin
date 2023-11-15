// pages/team/team/team.js
// pages/me/userCode/userCode.js
var t, api=require("../../../utils/api"), app = getApp();
const qrcode = require('../../../libs/qrcode/index');
Page({



    /**
     * 页面的初始数据
     */
    data: {
        team:{},
        is_team:false,
        is_head:false,
        img:"",
        modalName:null
    },
    scanTeamCode:function (res) {
        wx.scanCode({
            success:function (res) {
                console.log(res)
                let team_id = res.result
                let opt = {}
                opt.team_id = team_id
                api.teamTeamJoin(opt, function (res) {
                    t.getData()
                })
            }
        })
    },
    showImage:function () {
        t.setData({
            modalName:"img"
        })
    },
    hideModal:function () {
        t.setData({
            modalName:null
        })
    },
    //绘制二维码
    drawQrcode(params) {
        let img = qrcode.outputQRCodeBase64(params, {
            size: t.data.size,
            color: '#000000',
            padding: 16,
            background: '#ffffff'
        });
        t.setData({
            img
        })
    },
    createTeam: function () {
        wx.navigateTo({
            url: "/pages/team/create/create"
        })
    },

    editTeam:function () {
        wx.navigateTo({
            url: "/pages/team/create/create?type=edit"
        })
    },

    teamDismiss:function () {
        wx.showModal({
            content:"确认解散团队吗?",
            success(res) {
                if (res.confirm){
                    api.teamDismiss({}, function (res) {
                        console.log(res)
                        wx.showModal({
                            showCancel:false,
                            content:"解散团队成功",
                            success:function (res) {
                                wx.navigateBack()
                            }
                        })
                    })
                }
            }
        })

    },

    quitTeam:function () {
        wx.showModal({
            content:"确认退出团队吗?",
            success(res) {
                if (res.confirm){
                    api.teamQuit({}, function (res) {
                        console.log(res)
                        wx.showModal({
                            showCancel:false,
                            content:"退出团队成功",
                            success:function (res) {
                                wx.navigateBack()
                            }
                        })
                    })
                }
            }
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
        api.getUserInfo(function (res) {

            t.setData({
                userInfo: res.data
            })

            wx.setStorageSync("userInfo", res.data)
            t.getData()
        })

    },

    getData:function () {
        api.teamMe({}, function (res) {

            let data = res.data.detail
            let new_data = []
            for (let datum of data) {
                datum.create_at = datum.create_at.split(" ")[0]
                console.log(datum)
                new_data.push(datum)
                if (datum.type == 1){
                    let uid = wx.getStorageSync("user_id")
                    if (uid == datum.user_id){
                        t.setData({
                            is_head:true
                        })
                    }
                }

            }

            res.data.detail = new_data

            t.setData({
                team:res.data,
                is_team:true
            })
            console.log(t.data.team.team_id)
            t.drawQrcode(t.data.team.team_id.toString())

        })
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