$(function () {
  // 从地址栏获取相应id
  var productId = getSearch('productId')
  console.log(productId);

  // 从后台获取相应信息，渲染完成
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.mui-scroll').html(template('tmp', info));

      // ajax异步的，得再添加一遍轮播图自动播放
      //获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // mui在mui.init()中会自动初始化基本控件,但是 动态添加的Numbox组件需要手动初始化
      mui('.mui-numbox').numbox()

    }
  })

  // 选择尺码功能，切换current类名
  $('.mui-scroll').on('click','.lt_size span',function() {
    // alert( $(this).text() );
    $(this).addClass('current').siblings().removeClass('current');
  })

  // 点击购物车 获取尺码和数量
  $('#addCart').click(function () {
    var size = $('.lt_size .current').text();
    var num = mui('.mui-numbox').numbox().getValue();

    if (!size) {
      mui.toast('请选择尺码~');
      return;
    }
    // console.log(size, num);

    // 把这两数据添加到购物车
    $.ajax({
      url:'/cart/addCart',
      type:'post',
      data:{
        productId: productId,
        num: num,
        size: size
      },
      dataType:'json',
      success:function(info){
        console.log(info);

        //失败去登录页
        // 成功弹框
        if(info.error){
          // location.href = 'login.html?reUrl=product.html'
          location.href = 'login.html?reUrl=' + location.href
        }else{
          mui.confirm('添加成功','温馨提示', ['去购物车','再看看'], function (data) {
            if (data.index == 0) {
              // 去购物车
              location.href = 'cart.html'
            }
          })
        }
      }
    })
    
  });










})