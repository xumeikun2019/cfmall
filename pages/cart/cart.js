var app = getApp();

var userInfo = app.get_user_info();
// pages/cart/cart.js
Page({
  data: {
    imgurl: app.globalData.imgurl,
    page: 1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
    selectedAllStatus: false
  },
  

  bindMinus: function (e) {
    var arr = wx.getStorageSync('cart') || [];
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].amount;
    // 只有1件，删除
    if (num > 1) {
      num--;
      //var productid = e.currentTarget.dataset.cartid;
      var carts = that.data.carts;
      carts[index].amount = num;
      // 自增
      this.setData({
        carts: carts,
      });
      arr[carts[index].id].amount = carts[index].amount
      wx.setStorageSync('cart', arr)
      this.sum();
    }else{
      num--;
      var carts = that.data.carts;
     
      carts[index].amount = num;
      arr[carts[index].id].amount = carts[index].amount
      carts.splice(index, 1);
      console.log(that.data.carts)
      this.setData({
        carts: carts,
      });
      wx.setStorageSync('cart', arr)
       this.sum();
    }
  
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
  onShow: function () {
    //this.onLoad();
    //this.loadProductData();
    //this.sum();
    var arr = wx.getStorageSync('cart') || [];
    var carts=[];
    for(var i =0;i<arr.length;i++){
      if(arr[i].amount>=1){
       // console.log(arr[i]);
        arr[i].id=i;
        carts.push(arr[i]);
      }
    }
    //console.info("缓存数据：" + arr); 
     this.setData({
       carts: carts
     })
     console.log(this.data.carts)
  },

  bindPlus: function (e) {
    var arr = wx.getStorageSync('cart') || [];
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].amount;
    var productid = e.currentTarget.dataset.cartid;
    // 自增
    num++;
    console.log(num);
    var carts = that.data.carts;
    carts[index].amount = num;
    // 自增
    console.log(carts);
    this.setData({
      carts: carts,
    });
    arr[carts[index].id].amount = carts[index].amount
    wx.setStorageSync('cart', arr)
     this.sum();
  },

  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    console.log(e);
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
    this.sum()
  },

  bindSelectAll: function () {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },

  bindCheckout: function () {
    // 初始化toastStr字符串
    var toastStr = '';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      //var product_list = new Array();
      // var j = 0;

      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].productid + ',';
        //toastStr += ',';

        // product_list[j++] = this.data.carts[i].productid;
        //product_list += ',';
      }
    }
    console.log("1111111");
    console.log(toastStr);
    console.log("2222222222");
    var product_list = toastStr.substring(0, toastStr.length - 1);

    var proId = product_list.split(",")
    console.log(product_list);
    console.log(proId);
    if (toastStr.length == 0) {
      wx.showToast({
        title: '请选择要结算的商品！',
        duration: 2000
      });
      return false;
    }

    //存回data
    wx.navigateTo({
      url: '../order/pay?productid=' + encodeURIComponent(JSON.stringify(proId)),
    })
  },

  bindToastChange: function () {
    this.setData({
      toastHidden: true
    });
  },

  sum: function () {
    var carts = this.data.carts;
    console.log(carts);
    if (carts || carts != null) {
      // 计算总金额
      var total = 0;
      for (var i = 0; i < carts.length; i++) {
        if (carts[i].selected) {
          total += carts[i].amount * carts[i].price1;
        }
      }
      total = total.toFixed(2);
      // 写回经点击修改后的数组
      this.setData({
        carts: carts,
        total: '¥ ' + total
      });
    }
  },

  onLoad: function (options) {
    // var that = this;
    //this.loadProductData();
    app.getColor();
  
  },
  removeShopCard: function (e) {
    var arr = wx.getStorageSync('cart') || [];
    var that = this;
    //var productid = e.currentTarget.dataset.cartid;
    var index = e.currentTarget.dataset.index;
    console.log(index+"index");
    console.log(that.data.carts[index].id);
    var num = that.data.carts[index].amount;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function (res) {
        num=0;
        var carts = that.data.carts;
        carts[index].amount = num;
        arr[carts[index].id].amount = carts[index].amount
        carts.splice(index, 1);
        console.log(that.data.carts)
        that.setData({
          carts: carts,
        });
        wx.setStorageSync('cart', arr)
        that.sum();
      },
     
    });
  },

  // 数据案例
  loadProductData: function () {
    var that = this;
    if (userInfo) {
      wx.request({
        url: app.globalData.http_server + '?g=Yanyubao&m=ShopAppWxa&a=cart_list',
        method: 'post',
        data: {
          userid: userInfo.userid,
          checkstr: userInfo.checkstr,
          page: 1,
          sellerid: app.get_sellerid()
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //--init data
          var cart = res.data.data;
          if (res.data.code == 1) {
            console.log(cart);
            that.setData({
              carts: cart,
            });
          } else if (res.data.code == 2) {
            that.setData({
              carts: '',
            });
          }
          //endInitData
        },
      });
    }
  }

})