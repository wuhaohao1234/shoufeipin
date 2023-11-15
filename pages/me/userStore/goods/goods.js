// pages/me/userAddress/userAddress.js
let _this, api = require("../../../../utils/api");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        keyword: "",
        page: 1,
        allowAdd: true
    },
    toAddress: function (e) {
        let latitude = e.currentTarget.dataset.latitude
        let longitude = e.currentTarget.dataset.longitude
        let name = e.currentTarget.dataset.tname
        wx.openLocation({
            latitude:parseFloat(latitude),
            longitude:parseFloat(longitude),
            name:name,
        })
    },

    addData: function () {
        wx.navigateTo({
            url: "/pages/me/userStore/goods/detail/index"
        })
    },
    getData: function () {
        api.shopAdminGoodsList(function (res) {
            if (res.data.list.length > 0) {
                _this.setData({
                    list: _this.data.list.concat(res.data.list),
                    allowAdd: true
                })
            } else {
                _this.setData({
                    allowAdd: false
                })
                wx.showToast({
                    title: "没有更多数据",
                    icon: "none"
                })
            }
        })
    },

    edit: function (e) {
        let id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/me/userStore/goods/detail/index?id=" + id
        })
    },


    deleteData: function (e) {
        let id = e.currentTarget.dataset.id;
        let opt = {};
        opt.id = id;
        wx.showModal({
            "title": "删除提示",
            "content": "是否确认删除",
            "success": function (res) {
                console.log(res)
                if (res.confirm) {
                    api.shopAdminGoodsDel(opt, function () {
                        _this.setData({
                            keyword: "",
                            page: 1,
                            list:[],
                        })
                        _this.getData()
                    })
                }
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        _this = this
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
        _this.setData({
            keyword: "",
            page: 1,
            list:[],
        })
        _this.getData();
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
        // if (_this.data.allowAdd) {
        //     _this.setData({
        //         page: _this.data.page + 1
        //     })
        //     _this.getData()
        // } else {
        //     wx.showToast({
        //         title: "已无更多数据",
        //         icon: "none"
        //     })
        // }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})