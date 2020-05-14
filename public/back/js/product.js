$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = []; //存储三张图片地址
  // 1-请求二级分类的数据并渲染
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
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

  // 3-填充下拉列表二级分类数据
  $.ajax({
    url: '/category/querySecondCategoryPaging',
    type: 'get',
    data: {
      // 全取了
      page: 1,
      pageSize: 100
    },
    dataType: 'json',
    success: function (info) {
      console.log(info);
      // 填充二级分类
      $('.brand-list').html(template('tmp1', info));
    }
  })


  // 4-点击下拉列表选项，获取选项的值，赋值按钮，并保存当前数据到隐藏域
  $('.brand-list').on('click', 'a', function () {
    // alert(1);
    $('.title-text').text($(this).text());
    // 当前a标签data-id赋值给隐藏域
    $('[name = "brandId"]').val($(this).data('id'))

    // 选择二级分类后，状态由失败转变为成功
    $('#form1').data('bootstrapValidator').updateStatus('brandId', 'VALID');
  })

  // 5-单独上传图片到图片服务器
  // 需要三张，保留最新上传的三张
  $('#file').fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result.picAddr);
      picArr.unshift(data.result);

      // 显示图片,向盒子往前添加
      $('.pic-box').prepend('<img src=" ' + data.result.picAddr + ' " height="100" >');

      if (picArr.length > 3) {
        // 图片大于3张
        picArr.pop();
        // 容器删除最后一张 remove自杀 empty清空内部
        $('.pic-box img:last-child').remove();
      }

      // // 图片服务器保存地址 赋值给隐藏域
      // $('[name="brandLogo"]').val(url);

      if (picArr.length == 3) {
        // // 选择3张图片后，状态由失败转变为成功
        $('#form1').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
      }

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
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择产品名称'
          }
        }
      },
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品描述'
          }
        }
      },
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须为非0开头数字'
          }
        }
      },
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须为XX-XX格式'
          }
        }
      },
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品原价'
          }
        }
      },
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品现价'
          }
        }
      },
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择商品现价'
          }
        }
      },
    }

  });


  // 7-验证通过，ajax后台交互，添加商品数据
  $("#form1").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    var str = $('#form1').serialize();
    // 数组中三张图片数据转成JSON字符串，再拼接到查询字符串后
    str += '&' + 'picArr=' + JSON.stringify(picArr);

    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: str,
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 添加成功后
        // 重新渲染第一页
        currentPage = 1;
        render();
        // 隐藏模态框
        $('.modal-add').modal('hide');

        var validator = $("#form1").data('bootstrapValidator');  //获取表单校验实例
        validator.resetForm(true);//默认重置表单相关的样式，不重置数据，要重置数据加true
        // 手动重置一级分类按钮文字和默认图片
        $('.title-text').text('请选择二级分类')
        $('.pic-box').empty();
        // 数组也要重置,避免影响下次
        picArr = [];

      }
    })
  });

})