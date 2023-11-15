var t, api=require("../../../utils/api");
Page({
    data: {
        id:"",
        item:{},
        cateData:[],
        cate_id: '',

    },
    onLoad: function (options) {
        t = this
        t.setData({
            id:options.id
        })
        let opt = {}
        opt.shop_id = options.id
        api.shopInfo(opt, function (res) {
            t.setData({
                item:res.data
            })
        })



    },

    onShow() {
        t.setData({
            keyword:"",
            page:1,
            list:[],

        })
        t.getGoods()
        api.goodsCategory( function (res) {
            t.setData({
                cateData:res.data.list
            })
        })
    },
    checkTab: function (e) {
		let id = e.currentTarget.dataset.id;
		t.setData({
			cate_id: id,
            page:1,
            list:[],
		})
		t.getGoods()
	},


    toGoodsInfo: function (e) {
        // 商品详情页面
        // let id = e.currentTarget.dataset.id;
        // wx.navigateTo({
        //     url: "/pages/store/goodsInfo/goodsInfo?id="+id
        // })

        // 二维码页面
        wx.navigateTo({
            url: "/pages/me/storeCode/storeCode"
        })
    },
    searchGoods:function (e) {
        let val = e.detail.value

        t.setData({
            keyword:val,
        })

        t.setData({
            page:1,
            list:[],
            allowAdd:true
        })

        t.getGoods()
    },

    getGoods:function () {
        let opt = {}
        opt.page = t.data.page
        opt.shop_id = t.data.id
        opt.cid = t.data.cate_id
        opt.keyword = t.data.keyword
        api.shopGoods(opt, function (res) {
            if(res.data.list.length > 0){
                t.setData({
                    list:t.data.list.concat(res.data.list),
                    allowAdd:true
                })
            }else{
                t.setData({
                    allowAdd:false
                })
            }
        })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(t.data.allowAdd){
            t.setData({
                page:t.data.page+1
            })
            t.getGoods()
        }else{
            wx.showToast({
                title:"已无更多数据",
                icon:"none"
            })
        }
    },

});