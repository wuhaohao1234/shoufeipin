// pages/recovery/recovery.js
var t, api = require("../../utils/api"),
    app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        checkWeight: "",
        address: {},
        marker: {},
        cateList: [],
        cate_id: 0,
        disabled: false, //设置是否能点击 false可以 true不能点击
        imgList: [],
        loading: !0,
        period_interval: 1,
        describe: "",
        canCreate: true
    },
    // 获取回收分类
    getList() {
        api.selfCate({}, function (res) {
            console.log('公益回收', res)
            t.setData({
                cateList: res.data.self_cate,
                cate_id: res.data.self_cate.length > 0 ? res.data.self_cate[0].cate_id : 0
            })
        })
    },

    
    editDescribe: function (e) {
        t.setData({
            describe: e.detail.value
        })
    },

    editWeight: function (e) {
        t.setData({
            estimate_weight: e.detail.value
        })
    },


    textInput: function (e) {
        let value = e.detail.value;
        t.setData({
            the_text: value
        })
        console.log(t.data.the_text)
    },

    createRecycle: function () {
        if (t.data.canCreate === false) {
            wx.showToast({
                icon: "none",
                title: "请勿短时间内连续提交"
            })
            return
        }
        t.setData({
            canCreate: false
        })
        setTimeout(function () {
            t.setData({
                canCreate: true
            })
        }, 8000)
        api.template(function (res) {
            console.log(res.data.collector_order)
            let ids = []
            for (let id of res.data.collector_order) {
                ids.push(id)
            }
            console.log(ids)
            wx.requestSubscribeMessage({
                tmplIds: ids,
                success(res) {
                    let opt = {}
                    opt.address_id = t.data.address.id;
                    if (!opt.address_id) {
                        wx.showToast({
                            icon: "none",
                            title: "请先选择回收地址"
                        })
                        return
                    }
                    
                    opt.estimate_weight = t.data.estimate_weight;
                    if (!opt.estimate_weight) {
                        wx.showToast({
                            icon: "none",
                            title: "请输入回收重量"
                        })
                        return
                    }
                    opt.cate_id = t.data.cate_id
                    if (!opt.cate_id) {
                        wx.showToast({
                            icon: "none",
                            title: "请输入选择回收类型"
                        })
                        return
                    }
                    opt.describe = t.data.describe;
                    let picture = [];
                    for (let pic of t.data.imgList) {
                        picture.push(pic.url)
                    }
                    opt.picture = JSON.stringify(picture);
                    api.createSelfOrder(opt, function (res) {
                        wx.showToast({
                            title: "预约成功"
                        })
                        setTimeout(function () {
                            wx.redirectTo({
                                url: "/pages/publicBenefit/order/order"
                            })
                        }, 1000);
                    })
                },
                fail: function () {
                    let opt = {}
                    opt.address_id = t.data.address.id;
                    if (!opt.address_id) {
                        wx.showToast({
                            icon: "none",
                            title: "请先选择回收地址"
                        })
                        return
                    }
                    
                    opt.estimate_weight = t.data.estimate_weight;
                    if (!opt.estimate_weight) {
                        wx.showToast({
                            icon: "none",
                            title: "请输入回收重量"
                        })
                        return
                    }
                    opt.cate_id = t.data.cate_id
                    if (!opt.cate_id) {
                        wx.showToast({
                            icon: "none",
                            title: "请选择回收类型"
                        })
                        return
                    }
                    opt.describe = t.data.describe;
                    let picture = [];
                    for (let pic of t.data.imgList) {
                        picture.push(pic.url)
                    }
                    opt.picture = JSON.stringify(picture);
                    wx.showLoading({
                        title: "预约中,请稍后"
                    })
                    api.createSelfOrder(opt, function (res) {


                        setTimeout(function () {
                            wx.hideLoading()
                            wx.showToast({
                                title: "预约成功"
                            })
                            wx.redirectTo({
                                url: "/pages/publicBenefit/order/order"
                            })
                        }, 1000);
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                    }, 5000)

                },
                complete: function (res) {
                    console.log(res)
                }
            })
        })


    },

    deleteImg: function (e) {
        var t = e.currentTarget.dataset.id,
            a = this.data.imgList;
        a.splice(t, 1), this.setData({
            imgList: a
        });
    },
    uplaod: function () {
        wx.chooseImage({
            count: 3,
            sizeType: ["original", "compressed"],
            success: function (tmp) {
                var a = tmp.tempFilePaths,
                    s = tmp.tempFilePaths.length,
                    d = 1;
                t.setData({
                    loading: !1
                });
                for (var n in a) wx.uploadFile({
                    url: api.serverPath + "/common/upload",
                    filePath: a[n],
                    name: "file",
                    formData: {
                        'token': wx.getStorageSync("token"),
                        'file': a[n]
                    },
                    success: function (res) {
                        var a = JSON.parse(res.data),
                            i = t.data.imgList;
                        if (i.length <= 3) {
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

    checkCate: function (e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        t.setData({
            cate_id: id
        })
    },
    checkAddress: function () {
        wx.navigateTo({
            url: "/pages/me/userAddress/userAddress"
        })
    },

    checkMarker: function () {
        wx.switchTab({
            url: "/pages/launchPoint/launchPoint"
        })
    },

    enter() {
        wx.navigateTo({
            url: "/pages/recovery/appointmentSuccessful/appointmentSuccessful"
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let address = app.globalData.address
        let token = wx.getStorageSync('token')
        var that = this
        if (token) {
            if (address) {
                t.setData({
                    address
                })
                that.getList() // 查询分类列表
            } else {
                api.getAddress(function (res) {
                    if (res.data.list.length > 0) {
                        for (let address of res.data.list) {
                            if (address.is_default === 1) {
                                t.setData({
                                    address
                                })
                                that.getList() // 查询分类列表
                                break;
                            }
                        }
                        if (!t.data.address.id) {
                            t.setData({
                                address: res.data.list[0]
                            })
                            that.getList() // 查询分类列表
                        }
                    } else {
                        that.getList() // 查询分类列表
                    }
                })
            }
        } else {
            that.getList() // 查询分类列表
        }
    }

})