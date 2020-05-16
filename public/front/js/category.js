$(function () {
  // 1-动态渲染一级分类
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.nav-list').html(template('tmp-one', info));

      // 默认加载第一个
      var id = $('.nav-list li:first-child a').data('id');
      console.log(id);
      renderSecond(id);
    }
  })

  // 2-动态渲染和一级分类对应的二级分类
  function renderSecond(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.content-list').html(template('tmp-two', info))
      }
    })
  }


  // 3-点击一级分类，高亮并切换二级分类
  $('.nav-list').on('click', 'a', function () {
    // 排他
    $(this).parent().addClass('current').siblings().removeClass('current');

    var id = $(this).data('id');
    renderSecond(id);
  })
})