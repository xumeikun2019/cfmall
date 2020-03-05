// pages/home/home.js
var app = getApp();
var userInfo = app.get_user_info();
var mtabW;
var next_page = 1;
var getmoreIndex = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurl: app.globalData.imgurl,
    carts: [],
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    isShowCart: true,
    menuFixed: false,
    menuTop: 0,

    activeIndex: 0,
    slideOffset: 0,
    tabW: 0,
    tabs: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    currentTab: 0,
    page: 1,
    banner_img: [{
        'img': '../../images/timg.jpg'
      },
      {
        'img': '../../images/timg.jpg'
      }
    ],
    productList: [],
    jsonresult:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      hidden: false
    });
    that.getcplx();
    that.getcp();
    wx.getSystemInfo({
      success: function(res) {
        mtabW = res.windowWidth / 4.5; //设置tab的宽度
        that.setData({
          tabW: mtabW,

        })
      }
    });
    //console.log( "9999999")
      setTimeout(function() {
        that.setData({
          hidden: true
        });
      }, 1000);
    var query = wx.createSelectorQuery();
    query.select('#tab').boundingClientRect();
    query.exec(function(res) {
      that.setData({
        menuTop: res[0]
      })
    })
  },
  showstepper: function(e) {
    

    // wx.showModal({
    //   title: '',
    //   content: '功能暂未开放',
    // })
    this.setData({
      isShowCart: false
    })
    
    var index = parseInt(e.currentTarget.dataset.index);
    var productList = this.data.productList;
    productList[index].amount = 1;
    this.setData({
      productList: productList,

    });
     console.log(this.data.productList)
    var carts = [];
    this.data.productList.forEach(function (item, index) {
      console.log(item)
      if(item.amount != 0 ){
        carts.push(item)
      }
    })
    wx.setStorageSync('cart', carts)
   
    //console.log(this.data.productList[index])
    //console.log(wx.getStorageSync('cart') + "123123123");
  },

  bindMinus: function(e) {
    //console.log(e);
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);

    var num = that.data.productList[index].amount;
    // 如果只有1件了，就不允许再减了
    num--;
    console.log(num);
    //var productid = e.currentTarget.dataset.cartid;
    var productList = that.data.productList;
    productList[index].amount = num;
    // 自增
    //console.log(productList);
    this.setData({
      productList: productList,
    });
    var carts = [];
    this.data.productList.forEach(function (item, index) {
      console.log(item)
      if (item.amount != 0) {
        carts.push(item)
      }
    })
    wx.setStorageSync('cart', carts)

    // wx.request({
    //   url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=cart_num_change',
    //   method: 'post',
    //   data: {
    //     productid: productid,
    //     userid: userInfo.userid,
    //     checkstr: userInfo.checkstr,
    //     'action': 'dec',
    //     amount: num,
    //     sellerid: app.get_sellerid()
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     var code = res.data.code;
    //     if (code == 1) {
    //       // 只有大于一件的时候，才能normal状态，否则disable状态
    //       var minusStatus = num <= 1 ? 'disabled' : 'normal';
    //       // 购物车数据
    //       var carts = that.data.carts;
    //       carts[index].amount = num;
    //       // 按钮可用状态
    //       var minusStatuses = that.data.minusStatuses;
    //       minusStatuses[index] = minusStatus;
    //       // 将数值与状态写回
    //       that.setData({
    //         minusStatuses: minusStatuses
    //       });
    //       that.sum();
    //     } else {
    //       wx.showToast({
    //         title: '操作失败！',
    //         duration: 2000
    //       });
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000
    //     });
    //   }
    // });
  },
  onShow: function() {
    this.getcp();
    //location.reload()
    //this.onLoad();
    this.loadProductData();
    this.sum();

  },

  bindPlus: function(e) {

    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.productList[index].amount;
    num++;
    var productid = e.currentTarget.dataset.cartid;
    var productList = that.data.productList;
    productList[index].amount = num;
    // 自增
    //
    //console.log(productList);
    this.setData({
      productList: productList,
    });
    var carts = [];
    this.data.productList.forEach(function (item, index) {
      console.log(item)
      if (item.amount != 0) {
        carts.push(item)
      }
    })
    wx.setStorageSync('cart', carts)

    // wx.request({
    //   url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=cart_num_change',
    //   method: 'post',
    //   data: {
    //     productid: productid,
    //     userid: userInfo.userid,
    //     checkstr: userInfo.checkstr,
    //     'action': 'inc',
    //     amount: num,
    //     sellerid: app.get_sellerid()
    //   },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     var code = res.data.code;
    //     if (code == 1) {
    //       // 只有大于一件的时候，才能normal状态，否则disable状态
    //       var minusStatus = num <= 1 ? 'disabled' : 'normal';
    //       // 购物车数据
    //       var carts = that.data.carts;
    //       carts[index].amount = num;
    //       // 按钮可用状态
    //       var minusStatuses = that.data.minusStatuses;
    //       minusStatuses[index] = minusStatus;
    //       // 将数值与状态写回
    //       that.setData({
    //         minusStatuses: minusStatuses
    //       });
    //       that.sum();
    //     } else {
    //       wx.showToast({
    //         title: '操作失败！',
    //         duration: 2000
    //       });
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000
    //     });
    //   }
    // });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () { 
    var that = this;
   
      that.getMore();
    
   
  },

 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  onPageScroll: function(e) {
    //console.log(e.scrollTop + "------" + this.data.menuTop.top); 
    if (e.scrollTop >= this.data.menuTop.top) {
      if (this.data.activeIndexmenuFixed) {
        return;
      }
      this.setData({
        menuFixed: true
      })
    } else {
      this.setData({
        menuFixed: false
      })
    }
    //console.log(this.data.menuFixed);
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tabClick: function(e) {
    next_page=1;
    var that = this;
    that.setData({
      hidden: false
    });
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    //console.log(idIndex+'asdasdasd');
    getmoreIndex = idIndex;
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
    if (idIndex == 3) {
      idIndex = "";

    }
    wx.request({
      url: app.globalData.weburl + 'cfmall/service/crjk.do',
      data: {
        cplb: idIndex,
        page: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {

        
        if (res.data.message == 0) {
         
          //console.log(res.data.data)
          that.setData({
              productList: res.data.data
            })


        }
        if (res.data.message==1){
          that.setData({
            productList: []
          })
        }
      },
      complete: function() { // complete
        wx.hideNavigationBarLoading() //完成停止加载
        //停止下拉刷新
      }
    })
    setTimeout(function() {
      that.setData({
        hidden: true
      });
    }, 1000);
  },
  bindChange: function(e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {

    }
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });

  },

  // // swichNav: function(e) {
  // //   var that = this;
  // //   console.log(e)
  // //   if (that.data.currentTab === e.target.dataset.current) {
  // //     return false;
  // //   } else {
  // //     var current = e.target.dataset.current;
  // //     that.setData({
  // //       currentTab: parseInt(current),
  // //       isStatus: e.target.dataset.otype,
  // //     });
  // //     that.loadProductList();

  // //   };
  //   console.log(that.data.currentTab)
  // },
  loadProductList: function(e) {
    var that = this;
    var userInfo = app.get_user_info();
    wx.request({
      url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=order_inde',
      method: 'post',
      data: {
        order_sort: that.data.isStatus
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        //--init data        
        var code = res.data.code;
        var list = res.data.orderList;
        /*
        var order_list = [];
        if (list||list!=null){
        for(var i = 0;i < list.length;i++){
          //var pro_list = list[i].orderProduct;
          //console.log(pro_list);
          order_list.push(list[i].orderProduct);
        }
        }
        */
        //console.log(list + "----");

        that.setData({
          isHideLoadMore: false,
          productList: [{
              "name": "xu"
            },
            {
              "price": "123"
            },
            {
              "price2": "1233"
            }


          ],
          page: 1
        });
        if (list && list != null && list.length > 5) {
          var winHeight = that.data.winHeight
          var Height = winHeight * 2 * that.data.page;
          //console.log(Height);
          that.setData({
            Height: Height
          });
        } else if (list == null) {
          that.setData({
            Height: that.data.winHeight - 120,
            isHideLoadMore: true,
          });
        }

      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });

  },
  //查询产品类型
  getcplx:function(e){
    var that = this;
    wx.request({
      url: app.globalData.weburl + 'cfmall/service/cxcplx.do',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },

      success: function (res) {

        //console.log(res.data.data)
        if (res.data.message == 0) {
          //console.log(that.data.cardNum + 1111111 + that.data.cardPwd)
          that.setData({
            tabs: res.data.data
          })
          //console.log(that.data.tabs)
        }
      }
    })

  },
  //查询产品
  getcp: function (e) {
    var that = this ;
    wx.request({
      url: app.globalData.weburl + 'cfmall/service/crjk.do',
      data: {
        cplb: "",
        page: 1
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        //console.log("9999999")

        if (res.data.message == 0) {
          //console.log(that.data.cardNum + 1111111 + that.data.cardPwd)
          //console.log(res.data.data)
          var arr = wx.getStorageSync('cart') || [];
          console.log(arr + "123");
          that.setData({
            productList: res.data.data
          })
          var productList = that.data.productList;
          for (var i = 0; i < productList.length; i++) {
            if (arr.length - 1 >= i ? arr[i].amount >= 1 : 0) {
              console.log(i + "123123");
              productList[i].amount = arr[i].amount;
            }
          }
          that.setData({
            productList: productList,
            jsonresult: JSON.stringify(productList)
          })
          // console.log(that.data.jsonresult);
          // console.log("length" + that.data.productList.length);
        }
      }
    })

  },
  //点击加载更多
  getMore: function(e) {
    var that = this;
    that.setData({
      hidden: false
    });
    var page = that.data.page;
    var idIndex = getmoreIndex;
   
    if (idIndex == 3 || idIndex == 0) {
      idIndex = "";
    }
   
    next_page++;
    console.log("idIndex" + idIndex + "page" + next_page)
    console.log(next_page);
    wx.request({
        url: app.globalData.weburl + 'cfmall/service/crjk.do',

        data: {

          cplb: idIndex,
          page: next_page,


        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(res.data.data)
           
          setTimeout(function () {
            if (that.data.productList.length == res.data.data.length) {
              console.log("没有");
              wx.showModal({
                title: '',
                content: '没有更多数据',
              })
              console.log(res.data.data)
            }
            that.setData({
              productList: res.data.data,
              hidden: true
            });
            var arr = wx.getStorageSync('cart') || [];
            var productList = that.data.productList;
            //console.log(arr.length +"arr=============");
            //console.log(productList.length + "productList=============");
            for (var i = 0; i < productList.length-1; i++) {
             
                
                if (arr.length - 1 >=i?arr[i].amount >= 1:0) {

                  productList[i].amount = arr[i].amount;
                }
              
            }
            that.setData({
              productList: productList
            })
          }, 2000);
          
        },
        fail: function(e) {
          console.log("22222");
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      })
     
  },
          
})