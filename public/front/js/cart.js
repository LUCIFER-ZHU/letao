$(function () {
  // 动态渲染当前用户购物车信息
  $.ajax({
    url:'/cart/queryCart',
    type:'get',
    success:function (info) {
      console.log(info);
      
      if(info.error){
        // 去登录
        location.href = 'login.html';
      }else{
        // 渲染
        $('.mui-table-view').html(template('tmp', {list:info}))
      }
    }
  });























})