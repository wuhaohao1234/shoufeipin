// pages/me/userInfo/userInfo.js
var t, api=require("../../../utils/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data:"",
        shop_name:"",
        picture:"",
        telephone:"",
        business_hours:"",
        address:"",
        cateData:null,
        shopCate:null,
        selCateIndex:null,
        resCateIndex:null,
        latitude:"",
        longitude:"",

    },

    editPhone:function(e){
        let val = e.detail.value;
        t.setData({
            phone:val
        })
    },

    checkMap:function () {
        wx.chooseLocation({
            success:function (res) {
                console.log(res)
                t.setData({
                    address: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude
                })
            }
        })
    },

    formSubmit:function (e) {
        console.log(e)
        let val  = e.detail.value;
        val.latitude = t.data.latitude
        val.longitude = t.data.longitude
        val.address = t.data.address;
        val.picture = t.data.picture;
        val.category_id =this.data.selCateIndex?this.data.cateData[this.data.selCateIndex].id:'';
        if (t.data.data){
            api.shopAdminUpdate(val, function (res) {
                wx.showModal({
                    showCancel:false,
                    content:"更新已提交",
                    success:function () {
                        wx.navigateBack()
                    }
                })
            })
        }else{
            api.shopApply(val, function (res) {
                wx.showModal({
                    showCancel:false,
                    content:"申請已提交",
                    success:function () {
                        wx.navigateBack()
                    }
                })
            })
        }

    },

    uploadAvatar:function(){
        let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            success: function (t) {
                var a = t.tempFilePaths, s = t.tempFilePaths.length, d = 1;
                for (var n in a) {
                    console.log(a[n])
                    wx.uploadFile({
                        url: api.serverPath+"/common/upload",
                        filePath: a[n],
                        name: "file",
                        formData:{
                            'token':wx.getStorageSync("token"),
                            'file':a[n]
                        },
                        success: function (t) {
                            var a = JSON.parse(t.data)
                            that.setData({
                                picture:a.data.url
                            })

                        }
                    });
                }
            }
        });
    },
    bindCateChange(e){
        this.setData({
            selCateIndex: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        api.mallCate2(function (res) {
            let cate = res.data.list;
            let shopCate=[]
            cate.map((item)=>{
                shopCate.push(item.name)
            })
			t.setData({
				cateData:res.data.list,
				shopCate:shopCate
			})
			 

		})
        api.shopAdminCheck({}, function (res) {
            if (res.data.audit !== "") {
                api.shopAdminInfo(function (res) {
                    let cateData = t.data.cateData;
                    let selCateIndex=null;
                    cateData.map((item,index)=>{
                        if(item.id == res.data.category_id){
                            selCateIndex=index
                        }
                    })
                    t.setData({
                        data: res.data,
                        address: res.data.address,
                        latitude: res.data.latitude,
                        longitude: res.data.longitude,
                        picture: res.data.picture,
                        resCateIndex: res.data.category_id,
                        selCateIndex:selCateIndex,
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