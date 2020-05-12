// // 进度条开始
// NProgress.start();
// // 进度条结束
// NProgress.done();

// 进度条禁止显示圆圈
NProgress.configure({ showSpinner: false });
// ajax请求开始时，进度条出现
// ajax请求完成时，进度条结束
$(document).ajaxStart(function(){
  Nprogress.start();
})

$(document).ajaxStop(function(){
  setTimeout(() => {
    Nprogress.done();
  }, 1000);
  
})