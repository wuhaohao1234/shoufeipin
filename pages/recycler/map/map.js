// pages/launchPoint/launchPoint.js
import api from "../../../utils/api";

var t, app = getApp()
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
        console.log(33333)
        wx.getLocation({
            type: 'wgs84',
            success(res) {

                let id = e.detail.markerId
                console.log(id)
                console.log(t.data.list)
                for (let item of t.data.list) {
                    if (parseInt(item.id) === parseInt(id)) {
                        console.log(item)
                        let paramObj = {};
                        paramObj.lng1 = item.longitude
                        paramObj.lat1 = item.latitude
                        paramObj.lng2 = res.longitude
                        paramObj.lat2 = res.latitude
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
            }
        })

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
        s = s * 6378.137;// EARTH_RADIUS;
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

    toList: function (res) {
        wx.navigateTo({
            url: "/pages/recycler/list/list"
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        console.log(options)
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                let opt = {}
                opt.latitude = res.latitude
                opt.longitude = res.longitude
                if (options.id){
                    console.log(111111)
                    t.setData({
                        latitude: options.latitude,
                        longitude: options.longitude
                    })
                }else{
                    console.log(2222222)
                    t.setData({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                }

                api.nearbyCollector(opt, function (res) {
					console.log('resres',res);
					res.data.list[0].latitude = '32.086356'
					res.data.list[0].longitude = '112.200966'
					res.data.list[1].latitude = '32.091010'
					res.data.list[1].longitude = '112.198906'
					res.data.list[2].latitude = '32.080829'
					res.data.list[2].longitude = '112.203026'

					
                    let markers = []
                    for (let item of res.data.list) {
                        let marker = {
                            // iconPath: item.avatar,
							iconPath:'http://gchscc.zaishenziyuan.cn/%E9%99%84%E8%BF%91%E7%B4%A0%E6%9D%90/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%A8%A1%E6%9D%BF%20%285%29.png',
							id: item.id,
                            name: item.name,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            phone:item.phone,
                            width: 30,
                            height: 30,
                            callout: {
                                content: "名字：" + item.name + "\n电话：" + item.phone
                            }
                        }
                        markers.push(marker)
                    }
                    t.setData({
                        markers: markers,
                        list: res.data.list
                    })

                    if (options.id){
                        let data= {}
                        data.detail = {}
                        data.detail.markerId = options.id
                        t.markertap(data)
                    }
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