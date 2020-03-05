//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
   
  },
   

  globalData: {
    userInfo: null,
    openid: 0,//微信唯一标识
    weburl: "http://192.168.0.234:8080/",
    imgurl:"http://192.168.0.234:8080/cfmall/upload/common/"
  },
  set_user_info: function (user_info) {
    console.log("准备保存用户数据：");
    console.log(user_info);

    var user_info_str = JSON.stringify(user_info);

    //缓存返回数据
    wx.setStorageSync("wxa_user_info", user_info_str);

    //console.log('111111111111111111');
    //console.log(wx.getStorageSync("wxa_user_info"));
  },
  get_user_info: function () {
    //缓存返回数据
    var user_info_str = wx.getStorageSync("wxa_user_info");

    console.log("获取小程序用户数据：" + user_info_str + '333333333');

    if (!user_info_str) {
      return null;
    }

    return JSON.parse(user_info_str);
  },
  getColor: function () {
    //从本地读取
    var option_list_str = wx.getStorageSync("option_list_str");

    console.log("获取商城选项数据：" + option_list_str + '333333333');

    if (!option_list_str) {
      return null;
    }

    var option_list = JSON.parse(option_list_str);

    console.log(option_list);

    wx.setNavigationBarColor({
      frontColor: option_list.wxa_shop_nav_font_color,
      backgroundColor: option_list.wxa_shop_nav_bg_color,
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  }
})