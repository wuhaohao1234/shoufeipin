var t = getApp(), api=require("../../utils/api"),_this;

Page({
    data: {
        imgUrls: [],
        appName:'',
        retPage:'',
        indicatorDots: !0,
        autoplay: !1,
        interval: 5e3,
        duration: 1e3,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        avatarUrl: 'http://gchscc.zaishenziyuan.cn/%E4%B8%8B%E5%8D%95%E7%95%8C%E9%9D%A2/%E7%8A%B6%E6%80%8111/%E5%A4%A7%E5%9B%BE%E6%A0%87/%20%E9%BB%91%E8%89%B2%E5%9B%BE%E6%A0%87/111/%E6%9C%AA%E5%91%BD%E5%90%8D%286%29%20%283%29.png',
        nickName: '',
        realAvatar: '',
        show: false

    },
    onLoad: function (res) {
        _this = this;
        this.setData({
            appName:res.appName,
            nickName: this.randomString(8),
            retPage:res.page
        })
        // api.indexPage(function (res) {
        //     _this.setData({
        //         imgUrls: res.data.banner
        //     })
        // })
        api.aboutUs(function (res) {
            _this.setData({
                images:res.data.site_icon
            })
        })
    },
    authFalse: function() {
        wx.navigateBack({
            delta: 2
        });
    },
    onChooseAvatar(e) {
        const { avatarUrl } = e.detail
        this.setData({
            avatarUrl,
        })
        var that = this
        wx.uploadFile({
            url: api.serverPath+"/common/upload",
            filePath: avatarUrl,
            name: "file",
            header: {
                "Content-Type": "multipart/form-data",
                // "content-type":'application/x-www-form-urlencoded',
                // 'chartset': 'utf-8'
            },
            // formData:{
            //     'token':wx.getStorageSync("token"),
            //     'file':avatarUrl
            // },
            success: function (t) {
                // console.info(t)
                var a = JSON.parse(t.data)
                that.setData({
                    realAvatar: a.data.url
                })

            }
        });
    },
    editNickName(e){
        console.info('sss')
        var that = this
        that.setData({
            nickName: e.detail.value
        })
    },
    showDialog(){
      this.setData({
          show: true
      })
    },
    updateUserInfo: function(e) {
        var that = this
        if(!this.data.realAvatar){
            wx.uploadFile({
                url: api.serverPath+"/common/upload",
                filePath: '/images/my/weixin_default_avatar.png',
                name: "file",
                header: {
                    "Content-Type": "multipart/form-data",
                },
                success: function (t) {
                    console.info(t)
                    var a = JSON.parse(t.data)
                    that.setData({
                        realAvatar: a.data.url
                    }, function (){
                        this.login(e)
                    })
                },
                fail(res) {
                    console.info(res)
                }
            });
        }else{
            this.login(e)
        }
        // wx.getUserProfile({
        //     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         // this.setData({
        //         //     userInfo: res.userInfo,
        //         //     hasUserInfo: true
        //         // })
        //         api.userLogin(res.userInfo ,function(res) {
        //             wx.setStorageSync('token', res.data.token);
        //             wx.setStorageSync('user_id', res.data.user_id);
        //             if(that.data.appName&&that.data.retPage){
        //                 const env = wx.getAccountInfoSync().miniProgram.envVersion;
        //                 wx.navigateToMiniProgram({
        //                     appId: 'wxff89b0a21358c7ad',
        //                     path: `/${that.data.retPage}?token=${res.data.token}&user_id=${res.data.user_id}`,
        //                     extraData: {
        //                         token: res.data.token,
        //                         user_id:res.data.user_id
        //                     },
        //                     envVersion: env,
        //                     success(res) {
        //                       // 打开成功
        //                     }
        //                   })
        //             }else{
        //                 wx.navigateBack({
        //                     delta: 1
        //                 });
        //             }
        //         });
        //     }
        // })
    },
    login(e) {
        var that = this
        const {nickname} = e.detail.value
        if(!nickname){
            wx.showToast({
                title: '没有填写用户昵称',
                icon: 'none',
                duration: 2000
            })
            return false
        }
        let userInfo = {
            nickName: nickname,
            avatarUrl: that.data.realAvatar
        }
        api.userLogin(userInfo ,function(res) {
            wx.setStorageSync('token', res.data.token);
            wx.setStorageSync('user_id', res.data.user_id);
            if(that.data.appName&&that.data.retPage){
                const env = wx.getAccountInfoSync().miniProgram.envVersion;
                wx.navigateToMiniProgram({
                    appId: 'wx0279b5aeedea2fdc',
                    path: `/${that.data.retPage}?token=${res.data.token}&user_id=${res.data.user_id}`,
                    extraData: {
                        token: res.data.token,
                        user_id:res.data.user_id
                    },
                    envVersion: env,
                    success(res) {
                        // 打开成功
                    }
                })
            }else{
                wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    randomString(len) {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
});