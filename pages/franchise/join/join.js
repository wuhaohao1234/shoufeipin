// pages/franchise/join/join.js
var t, _this, api = require("../../../utils/api"), app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        province: "",
        city: "",
        district: "",
        latitude: "",
        longitude: "",
        province_arr: [],
        check_province_arr: [],
        province_index: -1,
        city_arr: [],
        check_city_arr: [],
        city_index: -1,
        district_arr: [],
        check_district_arr: [],
        district_index: -1,
        town_arr: [],
        check_town_arr: [],
        town_index: -1,
        allData: [],
        detail: {},
        second: 60,
        alreadySend: false,
        send: true,
        phone: ""
    },
    chooseMap:function (){
        wx.chooseLocation({
            success(res) {
                console.log(res)
                t.setData({
                    address:res.address,
                    latitude:res.latitude,
                    longitude:res.longitude,

                })
            }
        })
    },
    editPhone: function (e) {
        let val = e.detail.value;
        t.setData({
            phone: val
        })
    },

    getCode: function () {
        let opt = {}
        opt.phone = t.data.phone
        if ("" != opt.phone && "undefined" != opt.phone && /^1[3456789]\d{9}$/.test(opt.phone)) {
            api.getCode(opt, function (res) {
                wx.showToast({
                    icon: "none",
                    title: "信息已发送"
                })
                let interval = res.data.interval
                t.setData({
                    alreadySend: true,
                    send: false
                })
                t.timer()
            })
        } else {
            wx.showToast({
                icon: "none",
                title: "请正确填写手机号码"
            })
        }
    },
    timer: function () {
        let promise = new Promise((resolve, reject) => {
            let setTimer = setInterval(
                () => {
                    this.setData({
                        second: this.data.second - 1
                    })
                    if (this.data.second <= 0) {
                        this.setData({
                            second: 60,
                            alreadySend: false,
                            send: true
                        })
                        resolve(setTimer)
                    }
                }
                , 1000)
        })
        promise.then((setTimer) => {
            clearInterval(setTimer)
        })
    },

    bindProvinceChange: function (e) {
        _this.setData({
            province_index: e.detail.value,
            city_arr: [],
            check_city_arr: [],
            city_index: -1,
            district_arr: [],
            check_district_arr: [],
            district_index: -1,
            town_arr: [],
            check_town_arr: [],
            town_index: -1,
        })

        let check_province = _this.data.check_province_arr[e.detail.value]
        for (let province of _this.data.allData) {
            if (check_province === province.name) {
                _this.setData({
                    city_arr: province.child
                })
                let check_city_arr = [];
                for (let city of province.child) {
                    check_city_arr.push(city.name)
                }
                _this.setData({
                    check_city_arr
                })

            }
        }
    },
    bindCityChange: function (e) {
        _this.setData({
            city_index: e.detail.value,
            district_arr: [],
            check_district_arr: [],
            district_index: -1,
            town_arr: [],
            check_town_arr: [],
            town_index: -1,
        })
        let check_city = _this.data.check_city_arr[e.detail.value]
        for (let city of _this.data.city_arr) {
            if (check_city === city.name) {
                _this.setData({
                    district_arr: city.child
                })
                let check_district_arr = [];
                for (let item of city.child) {
                    check_district_arr.push(item.name)
                }
                _this.setData({
                    check_district_arr
                })

            }
        }
    },
    bindDistrictChange: function (e) {
        _this.setData({
            district_index: e.detail.value,
            town_arr: [],
            check_town_arr: [],
            town_index: -1,
        })
        let check_district = _this.data.check_district_arr[e.detail.value]
        for (let district of _this.data.district_arr) {
            if (check_district === district.name) {
                api.getTown(district.adcode, function (res) {
                    console.log(res)
                    _this.setData({
                        town_arr: res.data.list
                    })
                    console.log(_this.data.town_arr)
                    let check_town_arr = [];
                    for (let item of res.data.list) {
                        check_town_arr.push(item.name)
                    }
                    _this.setData({
                        check_town_arr
                    })
                })
            }
        }
    },

    formSubmit: function (e) {
        let opt = e.detail.value;
        opt.alliance_area = ""
        let picture = [];
        for (let pic of t.data.imgList) {
            picture.push(pic.url)
        }
        opt.ident_image = picture;
        // if (opt.ident_image.length !== 2) {
        //     wx.showToast({
        //         icon: "none",
        //         title: "请正确上传证件照片"
        //     })
        //     return
        // }
        opt.ident_image = JSON.stringify(opt.ident_image)
        if (!opt.name) {
            wx.showToast({
                icon: "none",
                title: "请填写姓名"
            })
            return
        }
        if (!opt.phone) {
            wx.showToast({
                icon: "none",
                title: "请填写电话号码"
            })
            return
        }
        if (!opt.address) {
            wx.showToast({
                icon: "none",
                title: "请填写地址"
            })
            return
        }
        opt.latitude = _this.data.latitude
        opt.longitude = _this.data.longitude
        opt.ident_no = '';
        // if (!opt.ident_no) {
        //     wx.showToast({
        //         icon: "none",
        //         title: "请填写身份证号"
        //     })
        //     return
        // }
        opt.province = _this.data.check_province_arr[_this.data.province_index]
        opt.city = _this.data.check_city_arr[_this.data.city_index]
        opt.district = _this.data.check_district_arr[_this.data.district_index]

        if (!opt.province) {
            wx.showToast({
                icon: "none",
                title: "请填写加盟区域"
            })
            return
        }
        if (!opt.alliance_name) {
            wx.showToast({
                icon: "none",
                title: "请填写加盟商姓名"
            })
            return
        }


                api.allianceApply(opt, function (res) {
                    console.log(res)
                    if (res.code === 0) {
                        wx.showToast({
                            icon: "none",
                            title: "申请成功"
                        })
                        setTimeout(function () {
                            wx.navigateBack()
                        }, 1200)
                    }
                })



    },

    deleteImg: function (e) {
        var t = e.currentTarget.dataset.id, a = this.data.imgList;
        a.splice(t, 1), this.setData({
            imgList: a
        });
    },
    uplaod: function () {
        wx.chooseImage({
            count: 2,
            sizeType: ["original", "compressed"],
            success: function (tmp) {
                var a = tmp.tempFilePaths, s = tmp.tempFilePaths.length, d = 1;
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
                        if (i.length < 2) {
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = _this = this;

        _this.setData({
            allData: wx.getStorageSync("allData")
        })
        let check_province_arr = [];
        for (let item of _this.data.allData) {
            check_province_arr.push(item.name)
        }
        _this.setData({
            check_province_arr
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