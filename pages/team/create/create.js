// pages/team/create/create.js
var t, api=require("../../../utils/api")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        team_name: "",
        team_avatar: ""
    },
    enterData:function (res){
        if (!t.data.team_avatar || !t.data.team_name){
            wx.showToast({
                icon:"none",
                title:"请填写完整"
            })
            return false
        }

        let opt = {}
        opt.team_name = t.data.team_name
        opt.team_avatar = t.data.team_avatar

        if (t.data.type == "edit"){
            api.teamEdit(opt, function (res){
                console.log(res)
                wx.showModal({
                    showCancel:false,
                    content:"编辑团队成功",
                    success:function (res) {
                        wx.navigateBack()
                    }
                })
            })
        }else{
            api.teamCreate(opt, function (res){
                console.log(res)
                wx.showModal({
                    showCancel:false,
                    content:"创建团队成功",
                    success:function (res) {
                        wx.navigateBack()
                    }
                })
            })
        }
    },

    editName:function (res){
        let val = res.detail.value
        t.setData({
            team_name:val
        })
    },

    uploadImg: function () {
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            success: function (t) {
                var a = t.tempFilePaths, s = t.tempFilePaths.length, d = 1;
                for (var n in a) {
                    console.log(a[n])
                    wx.uploadFile({
                        url: api.serverPath + "/common/upload",
                        filePath: a[n],
                        name: "file",
                        formData: {
                            'token': wx.getStorageSync("token"),
                            'file': a[n]
                        },
                        success: function (t) {
                            var a = JSON.parse(t.data)
                            that.setData({
                                team_avatar: a.data.url
                            })

                        }
                    });
                }
            }
        });
    },

    getData:function () {
        api.teamMe({}, function (res) {
            t.setData({
                team:res.data,
                team_name: res.data.team_name,
                team_avatar: res.data.team_avatar
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this
        if (options.type){
            t.setData({
                type:"edit"
            })
            t.getData()

        }
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