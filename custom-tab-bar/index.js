// 自定义导航
Component({
	data: {
		selected: 0,
		color: "#000",
		selectedColor: "#000",
		isAnimate: false,
		// list: []
		isShowClose: false,
		isShow: false,
		isShowTabBar: true
	},
	onLoad() {

	},
	attached() {},
	methods: {
		switchTab(e) {
			const data = e.currentTarget.dataset
			console.log('datadatadatadata', data);
			const url = data.path
			wx.switchTab({
				url
			})
			this.setData({
				selected: data.index
			})
		},
		close() {
			this.setData({
				isAnimate: false,
				isShowClose: false,
			})
			setTimeout(() => {
				this.setData({
					isShow: false
				})
			}, 500)
		},
		toUrl(e) {
			const {
				index
			} = e.currentTarget.dataset;

			this.setData({
				isAnimate: false,
				isShowClose: false,
				isShow: false
			})
			
			setTimeout(()=>{
				switch (index) {
					case 1:
						wx.navigateTo({
							url: '/pages/recovery/recovery',
						})
						break;
					case 2:
						let nav = getApp().globalData.nav[3];
						wx.navigateToMiniProgram({
							appId: nav.appid,
							path: nav.link,
							success(res) {
								console.log(res);
							},
						});
						break;
					case 3:
						wx.navigateTo({
							url: '/pages/news/news',
						})
						break;
					case 4:
						wx.switchTab({
							url: '/pages/me/ranking/index',
						})
						break;
					default:
						break;
				}
			}, 100)
		},
		toNav(e) {
			console.log(getApp().globalData.nav);
			let nav = e.currentTarget.dataset.item;
			let index = e.currentTarget.dataset.index;
			let jump_type = nav.jump_type
			jump_type = 1;
			let link = nav.link.trim();
			if (index === 2) {
				this.setData({
					isAnimate: true
				})
				setTimeout(() => {
					this.setData({
						isShowClose: true,
						isShow: true
					})
				}, 400)
			} else {
				switch (jump_type) {
					case 0:
						wx.navigateTo({
							url: link
						})
						break;
					case 1:
						wx.switchTab({
							url: link
						})
						break;
					case 2:

						// wx.navigateToMiniProgram({
						//   appId: nav.appid,
						//   path: nav.link,
						//   success(res) {
						//     console.log(res)
						//   }
						// })
					default:
						return;
				}
			}

		},
	}
})