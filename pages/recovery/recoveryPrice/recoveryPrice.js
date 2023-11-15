// pages/recoveryPrice/recoveryPrice.js
var t, api = require("../../../utils/api"), app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cateList: [],
        checkCateId: 0,
        childCateList: [],
        childCateId: 0,
        float_price_is_open:0,
        productList: [],
    },

    checkCate: function (e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        t.setData({
            checkCateId: id,
            childCateList: [],
            childCateId: 0,
            productList: [],
        })

        for (let item of t.data.cateList) {
            if (id === item.id) {
                t.setData({
                    childCateList: item.category
                })
                if (item.category.length > 0) {
                    t.setData({
                        childCateId: item.category[0].id,
                        productList: item.category[0].product
                    })

                    t.checkProductList()

                }
            }
        }
    },

    checkChildCate: function (e) {
        let id = e.currentTarget.dataset.id
        t.setData({
            childCateId: id
        })
        for (let item of t.data.childCateList) {
            if (id === item.id) {
                t.setData({
                    productList: item.product
                })

                t.checkProductList()
            }
        }
    },

    checkProduct: function (e) {
        let product = e.currentTarget.dataset.product;
        let check_product = app.globalData.products
        if (check_product && check_product.length > 0) {
            let tag = true

            for (const check_index in check_product) {
                if (check_product[check_index].name === product.name) {
                    check_product.splice(check_index, 1)
                    tag = false
                    break
                }
            }
            if (tag) {
                check_product.push(product)
            }
        } else {
            check_product = [product]
        }
        app.globalData.products = check_product

        t.checkProductList()
    },

    checkProductList: function () {
        let newProducts = []
        let products = t.data.productList
        let check_product = app.globalData.products
        for (let product of products) {
            product.isCheck = false
            if (check_product && check_product.length > 0) {
                for (let check_item of check_product) {
                    if (check_item.name === product.name) {
                        product.isCheck = true
                        break
                    }
                }
            }

            newProducts.push(product)
        }
        t.setData({
            productList: newProducts
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        t = this;
        let address_id = options.address_id
        let cate_id = options.cate_id
        console.log(cate_id)
        console.log(cate_id)
        let token = wx.getStorageSync('token')
        if (token) {

            if (address_id) {
                api.recyclePrice({address_id: address_id}, function (res) {
                    t.setData({
                        cateList: res.data.list
                    })
                    if (t.data.cateList.length > 0) {
                        for (let cateListElement of t.data.cateList) {
                            if (cateListElement.id == cate_id) {
                                t.setData({
                                    checkCateId: cateListElement.id,
                                    childCateList: cateListElement.category
                                })
                                if (t.data.childCateList.length > 0) {
                                    t.setData({
                                        childCateId: t.data.childCateList[0].id,
                                        productList: t.data.childCateList[0].product
                                    })
                                    t.checkProductList()
                                }
                                break;
                            }
                        }
                    } else {
                        wx.showModal({
                            showCancel: false,
                            content: "该地区暂未开通服务"
                        })
                    }
                })
            } else {
                let address = app.globalData.address
                if (address) {
                    t.setData({
                        address
                    })
                    api.recyclePrice({address_id: address.id}, function (res) {
                        t.setData({
                            cateList: res.data.list
                        })
                        if (t.data.cateList.length > 0) {
                            for (let cateListElement of t.data.cateList) {
                                if (cateListElement.id == cate_id) {
                                    t.setData({
                                        checkCateId: cateListElement.id,
                                        childCateList: cateListElement.category
                                    })
                                    if (t.data.childCateList.length > 0) {
                                        t.setData({
                                            childCateId: t.data.childCateList[0].id,
                                            productList: t.data.childCateList[0].product
                                        })
                                        t.checkProductList()
                                    }
                                    break;
                                }
                            }
                        } else {

                        }
                    })
                } else {
                    api.getAddress(function (res) {
                        if (res.data.list.length > 0) {
                            for (let address of res.data.list) {
                                if (address.is_default === 1) {
                                    t.setData({
                                        address
                                    })
                                    api.recyclePrice({address_id: address.id}, function (res) {
                                        t.setData({
                                            cateList: res.data.list
                                        })
                                        if (t.data.cateList.length > 0) {
                                            for (let cateListElement of t.data.cateList) {
                                                if (cateListElement.id == cate_id) {
                                                    t.setData({
                                                        checkCateId: cateListElement.id,
                                                        childCateList: cateListElement.category
                                                    })
                                                    if (t.data.childCateList.length > 0) {
                                                        t.setData({
                                                            childCateId: t.data.childCateList[0].id,
                                                            productList: t.data.childCateList[0].product
                                                        })
                                                        t.checkProductList()
                                                    }
                                                    break;
                                                }
                                            }
                                        } else {

                                        }
                                    })
                                    break;
                                }
                            }
                            if (!t.data.address.id) {
                                t.setData({
                                    address: res.data.list[0]
                                })
                                api.recyclePrice({address_id: address.id}, function (res) {
                                    t.setData({
                                        cateList: res.data.list
                                    })
                                    if (t.data.cateList.length > 0) {
                                        for (let cateListElement of t.data.cateList) {
                                            if (cateListElement.id == cate_id) {
                                                t.setData({
                                                    checkCateId: cateListElement.id,
                                                    childCateList: cateListElement.category
                                                })
                                                if (t.data.childCateList.length > 0) {
                                                    t.setData({
                                                        childCateId: t.data.childCateList[0].id,
                                                        productList: t.data.childCateList[0].product
                                                    })
                                                    t.checkProductList()
                                                }
                                                break;
                                            }
                                        }
                                    } else {

                                    }
                                })
                            }
                        }else{
                            api.recyclePrice({address_id: ''}, function (res) {
                                t.setData({
                                    cateList: res.data.list
                                })
                                if (t.data.cateList.length > 0) {
                                    for (let cateListElement of t.data.cateList) {
                                        if (cateListElement.id == cate_id) {
                                            t.setData({
                                                checkCateId: cateListElement.id,
                                                childCateList: cateListElement.category
                                            })
                                            if (t.data.childCateList.length > 0) {
                                                t.setData({
                                                    childCateId: t.data.childCateList[0].id,
                                                    productList: t.data.childCateList[0].product
                                                })
                                                t.checkProductList()
                                            }
                                            break;
                                        }
                                    }
                                } else {

                                }
                            })
                        }
                    })
                }
            }{
                api.recyclePrice({address_id: ""}, function (res) {
                    t.setData({
                        cateList: res.data.list
                    })
                    if (t.data.cateList.length > 0) {
                        for (let cateListElement of t.data.cateList) {
                            console.log(cateListElement.id)
                            console.log(cate_id)
                            let check_id = cate_id? cate_id :  t.data.cateList[0].id
                            if (cateListElement.id ==  check_id) {
                                t.setData({
                                    checkCateId: cateListElement.id,
                                    childCateList: cateListElement.category
                                })
                                if (t.data.childCateList.length > 0) {
                                    t.setData({
                                        childCateId: t.data.childCateList[0].id,
                                        productList: t.data.childCateList[0].product
                                    })
                                    t.checkProductList()
                                }
                                break;
                            }
                        }

                    } else {

                    }
                })
            }
        } else {
            api.recyclePrice({address_id: ""}, function (res) {
                t.setData({
                    cateList: res.data.list
                })
                if (t.data.cateList.length > 0) {
                    for (let cateListElement of t.data.cateList) {
                        console.log(cateListElement.id)
                        console.log(cate_id)
                        let check_id = cate_id? cate_id :  t.data.cateList[0].id
                        if (cateListElement.id ==  check_id) {
                            t.setData({
                                checkCateId: cateListElement.id,
                                childCateList: cateListElement.category
                            })
                            if (t.data.childCateList.length > 0) {
                                t.setData({
                                    childCateId: t.data.childCateList[0].id,
                                    productList: t.data.childCateList[0].product
                                })
                                t.checkProductList()
                            }
                            break;
                        }
                    }

                } else {

                }
            })
        }


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
        api.pluginIsOpen(function (res) {
            t.setData({
                float_price_is_open:res.data.float_price_is_open
            })
        })
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