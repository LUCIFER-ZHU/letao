$(function () {

  var currentPage = 1;
  var pageSize = 5;
  // 1-请求一级分类的数据并渲染
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
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

  //3-使用表单校验插件
  $('#form1').bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [':disabled', ':hidden', ':not(:visible)'],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '一级分类不能为空'
          },

        }
      },
    }

  });

  // 4点击添加按钮，表单验证通过后提交数据给后台，进行添加
  $("#form1").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addTopCategory',
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

      }
    })
  });

})