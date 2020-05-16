$(function () {
  // 1-获取搜索关键字
  var key = getSearch('key');
  console.log(key);
  // 2-把关键字放到输入框中
  $('.search_input').val(key);
  // 3-根据关键字请求对应商品，渲染到页面中

  // 3-1保存参数
  var obj = {
    proName: key,
    page: 1,
    pageSize: 100
  }

  function render() {
    $.ajax({
      url: '/product/queryProduct',
      type: 'get',
      data: obj,
      dataType: 'json',
      beforeSend:function () {
        $('.lt_product').html('<div class="loading"></div>') 
      },
      success: function (info) {
        // console.log(info);
        // 为了看动画效果
        setTimeout(() => {
          $('.lt_product').html(template('tmp', info))
        }, 500);
        
      }
    })
  }

  // 4-点价格，根据按钮方向排序
  $('.lt_sort').on('click', '.price', function () {

    // 如果有current类名就切换i标签箭头方向
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-up fa-angle-down')
    }

    $(this).addClass('current');
    // 判断升序降序
    var price = $(this).find('i').hasClass('fa-angle-up') ? 1 : 2;
    // 参数加给Obj
    obj.price = price;
    // console.log(obj);

    render();
  })

  // 5-点击搜索按钮，获取输入值
  // 先添加一条历史记录
  // 根据输入值，获取对应商品，并渲染
  $('.search_btn').click(function () {
    var txt = $('.search_input').val();

    // 判断是否为空
    if (txt.trim().length == 0) {
      mui.toast('请输入搜索内容');
      return;
    }

    //去LS取数据 
    var arr = JSON.parse(localStorage.getItem('search') || '[]')

    // 添加前判断是否已有，有的话去重
    var index = arr.indexOf(txt); //如果不存在返回-1
    if (index > -1) {
      // 删除之前那条记录
      arr.splice(index, 1);
    }

    // 往前面添加
    arr.unshift(txt);
    // 判断最大长度>8 删除最后一条
    if (arr.length > 8) {
      arr.pop()
    }

    // 存储到LS中
    localStorage.setItem('search', JSON.stringify(arr));
    
    // 修改搜索关键字
    obj.proName = txt
    // 重新渲染
    render();
  })

})