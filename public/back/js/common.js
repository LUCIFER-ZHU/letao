// // 进度条开始
// NProgress.start();
// // 进度条结束
// NProgress.done();

// 进度条禁止显示圆圈
NProgress.configure({ showSpinner: false });
// ajax请求开始时，进度条出现
// ajax请求完成时，进度条结束
$(document).ajaxStart(function(){
  NProgress.start();
})

$(document).ajaxStop(function(){
  setTimeout(() => {
    NProgress.done();
  }, 1000);
  
})

$(function(){
  // 二级导航展开合并
  $('.cate-link').click(function(){
    $('.second').slideToggle();
  })

  // 点击切换侧边栏
  $('.menu').click(function(){
    $('body').toggleClass('hidemenu')
  })

  // 退出功能
  $('.btn-logout').click(function(){
    $.ajax({
      url:'/employee/employeeLogout',
      type:'get',
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = './login.html'
        }
      }
    })
  })
})