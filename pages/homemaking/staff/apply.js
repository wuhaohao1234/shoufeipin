var t;
var api = require("../../../utils/homemakingApi")
var uploadFile = require("../../../utils/uploadFile.js")
var dfApi = require("../../../utils/api")
Page({

  data: {
    name: null,
    phone: null,
    address: null,
    age: null,
    region: [],
    work_experience: null,
    work_start_time: null,
    work_end_time: null,
    logo_picture: [],
    certificate_picture: [],
    allianceIndex: null,
    streetList: [],
    allianceList: [], // 加盟商列表
    errorList: {
      name: '请输入您的真实姓名',
      phone: '请输入您的手机号码',
      location: '请选择省市区',
      address_street: '请选择街道',
      address: '请输入详细地址',
      age: '请输入您的年龄',
      work_experience: '请输入工作年限',
      alliance: '请选择加盟商',
      work_start_time: '请选择服务开始时间',
      work_end_time: '请选择服务结束时间',
      about: '请输入个人简介'
    }
  },

  uploadAvatar() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'], // compressed： 压缩图，original：原图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let files = that.data.logo_picture;
        let length = files.length + res.tempFilePaths.length;
        if (length > 1) {
          wxHint.showNull('最多可上传1张图片')
        } else {
          that.postimg(files, res.tempFilePaths, function (arr) {
            console.log('完成过的', arr)
            that.setData({
              logo_picture: arr
            });
          })
        }
      }
    })
  },

  uploadPicture() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed', 'original'], // compressed： 压缩图，original：原图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        let files = that.data.certificate_picture;
        console.log(res.tempFilePaths)
        let length = files.length + res.tempFilePaths.length;
        if (length > 1) {
          wxHint.showNull('最多可上传1张图片')
        } else {
          that.postimg(files, res.tempFilePaths, function (arr) {
            console.log('完成过的', arr)
            that.setData({
              certificate_picture: arr
            });
          })
        }
      }
    })
  },

  // 上传图片
  postimg: function (files, tempFilePaths, callback) {
    var that = this;
    wx.showLoading({
      title: '上传中',
    })
    var promise = uploadFile.service(tempFilePaths).then((results) => {
      if (files.length == 0) {
        files = results.map(item => {
          return item.url
        })
      } else {
        files = files.concat(results.map(item => {
          return item.url
        }))
      }
      callback(files)
      wx.hideLoading()
    }).catch(function (results) {
      console.log(results)
    })
  },

  bindAllianceChange(e) {
    t.setData({
      allianceIndex: e.detail.value
    })
  },

  bindStartTimeChange(e) {
    t.setData({
      work_start_time: e.detail.value
    })
  },

  bindEndTimeChange(e) {
    t.setData({
      work_end_time: e.detail.value
    })
  },

  bindStreetChange(e) {
    t.setData({
      address_street: e.detail.value
    })
  },

  bindRegionChange(e) {
    wx.showLoading({
      title: '加载街道中',
    })
    t.setData({
      region: e.detail.value
    })
    // streetList
    var address = e.detail.value.join('')
    if (address) {
      dfApi.getCoordinate(address, res => {
        dfApi.getTown(res.result.ad_info.adcode, streetRes => {
          console.log(streetRes)
          wx.hideLoading()
          t.setData({
            streetList: streetRes.data.list.map(item => {
              return item.name
            })
          })
        })
      })
    }
  },

  onApply(parameter) {
    api.applyStaff(parameter, res => {
      console.log(res)
      wx.showToast({
        title: '申请成功',
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    })
  },

  onSubmit(e) {
    var data = e.detail.value
    for (var i in data) {
      if (!data[i] || data[i].length === 0) {
        wx.showToast({
          icon: 'none',
          title: t.data.errorList[i],
        })
        return
      }
      if (i === 'phone' && !(/^1[3456789]\d{9}$/.test(data[i]))) {
        wx.showToast({
          icon: 'none',
          title: '手机号码格式有误',
        })
        return
      }
    }
    if (t.data.logo_picture.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请上传头像',
      })
      return
    }
    if (t.data.certificate_picture.length === 0) {
      wx.showToast({
        icon: 'none',
        title: '请上传证书',
      })
      return
    }
    var address = data.location.join('') + t.data.streetList[data.address_street] + data.address
    if (address) {
      dfApi.getCoordinate(address, res => {
        t.onApply({
          name: data.name,
          phone: data.phone,
          address_province: data.location[0],
          address_city: data.location[1],
          address_district: data.location[2],
          address_street: t.data.streetList[data.address_street],
          address: data.address,
          age: data.age,
          work_experience: data.work_experience,
          work_start_time: data.work_start_time,
          work_end_time: data.work_end_time,
          logo_picture: t.data.logo_picture[0],
          certificate_picture: t.data.certificate_picture[0],
          latitude: res.result.location.lat,
          longitude: res.result.location.lng,
          alliance_id: t.data.allianceList[data.alliance].id,
          about: data.about
        })
      })
    }
  },

  getAllianceList() {
    api.getAlliance(res => {
      console.log(res.data.list)
      t.setData({
        allianceList: res.data.list
      })
    })
  },

  onLoad: function (options) {
    t = this;
    t.getAllianceList()
  },

  onShow: function () {

  }
})