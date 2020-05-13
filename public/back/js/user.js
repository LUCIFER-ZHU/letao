$(function(){

  var currentPage = 1;
  var pageSize = 5;

  // 记录当前用户操作状态
  var currentId = null;
  var isDelete = null;
  // 1-获取用户数据渲染到页面
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      data:{
        page: currentPage,
        pageSize: pageSize
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        $('tbody').html(template('tmp', info))

        setPage(info.total);
      }
    })
  }
  // 第一屏数据渲染
  render();

  // 2-分页渲染
  function setPage(total) {
    $("#pagintor").bootstrapPaginator({
      bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: currentPage,//当前页
      totalPages: Math.ceil(total/pageSize),//总页数

      onPageClicked:function(event, originalEvent, type,page){
        //为按钮绑定点击事件 page:当前点击的按钮值
        currentPage = page;

        render();
      }

    });
  }

  // 3-点击禁用按钮，获取当前数据id，记录药进行的操作
  $('tbody').on('click','.button',function(){
    // currentId = $(this).parent().attr('data-id');
    // 类似原生里dataset.id
    currentId = $(this).parent().data('id');
    // console.log(currentId);
    isDelete = $(this).hasClass('btn-success') ? 1 : 0;//1启用 0禁用
    // console.log(isDelete);
   
  })
  // 4-点击确定按钮，执行操作
  $('.btn-ok').on('click',function(){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id: currentId,
        isDelete : isDelete
      },
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          render();

          $('.modal-user').modal('hide');
        }
      }
    })
  })


})