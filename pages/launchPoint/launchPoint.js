// pages/launchPoint/launchPoint.js
var t, api = require("../../utils/api"),
    app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        markers: [],
        list: [],
        checkMarker: {},
        latitude: "",
        longitude: ""
    },

    checkMarker: function () {
        app.globalData.marker = t.data.checkMarker
        wx.navigateTo({
            url: "/pages/recovery/recovery"
        })
    },

    checkmarker: function () {
        t.setData({
            checkMarker: []
        })
    },

    toSite: function (e) {
        console.log(e)
        let marker = e.currentTarget.dataset.marker;
        wx.openLocation({
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
            name: marker.name,
            address: marker.address
        })
    },

    regionchange(e) {
        // console.log(e.type)
    },
    markertap(e) {
        let id = e.detail.markerId
        for (let item of t.data.list) {
            if (item.id === id) {
                console.log(item)
                let paramObj = {};
                paramObj.lng1 = item.longitude
                paramObj.lat1 = item.latitude
                paramObj.lng2 = t.data.longitude
                paramObj.lat2 = t.data.latitude
                console.log(paramObj)
                item.meter = t.checkData(paramObj)
                let location = {}
                location.longitude = item.longitude
                location.latitude = item.latitude
                api.getCityByCoor(location, function (res) {
                    item.address = res.result.address;
                    let opt = {}
                    opt.id = item.id
                    api.sitePrice(opt, function (res) {
                        item.priceList = res.data.list
                        t.setData({
                            checkMarker: item
                        })
                    })

                })
                break;
            }
        }
    },

    checkData: function (paramObj) {
        var lng1 = paramObj.lng1
        var lat1 = paramObj.lat1

        var lng2 = paramObj.lng2
        var lat2 = paramObj.lat2

        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137; // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;

        s = s * 1000

        if (isNaN(s)) {
            return 0 + 'm';
        }

        if (s > 1000) {
            //    大于1000米时
            s = Math.floor(s / 1000 * 100) / 100;
            s = s + 'km'
        } else {
            //    小于1000米直接返回
            s = s + 'm'
        }

        return s;
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
		console.log('optionsoptionsoptions',options);
        t = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
				console.log('resresresres',res);
                let opt = {}
                opt.latitude = res.latitude
                opt.longitude = res.longitude
                t.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                api.site(opt, function (res) {
							console.log('resresresres11111111',res);
							// res.data.list[0].latitude = '32.086356'
							// res.data.list[0].longitude = '112.200966'
									console.log('res.data.list',res.data.list);
							
                    let markers = []
                    for (let item of res.data.list) {
                        console.log(item)
                        let marker = {
                            iconPath: item.picture,
                            id: item.id,
                            name: item.name,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            width: 30,
                            height: 30,
                            callout: {
                                content: "姓名：" + item.name + " \n电话：" + item.phone
                            }
                        }
                        markers.push(marker)
                    }
                    t.setData({
                        markers: markers,
                        list: res.data.list
                    })
                })
            }
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
        // 这里兼容自定义tab
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
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