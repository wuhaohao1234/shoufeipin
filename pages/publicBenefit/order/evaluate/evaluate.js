// pages/recovery/order/evaluate/evaluate.js
var t;
var api = require("../../../../utils/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:"",
        level:5,
        comment:"",
        show:true
    },
    toComment:function(){
        let opt = {}
        opt.level = t.data.level
        opt.id = t.data.id
        opt.comment = t.data.comment
        api.recycleComment(opt, function (res) {
            console.log(res)
            wx.showToast({
                title:"评价成功"
            })
            setTimeout(function() {
                wx.navigateBack()
            }, 800);
        })
    },
    editLevel:function(e){
        if (t.data.show){
            let index = e.currentTarget.dataset.index
            t.setData({
                level:index+1
            })
        }

    },
    editComment:function(e){
        let val = e.detail.value
        t.setData({
            comment:val
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this
        t.setData({
            id:options.id
        })
        if (options.type){
            t.setData({
                show:false
            })
            api.recycleCommentShow({id:options.id}, function (res) {
                t.setData({
                    comment:res.data.comment,
                    level:res.data.level
                })
            })
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