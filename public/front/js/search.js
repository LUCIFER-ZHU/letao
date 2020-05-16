$(function () {
  // 1-模拟存储一些搜索记录到ls中
  // var arr = ["耐克", "李宁", "新百伦", "耐克王", "阿迪王"];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem("search", jsonStr);

  // 2-动态渲染历史记录
  function render() {
    // 获取所有历史记录，如果没有用空数组表示
    var str = localStorage.getItem('search') || '[]';
    var arr = JSON.parse(str);
    console.log(arr);
    $('.search-content').html(template("tmp", {list:arr}));
  }
  render();

  // 3-清空历史记录
  // 点击清空按钮，弹出模态框，点击确认后用removeItem(k)清除search的数据
  $('.search-content').on('click', '.clear', function(){
    mui.confirm('是否清空历史记录?', '清空历史', ['否', '是'], function(data){
      // data.index索引值
      if(data.index == 1){
        // 进行清空
        localStorage.removeItem('search');
        // 重新渲染
        render();
      }
    })
  });


  // 4-删除指定的历史记录
  $('.search-content').on('click', '.del', function() {
    var that = this;
    mui.confirm('确定要删除记录么?', '删除记录' , ['否', '是'], function(data){ 
      if ( data.index == 1 ){
        // 获取id
        var id = $(that).data('id');
        // 获取JSON字符串数据 转成数组
        var arr= JSON.parse(localStorage.getItem('search'));
        // 减去该条记录
        arr.splice(id,1);
        // 转成JSON字符串,存储到LS中
        localStorage.setItem('search', JSON.stringify(arr));
        // 重新渲染
        render();
      }
    })
  })

  // 5-添加搜索记录
  // 长度不能大于8条 始终保留最近8条
  // 不能重复
  $('.search-btn').click(function(){
    var txt = $('.search-txt').val();
    $('.search-txt').val('');//先清空一下

    // 判断是否为空
    if(txt.trim().length == 0){
      mui.toast('请输入搜索内容');
      return;
    }

    //去LS取数据 
    var arr = JSON.parse(localStorage.getItem('search') || '[]' )

    // 添加前判断是否已有，有的话去重
    var index = arr.indexOf(txt);//如果不存在返回-1
    if (index > -1) {
      // 删除之前那条记录
      arr.splice(index,1);
    }

    // 往前面添加
    arr.unshift(txt);
    // 判断最大长度>8 删除最后一条
    if (arr.length > 8) {
      arr.pop()
    }

    // 存储到LS中
    localStorage.setItem('search',JSON.stringify(arr));
    // 重新渲染
    render();

    // 跳转到搜索页
    // 页面间传值用get方式
    location.href = 'searchList.html?key=' + txt;
  })






})

