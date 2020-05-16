$(function () {
  // 获取用户数据，动态渲染到页面中
  $.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      console.log(info);

      if (info.error) {
        // 跳转到登录页
        location.href = 'login.href?reUrl=' + location.href;
      } else {
        // 渲染数据
        $('.nickname').text(info.username);
        $('.mobile').text(info.mobile);
      }
    }
  });

  // 退出
  $('#logout').click(function () {
    $.ajax({
      url:'/user/logout',
      type:'get',
      dataType:'json',
      success:function (info) {
        console.log(info);
        
        // 跳转登录页
        location.href = 'login.html';
      }
    })
  });










})