$(function () {

  var currentPage = 1;
  var pageSize = 5;
  // 1-请求二级分类的数据并渲染
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('tbody').html(template('tmp', info));
        setPage(info.total);
      }
    })
  }
  render();

  // 2-分页渲染
  function setPage(total) {
    $("#pagintor").bootstrapPaginator({
      bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: currentPage, //当前页
      totalPages: Math.ceil(total / pageSize), //总页数

      onPageClicked: function (event, originalEvent, type, page) {
        //为按钮绑定点击事件 page:当前点击的按钮值
        currentPage = page;

        render();
      }
    });
  }


  // 3-填充下拉列表数据
  $.ajax({
    url: '/category/queryTopCategoryPaging',
    type: 'get',
    data: {
      // 全取了
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      // 填充一级分类
      $('.dropdown-menu').html(template('tmp1', info));
    }
  }) 

  // 4-点击下拉列表选项，获取选项的值，赋值按钮，并保存当前数据到隐藏域
  $('.cate-list').on('click', 'a', function () {
    // alert(1);
    $('.title-text').text($(this).text());
    // 当前a标签data-id赋值给隐藏域
    $('[name = "categoryId"]').val($(this).data('id'))

    // 选择一级分类后，状态由失败转变为成功
    $('#form1').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
  })

  // 5-单独上传图片到图片服务器
  $('#file').fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result.picAddr);
      var url = data.result.picAddr;
      // 图片预览
      $('#img').attr('src', url);
      // 图片服务器保存地址 赋值给隐藏域
      $('[name="brandLogo"]').val(url);

      // 选择图片后，状态由失败转变为成功
      $('#form1').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }
  });


  // 6-添加分类表单验证
  //使用表单校验插件
  $('#form1').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择LOGO'
          }
        }
      },
    }

  });

  // 7-添加二级分类 $('.btn-add').click(function(){})
  $("#form1").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      data: $('#form1').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        // 重新渲染第一页
        currentPage = 1;
        render();
        // 隐藏模态框
        $('.modal-add').modal('hide');

        var validator = $("#form1").data('bootstrapValidator');  //获取表单校验实例
        validator.resetForm(true);//默认重置表单相关的样式，不重置数据，要重置数据加true
        // 手动重置一级分类按钮文字和默认图片
        $('.title-text').text('请选择一级分类')
        $('#img').attr('src', './images/none.png');
      }
    })
  });

})