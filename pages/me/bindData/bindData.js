// pages/me/userInfo/userInfo.js
var t, api = require("../../../utils/api")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        avatar: "",
        gender: "",
        second: 60,
        alreadySend: false,
        send: true,
        phone: "",
        addressData:'',
        items: [
          {value: '1', name: '线下实体',checked: 'true'},
          {value: '2', name: '承包商' },
          {value: '3', name: '其它'}
        ],
        defAddressData:{
          province:'',
          city:'',
          district:'',
          street:'',
          longitude:'',
          latitude:''
        },
    },
    getAddress() {
      let that = this
      wx.chooseLocation({
        success: res => {
         
          that.setData({
            addressData:res.address+" "+ res.name
          })
  
          // api.getCityByCoor({
          //   longitude: res.longitude,
          //   latitude: res.latitude,
          // }, function (mapRes) {
          //   var reg = /.+?(省|市|自治区|自治州|县|区)/g;
          //   let transAddress = address.match(reg)
          //   let defAddressData = that.data.defAddressData
          //   defAddressData.longitude = res.longitude
          //   defAddressData.latitude = res.latitude
          //   defAddressData.province = transAddress[0]
          //   defAddressData.city = transAddress[1]
          //   defAddressData.district = transAddress[2]
          //   defAddressData.street = (mapRes.result && mapRes.result.address_reference && mapRes.result.address_reference.town && mapRes.result.address_reference.town.title) ? mapRes.result.address_reference.town.title : ' '
  
          //   transAddress.forEach((item, index) => {
          //     address = address.replace(transAddress[index], '')
          //   })
          //   defAddressData.address = address + " " + res.name
          //   that.setData({
          //     defAddressData: defAddressData
          //   })
          // })
  
        }
      })
    },
    getPhoneNumber:function (res){
        console.log(res)
        let opt = {}
        opt.data = res.detail.encryptedData
        opt.iv = res.detail.iv

        wx.login({
            success:function (res) {
                opt.code = res.code
                api.getPhoneNumber(opt, function (res){
                    console.log(res)
                    t.setData({
                        phone:res.data.phoneNumber
                    })
                })
            }
        })
    },
    radioChange(e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
  
      this.setData({
        items
      })
    },
    formSubmit: function (e) {
        let opt = e.detail.value;
        console.log("eeeeee:",opt)
        if(!opt.phone){
          wx.showToast({
            icon:'error',
            title: '请填写完整电话号码！',
          })
          return false
        }
        if(!opt.real_name){
          wx.showToast({
            icon:'error',
            title: '请填写姓名！',
          })
          return false
        }
        if(!this.data.addressData){
          wx.showToast({
            icon:'error',
            title: '请选择地址信息！',
          })
          return false
        }
        if(!opt.channel_type){
          wx.showToast({
            icon:'error',
            title: '请选择渠道！',
          })
          return false
        }
        t.changeUser2(opt)
    },
    changeUser2: function (opt) {
      opt.code_number=wx.getStorageSync("user_code")
      opt.address=this.data.addressData
         api.submitBindUserCode(opt, function (res) {
            console.log(res)
            if (res.code === 0) {
                wx.showToast({
                    icon: "none",
                    title: "绑定成功"
                })
                setTimeout(function () {
                    wx.navigateBack()
                }, 800)
            }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        t = this;
        api.getUserInfo(function (res) {
            // t.setData({
            //     userInfo: res.data,
            //     avatar: res.data.avatar,
            //     gender: res.data.gender,
            //     phone: res.data.phone,
            //     real_name:res.data.real_name
            // })
        })
        t.setData({
            uid: wx.getStorageSync("user_id")
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