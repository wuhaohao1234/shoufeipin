var t, api=require("../../../utils/api")
Page({
    data: {
        data:"",
        shop_name:"",
        picture:"",
        telephone:"",
        business_hours:"",
        address:"",
        latitude:"",
        longitude:"",
        order_status:"",
        page:1,
        orders:[],
        allowAdd:true
    },
     // 扫码收款
     storeScan() {
        wx.scanCode({
            success: function (res) {
                console.log(res)
                let code_number = res.result
                if (code_number) {
                    wx.navigateTo({
                        url: "/pages/franchisee/store/form/form?code_number=" + code_number
                    })
                }
            }
        })
    },
    shopGoods:function () {
        wx.navigateTo({
            url:"/pages/me/userStore/goods/goods"
        })
    },
    shopInfo:function () {
        wx.navigateTo({
            url:"/pages/store/join/join"
        })
    },
    orderRecords:function () {
        wx.navigateTo({
            url:"/pages/franchisee/store/order"
        })
    },
    shopMoney:function(){
        wx.navigateTo({
            url:"/pages/me/pointsMoney/pointsMoney"
        })
    },
    onLoad: function (options) {
        t = this;
        api.shopAdminInfo(function (res) {
            t.setData({
                data:res.data,
                address: res.data.address,
                latitude: res.data.latitude,
                longitude: res.data.longitude,
                picture:res.data.picture
            })
        })
    },

    scanOrderCode:function () {
        console.log(22222222)
        wx.scanCode({
            success (res) {
                console.log(res)

                let order_id = res.result
                let opt = {}
                opt.order_id = order_id
                api.shopAdminOrderScan(opt, function (res) {
                    wx.showModal({
                        content:"确认核销订单:"+res.data.order_no,
                        success:function (res) {
                            if (res.confirm){
                                api.shopAdminOrderConfirm(opt, function (res) {
                                    wx.showModal({
                                        content:"确认核销订单成功",
                                        success:function (res) {
                                            t.setData({
                                                order_status:1,
                                                page:1,
                                                orders:[]
                                            })
                                            t.getOrder()
                                        }
                                    })
                                })
                            }
                        }
                    })
                })
            },
            fail(res){
                console.log(res)
            }
        })
    },

    onShow() {
        t.setData({
            order_status:1,
            page:1,
            orders:[]
        })
        // t.getOrder()
    },
    getOrder:function(){
        let opt = {}
        opt.page = t.data.page
        opt.order_status = t.data.order_status
        api.shopAdminOrder(opt, function (res) {
            if(res.data.list.length > 0){
                t.setData({
                    orders:t.data.orders.concat(res.data.list),
                    allowAdd:true
                })
            }else{
                t.setData({
                    allowAdd:false
                })
            }
        })
    },

    checkTab: function (e) {
        let order_status = e.currentTarget.dataset.status
        t.setData({
            order_status,
            page:1,
            orders:[],
            allowAdd:true
        })
        t.getOrder()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(t.data.allowAdd){
            t.setData({
                page:t.data.page+1
            })
            t.getOrder()
        }else{
            wx.showToast({
                title:"已无更多数据",
                icon:"none"
            })
        }
    },
});