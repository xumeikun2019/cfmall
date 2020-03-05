var app = getApp();
var mtabW;
Page({
  data: {
    tabs: ["综合", "艺术", "泥塑", "纸面绘画", "布面绘画", "中国油画", "水墨画"],
    productList: [{

      "name": "金龙鱼阳光葵花油",
      "price": "123",
      "price2": "1233",
      "picture": "../../images/1.jpg"

    },
      {
        "name": "金龙鱼阳光葵花油",
        "price": "123",
        "price2": "1233",
        "picture": "../../images/1.jpg"
      },
      {

        "name": "金龙鱼阳光葵花油",
        "price": "123",
        "price2": "1233",
        "picture": "../../images/1.jpg"
      }]
,
   
    activeIndex: 0,
    slideOffset: 0,
    tabW: 0
  },
  //事件处理函数
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        mtabW = res.windowWidth / 5; //设置tab的宽度
        that.setData({
          tabW: mtabW
        })
      }
    });

  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  tabClick: function (e) {
    var that = this;
    var idIndex = e.currentTarget.id;
    var offsetW = e.currentTarget.offsetLeft; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: idIndex,
      slideOffset: offsetW
    });
  },
  bindChange: function (e) {
    var current = e.detail.current;
    if ((current + 1) % 4 == 0) {

    }
    var offsetW = current * mtabW; //2种方法获取距离文档左边有多少距离
    this.setData({
      activeIndex: current,
      slideOffset: offsetW
    });

  }

})