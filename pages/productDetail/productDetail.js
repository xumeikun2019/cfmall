// index/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_shoucang: 0,
    goods_info: {
      goods_id: 1,
      goods_title: "商品标题1",
      goods_price1: '100',
      goods_price2: '200',
      goods_yunfei: 0,
      goods_kucun: 100,
      goods_xiaoliang: 1,
      content: '商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情',

    },
    price1: "",
    price2: "",
    salesvolume: "",
    stock: "",
    prodtitle: "",
    goods_img: [],
    imgurl: app.globalData.imgurl,
    imgurl1:"",
    detail_img: "",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    amount: 1,
    productid:"",
    productlist:[]
  },


  previewImage: function(e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist // 需要预览的图片http链接列表  
    })
  },

  /**
   * 生命周期函数--监听页面
   * 
   * 加载
   */
  onLoad: function(options) {
    var products = JSON.parse(options.productList);

    var arr = wx.getStorageSync('cart') || [];
    console.log("arr=")
    
    console.log(arr)
    arr.forEach(function (item, index) {
      console.log(item.prodid + "===" + products.prodid)
      console.log(item.prodid == products.prodid)
      if (item.prodid == products.prodid){

        products.amount = item.amount;
      }
    })

    var a1 = options.imgurl2.split(",");
    var b1 = [];
    var b0 = options.imgurl1;
    for(var i = 0 ; i<a1.length-1;i++){
      b1.push(app.globalData.imgurl + a1[i])
    }
    var a2 = options.imgurl3.split(",");
    var b2 = [];
    for (var i = 0; i < a2.length-1; i++) {
      b2.push(app.globalData.imgurl + a2[i])
    }
   
   // console.log("11111"+b2)
    this.setData({
      price1: options.price1,
      price2: options.price2,
      salesvolume: options.salesvolume,
      stock: options.stock,
      prodtitle: options.prodtitle,
      goods_img: b1,
      detail_img: b2,
      imgurl1: b0,
      productid: options.productid,
      productlist: products,
      amount: products.amount
    })
   console.log(this.data.productlist)
  },
  callus: function() {

    wx.makePhoneCall({
      phoneNumber: '010-84852101',
    })

  },
  //新增购物车
  addShopCart:function(){
    var that = this;
    var productlist = that.data.productlist;
    //console.log(that.data.productlist);
    var arr = wx.getStorageSync('cart') || [];
   // console.log(arr);
    var hasprod = false;
    // for(var i = 0 ; i < arr.length;i++){
    //   console.log("start")
    //   console.log(arr.length)
    //   console.log(arr[i]);

    // }
    if(arr.length == 0){
      console.log("购物车中没有state=1");
      that.data.productlist.amount = that.data.amount
      arr.push(productlist)
    }else{
      arr.forEach(function (item, index) {
        console.log(item.prodid)
        console.log("item");
        if (item.prodid == productlist.prodid){
          console.log("购物车中有");
          item.amount = that.data.amount;
          hasprod = true;
        }
      })
      if (hasprod == false) {
        console.log("购物车中没有state=2");
        arr.push(productlist)
      }
    }

   
    //console.log(arr);
    wx.setStorageSync('cart', arr)
    wx.showToast({
      title: '添加成功',

    });

  },
  buy:function(e){
    console.log(e);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    this.animation = animation
    animation.translateY(300).step();

    this.setData({
      animationData: animation.export()
    });
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true,
          buys: '立即购买',
          status: '1'
        }
      );
    } else {
      this.setData(
        {
          showModalStatus: true,
          buys: '加入购物车',
          status: '2'
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)
  },
  changeNum: function (e) {
    var that = this;
    if (e.target.dataset.alphaBeta == 0) {
      if (this.data.amount <= 1) {
        amount: 1
      } else {
        this.setData({
          amount: this.data.amount - 1
        })
      };
    } else {
      this.setData({
        amount: this.data.amount + 1
      })
    };
  },
})