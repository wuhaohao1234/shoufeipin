// pages/news/news.js
var t, api = require("../../utils/api")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		banners: [],
		indicatorDots: false,
		autoplay: 1,
		interval: 5e3,
		duration: 1e3,
		
		cate_id: 0,
		category:[],
		news:[],
		page:1,
		allowAdd:true,
		TabCur: 0,
		scrollLeft:0
	},
	// tabSelect(e) {
	//   t.setData({
	//     TabCur: e.currentTarget.dataset.id,
	//     scrollLeft: (e.currentTarget.dataset.id-1)*60
	//   })
	// },
	checkTab: function (e) {
		let id = e.currentTarget.dataset.id;
		t.setData({
			cate_id: id,
			page:1,
			allowAdd:true,
			news:[],
			TabCur: e.currentTarget.dataset.index,
			scrollLeft: (e.currentTarget.dataset.id-1)*60
		})
		t.getNewsByCateAndPage()
	},

	toNewsInfo: function (e) {
		let id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "/pages/news/newsInfo/newsInfo?id="+id
		})
	},

	getNewsByCateAndPage:function(){
		let opt = {}
		opt.category_id = t.data.cate_id;
		opt.page = t.data.page
		api.getNewsByCateAndPage(opt, function (res) {
			if(res.data.list.length > 0){
        res.data.list.map((v,i) => {
          console.log('vvv',v.id);
          api.getNewsById({id:v.id}, function (res) {
            console.log('resresresres',res)
            v.create_at = res.data.create_at
          })
          return v;
        })
        console.log('listlist11111111',res.data.list)
        setTimeout(function() {
          t.setData({
            news:t.data.news.concat(res.data.list)
          })
        },500)
			
			}else{
				t.setData({
					allowAdd:false
				})
			}

		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// console.info(options)
		t = this
		api.newsCategory(function (res) {
			let category = res.data.list
			let cate_id = category[0].id;
			t.setData({
				category,
				// cate_id
			})
			if(options.id){
				cate_id = Number(options.id)
			}
			setTimeout(()=>{
				t.setData({
					cate_id: cate_id,
					// category: category,
					page:1,
					allowAdd:true,
				})
				t.getNewsByCateAndPage()
			},100)
			// t.getNewsByCateAndPage()

		})
		
		api.indexPage(function(res) {
			wx.hideLoading();
			console.log(res.data);
			t.setData({
				banners: res.data.banner,
			});
			getApp().store.setState({
				menu: res.data.menu,
			});
			if (!res.data.index_adv_pic) {
				_this.setData({
					ad_tiem: 0,
				});
			}
		});
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
			t.getNewsByCateAndPage()
		}

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},
	
	toBanner(e) {
		let nav = e.currentTarget.dataset.url;
		wx.navigateTo({
			url: nav,
		});
	},
})