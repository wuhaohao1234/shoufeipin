// pages/shop/shopOrder/orders.js
var t, api=require("../../../utils/api");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        latitude:"",
        longitude:"",
        page:1,
        list:[],
        allowAdd:true,
        shop_name:"",
        cateData:[],
        cate_id: '',
    },
    storeDetail:function (e) {

    },


    searchStore:function (e) {
        let val = e.detail.value

        t.setData({
            shop_name:val,
        })

        t.setData({
            page:1,
            list:[],
            allowAdd:true
        })

        t.getList()
    },

    toDetail:function(e){
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
            url:"/pages/store/detail/detail?id="+id
        })
    },
    getList:function(){
        let opt = {}
        opt.page = t.data.page
        opt.latitude = t.data.latitude
        opt.longitude = t.data.longitude
        opt.shop_name = t.data.shop_name
        opt.category_id = t.data.cate_id
        api.shop(opt, function (res) {
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
    getCateData(){
        api.mallCate2(function (res) {
            t.setData({
                cateData:res.data.list,
                // cate_id:res.data.list[0].id
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
		t.getList()
	},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
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
        t.getCateData();
        wx.getLocation({
            success:function (res) {
                t.setData({
                    latitude:res.latitude,
                    longitude:res.longitude
                })
                t.setData({
                    shop_name:"",
                    page:1,
                    list:[],

                })
                t.getList()
            }
        })
        // 这里兼容自定义tab
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
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
        if(t.data.allowAdd){
            t.setData({
                page:t.data.page+1
            })
            t.getList()
        }else{
            wx.showToast({
                title:"已无更多数据",
                icon:"none"
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})