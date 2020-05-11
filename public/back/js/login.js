$(function () {
  // 1-表单验证
  $('#form').bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // fields字段
    fields: {
      //校验用户名，对应name表单的name属性    
      username: {
        validators: {
          //不能为空        
          notEmpty: {
            message: '用户名不能为空!'
          },
          //长度校验        
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          // 拓展错误提示信息
          callback: {
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          //不能为空        
          notEmpty: {
            message: '密码不能为空!'
          },
          //长度校验        
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6到12之间'
          },
          // 拓展错误提示信息
          callback: {
            message:'密码错误'
          }
        }
      }
    }


  })

  // 2-表单重置
  $('.btn-reset').click(function () {
    var validator = $("#form").data('bootstrapValidator');  //获取表单校验实例
    validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
  })

  // 3-ajax提交
  $("#form").on('success.form.bv', function (e) {
    // alert(1);
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/employee/employeeLogin',
      type:'post',
      dataType:'json',
      data:$('#form').serialize(),
      success:function(info) {
        // console.log(info);
        if(info.error){
          // alert('wrong');
          if (info.error == 1000) {
            // 用户名错误
            $('#form').data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
          }
          if (info.error == 1001) {
            // 密码错误
            $('#form').data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
          }
        }else{
          location.href = './index.html';
        }
      }
    })
  })
})