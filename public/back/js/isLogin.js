$.ajax({
  url:'/employee/checkRootLogin',
  type:'get',
  dataType:'json',
  success:function(info){
    console.log(info);
    if(info.error){
      location.href = './login.html'
    }
  }
})