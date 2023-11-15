// pages/recycler/list/list.js
import api from "../../../utils/api";

let t;


Page({

    /**
     * 页面的初始数据
     */
    data: {
        markers:[],
        latitude:"",
        longitude:"",
        list:[]
    },
    toMap:function (res) {
        wx.navigateTo({
            url:"/pages/recycler/map/map"
        })
    },
    toMapOne:function (res) {
        let marker = res.currentTarget.dataset.item
        wx.navigateTo({
            url:"/pages/recycler/map/map?id="+marker.id+"&latitude="+marker.latitude+"&longitude="+marker.longitude
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        wx.getLocation({
            type: 'wgs84',
            success(res) {
                let opt = {}
                opt.latitude = res.latitude
                opt.longitude = res.longitude
                t.setData({
                    latitude: res.latitude,
                    longitude: res.longitude
                })
                api.nearbyCollector(opt, function (res) {
                    let markers = []
                    for (let item of res.data.list) {
                        let marker = {
                            iconPath: item.avatar,
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