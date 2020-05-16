$(function () {
  // 用户登录
  // 1-点击按钮，获取输入框的值，判断数据是否完整
  // 2-数据完整，发送AJAX请求返回验证结果，处理
  $('#loginBtn').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username.trim().length === 0) {
      mui.toast('请输入帐号');
      return;
    }
    if (password.trim().length === 0) {
      mui.toast('请输入密码')
      return;
    }

    // 登录验证
    $.ajax({
      url: '/user/login',
      type: 'post',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);

        if (info.error) {
          mui.toast('用户名不存在');
        } else {
          // 默认到个人中心，如果从其他页面跳转过来，登录成功后跳回原页面

          // var reUrl = getSearch('reUrl');
          var reUrl = location.search; // ?reUrl=http://localhost:3000/front/product.html?productId=2
          console.log(reUrl);          
          // 解码成中文
          reUrl = decodeURI(reUrl); // ?reUrl=http://localhost:3000/front/product.html?productId=2
          console.log(reUrl);
          // 取等号后面的内容
          reUrl = reUrl.slice(7); // http://localhost:3000/front/product.html?productId=2
          console.log(reUrl);


          if (reUrl) {
            location.href = reUrl;
          } else {
            location.href = 'user.html';
          }

        }
      }
    })
  });

















})