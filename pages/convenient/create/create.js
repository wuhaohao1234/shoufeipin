// pages/recovery/recovery.js
var t, api = require("../../../utils/api"), app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        convenient_id:"",
        address: {},
        date: '2020-07-01',
        disabled: false,//设置是否能点击 false可以 true不能点击
        startDate: '',
        endDate: '',
        placeholder: '请选择时间',
        imgList:[],
        loading: !0,
        user_remark:""
    },

    toTerms:function(e){
        wx.navigateTo({
            url:"/pages/terms/terms"
        })
    },

    createRecycle:function(type){
        let opt = {}
        opt.address_id = t.data.address.id;
        opt.convenient_id = t.data.convenient_id
        if (!opt.address_id){
            wx.showToast({
                icon:"none",
                title:"请先选择回收地址"
            })
            return
        }

        opt.user_remark = t.data.user_remark;
        opt.reservation_time = t.data.date
        let picture = [];
        for (let pic of t.data.imgList){
            picture.push(pic.url)
        }
        opt.user_picture = JSON.stringify(picture);
        api.convenientCreate(opt, function (res) {
            wx.showToast({
                title:"预约成功"
            })
            setTimeout(function() {
                wx.redirectTo({
                    url:"/pages/convenient/order/order"
                })
            }, 1000);
        })
    },

    deleteImg: function(e) {
        var t = e.currentTarget.dataset.id, a = this.data.imgList;
        a.splice(t, 1), this.setData({
            imgList: a
        });
    },
    uplaod: function() {
        wx.chooseImage({
            count: 3,
            sizeType: [ "original", "compressed" ],
            success: function(tmp) {
                var a = tmp.tempFilePaths, s = tmp.tempFilePaths.length, d = 1;
                t.setData({
                    loading: !1
                });
                for (var n in a) wx.uploadFile({
                    url: api.serverPath+"/common/upload",
                    filePath: a[n],
                    name: "file",
                    formData:{
                        'token':wx.getStorageSync("token"),
                        'file':a[n]
                    },
                    success: function(res) {
                        var a = JSON.parse(res.data),
                            i = t.data.imgList;
                        if (i.length <=3){
                            i.push(a.data),
                                t.setData({
                                    imgList: i
                                }), d == s && t.setData({
                                loading: !0
                            }), d += 1;
                        }

                    }
                });
            }
        });
    },

    bindDateChange: function (e) {
        console.log(e.detail);
        this.setData({
            date: e.detail.dateString
        })
    },

    checkAddress: function () {
        wx.navigateTo({
            url: "/pages/me/userAddress/userAddress"
        })
    },

    enter() {
        wx.navigateTo({
            url: "/pages/recovery/appointmentSuccessful/appointmentSuccessful"
        })
    },
    editUserRemark(e){
        let val = e.detail.value;
        t.setData({
            user_remark:val
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        let convenient_id = options.id
        t.setData({
            convenient_id
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
        let address = app.globalData.address
        if (address) {
            t.setData({
                address
            })
        } else {
            api.getAddress(function (res) {
                if (res.data.list.length > 0) {
                    for (let address of res.data.list) {
                        if (address.is_default === 1) {
                            t.setData({
                                address
                            })
                            break;
                        }
                    }
                    if (!t.data.address.id) {
                        t.setData({
                            address: res.data.list[0]
                        })
                    }
                }
            })
        }
        let e = new Date();
        let selectTime = e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + (e.getHours()) + ':' + e.getMinutes()
        let endTime
        if (e.getMonth() <= 10){
            endTime = e.getFullYear() + '-' + (e.getMonth() + 2) + '-' + e.getDate() + ' ' + (e.getHours()) + ':' + e.getMinutes()
        }else{
            endTime = (e.getFullYear()+1) + '-' + (1) + '-' + e.getDate() + ' ' + (e.getHours()) + ':' + e.getMinutes()
        }

        console.log(selectTime)
        t.setData({
            date: selectTime,
            placeholder: selectTime,
            startDate:selectTime,
            endDate:endTime
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