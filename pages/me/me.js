// pages/me/me.js
var _this,
  api = require("../../utils/api"),
  homeApi = require("../../utils/homemakingApi");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    uid: "",
    realAvatar: "",
    nickName: "",
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    showUpdateDialog: false,
    showDraw: false,
    isStaff: false,
    isStaffType: null,
    navList: [{
        name: "预约订单",
        url: "/pages/recovery/order/order",
        icon: "https://cdn.wuhuit.com/fths/check/check1.png",
      },
      {
        name: "定期订单",
        url: "/pages/recovery/period/period",
        icon: "https://cdn.wuhuit.com/fths/check/check2.png",
      },
      {
        name: "推广赚钱",
        url: "/pages/me/userExtension/userExtension",
        icon: "https://cdn.wuhuit.com/fths/check/check3.png",
      },
      {
        name: "我的钱包",
        url: "/pages/me/userChange/userChange",
        icon: "https://cdn.wuhuit.com/fths/check/check4.png",
      },
    ],
    orderList: [{
        name: "商城订单",
        url: "/pages/shop/shopOrder/shopOrder",
        icon: "https://cdn.wuhuit.com/fths/my/icon_order.png",
      },
      {
        name: "付款记录",
        url: "/pages/me/storeOrder/storeOrder",
        icon: "https://cdn.wuhuit.com/fths/my/icon_order1.png",
      },
      {
        name: "金额明细",
        url: "/pages/me/moneyDetails/moneyDetails",
        icon: "https://cdn.wuhuit.com/fths/my/icon_order2.png",
      },
      {
        name: "积分明细",
        url: "/pages/shop/pointsDetails/pointsDetails",
        icon: "https://cdn.wuhuit.com/fths/my/icon_order3.png",
      },
      {
        name: "环保袋记录",
        url: "/pages/me/userBag/userBag",
        icon: "https://cdn.wuhuit.com/fths/my/icon_order4.png",
      },
    ],
    serveList: [{
        name: "公益列表",
        url: "/pages/donate/ranking/ranking",
        icon: "https://cdn.wuhuit.com/fths/my/icon_serve2.png",
      },
      {
        name: "立刻签到",
        url: "/pages/team/signIn/signIn",
        icon: "https://cdn.wuhuit.com/fths/my/icon_serve3.png",
      },
    ],
    settingList: [{
        name: "地址管理",
        url: "/pages/me/userAddress/userAddress",
        icon: "https://cdn.wuhuit.com/fths/my/icon_setting1.png",
      },
      {
        name: "联系客服",
        url: "serve",
        icon: "https://cdn.wuhuit.com/fths/my/icon_setting2.png",
      },
      {
        name: "问题反馈",
        url: "/pages/me/problemFeedback/problemFeedback",
        icon: "https://cdn.wuhuit.com/fths/my/icon_setting3.png",
      },
      {
        name: "关于我们",
        url: "/pages/me/aboutUs/aboutUs",
        icon: "https://cdn.wuhuit.com/fths/my/icon_setting4.png",
      },
    ],
    hzshow: false,

    zsshow: false
  },
  onCopy(e) {
    let id = "bianhaihong5201314"
    wx.setClipboardData({
      data: id,
    })
    wx.showToast({
      icon: "none",
      title: "复制成功",
    });
  },
  // 跳转URL
  goto(e) {
    console.log('jumpUrl', e);
    var jumpUrl = e.currentTarget.dataset.url;
    console.log(jumpUrl);
    if (jumpUrl == '/pages/recovery/order/order' || jumpUrl == '/pages/me/ranking/index') {
      wx.switchTab({
        url: jumpUrl,
      });
    } else {
      wx.navigateTo({
        url: jumpUrl,
      });
    }

  },
  // 当面回收
  toUserCode() {
    wx.navigateTo({
      url: "/pages/me/userCode/userCode",
    });
  },
  kfClick(){
    wx.openCustomerServiceChat({
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfc6369209f095342eb' 
      },
      corpId: 'ww7e84823e74f6682a', //企业微信ID
      success(res) {
        console.log(res)
      },fail(err) {
        console.log(err)
      }
    })

  },
  toranking() {
    wx.switchTab({
      url: "/pages/me/ranking/index",
    });
  },

  // 编辑
  editUserInfo: function () {
    wx.navigateTo({
      url: "/pages/me/userInfo/userInfo",
    });
  },

  handleZsshow() {
    this.setData({
      zsshow: true
    })
  },
  handleZsHide() {
    this.setData({
      zsshow: false
    })
  },

  handleHzshow() {
    this.setData({
      hzshow: true
    })
  },
  handleHzHide() {
    this.setData({
      hzshow: false
    })
  },

  toJfmx: function () {
    wx.navigateTo({
      url: "/pages/me/pointsMoney/pointsMoney",
    });
  },

  toJemx: function () {
    wx.navigateTo({
      url: "/pages/me/moneyDetails/moneyDetails",
    });
  },

  toTx: function () {
    wx.navigateTo({
      url: "/pages/me/getUserChange/getUserChange?money=" + this.data.userInfo.money,
    });
  },

  toServe: function () {
    wx.makePhoneCall({
      phoneNumber: '18551014057', // 替换为要拨打的电话号码
      success: function () {
        console.log('拨打电话成功！');
      },
      fail: function () {
        console.log('拨打电话失败！');
      }
    });
  },

  // 授权
  toLogin: function () {
    wx.navigateTo({
      url: "/pages/login/login",
    });
  },

  // 扫码收款
  storeScan() {
    wx.scanCode({
      success: function (res) {
        console.log(res);
        let code_number = res.result;
        if (code_number) {
          wx.navigateTo({
            url: "/pages/franchisee/store/form/form?code_number=" + code_number,
          });
        }
      },
    });
  },
  // 申请家政
  onApply() {
    if (!_this.data.isStaff) {
      wx.redirectTo({
        url: "/pages/homemaking/staff/apply",
      });
    } else {
      if (_this.data.isStaffType === 0) {
        wx.showToast({
          icon: "none",
          title: "您的申请正在审核中，请耐心等待。",
        });
      }
      if (_this.data.isStaffType === 2) {
        wx.showToast({
          icon: "none",
          title: "您的审核未通过，如有疑问请联系客服～",
        });
      }
    }
  },
  onLoad() {
    let token = wx.getStorageSync("token");
    _this = this;
    // console.log(token)
    if (!token) {
      api.userLogin({}, function (res) {
        wx.setStorageSync("token", res.data.token);
        wx.setStorageSync("user_id", res.data.user_id);
        api.getUserInfo(function (res) {
          console.log(res);
          _this.setData({
            userInfo: res.data,
          });
          _this.setData({
            realAvatar: res.data.avatar,
            nickName: res.data.nickname,
          });
          wx.setStorageSync("userInfo", res.data);
        });
        _this.setData({
          uid: wx.getStorageSync("user_id"),
        });
        // 判断是否是家艺师
        homeApi.getInfo((res) => {
          console.log("家艺师", res.data);
          if (res.data && res.data.id) {
            _this.setData({
              isStaff: true,
              isStaffType: res.data.audit,
            });
          }
        });
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    _this = this;
    let token = wx.getStorageSync("token");
    if (token) {
      api.getUserInfo(function (res) {
        console.log(res);
        _this.setData({
          userInfo: res.data,
        });
        _this.setData({
          realAvatar: res.data.avatar,
          nickName: res.data.nickname,
        });
        wx.setStorageSync("userInfo", res.data);
      });
      _this.setData({
        uid: wx.getStorageSync("user_id"),
      });
      // 判断是否是家艺师
      homeApi.getInfo((res) => {
        console.log("家艺师", res.data);
        if (res.data && res.data.id) {
          _this.setData({
            isStaff: true,
            isStaffType: res.data.audit,
          });
        }
      });
    }

    // api.lotterySetting(function (res) {
    //     if (res.data.recycle_lottery_is_open) {
    //         _this.setData({
    //             showDraw: true
    //         })
    //     }
    // })
    // 这里兼容自定义tab
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4,
      });
    }
  },
  showDialog() {
    this.setData({
      showUpdateDialog: true,
    });
  },
  onChooseAvatar(e) {
    const {
      avatarUrl
    } = e.detail;
    var that = this;
    wx.uploadFile({
      url: api.serverPath + "/common/upload",
      filePath: avatarUrl,
      name: "file",
      header: {
        "Content-Type": "multipart/form-data",
      },
      success: function (t) {
        var a = JSON.parse(t.data);
        that.setData({
          realAvatar: a.data.url,
        });
      },
    });
  },
  editNickName(e) {
    var that = this;
    that.setData({
      nickName: e.detail.value,
    });
  },
  updateUserInfo: function (e) {
    let that = this;
    let userInfo = {};
    if (this.data.realAvatar) {
      userInfo.avatarUrl = this.data.realAvatar;
    }
    const {
      nickname
    } = e.detail.value;
    if (nickname) {
      userInfo.nickName = nickname;
    }

    api.userLogin(userInfo, function (res) {
      wx.setStorageSync("token", res.data.token);
      wx.setStorageSync("user_id", res.data.user_id);
      api.getUserInfo(function (res) {
        console.log(res);
        _this.setData({
          userInfo: res.data,
        });
        wx.setStorageSync("userInfo", res.data);
      });
      that.setData({
        showUpdateDialog: false,
      });
    });
  },
});