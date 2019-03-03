$(function () {
    /* 1. 完成分类左侧列表动态渲染
        1. 使用ajax请求数据
        2. 使用模板引擎渲染列表 */
    // 1. 使用ajax请求数据
    $.ajax({
        // 因为已经在localhost:3000域名下打开页面
        url: "/category/queryTopCategory",
        success: function (data) {
            // data是后台返回给我们的数据 返回就已经是对象 因为模板引擎要求 后台直接返回模板引擎需要的格式
            // data是这个对象 遍历的是data对象的rows数组
            // console.log(data);
            // 2. 使用模板函数调用 template函数 第一个参数模板id categoryLeftTpl 第二个是数据对象
            // 我们现在后台返回data已经是数据对象了 可以直接使用  
            var html = template('categoryLeftTpl', data);
            // 3. 把生成模板渲染到ul里面
            $('.category-left ul').html(html);
        }
    })

    // 存储上次点击id
    var oldId=0;

     // 页面刚刚加载也需要执行 请求右边 默认请求id为1的 由于封装了函数 传人id为1即可
     querySecondCategory(1);
    //2.给左侧分类里注册点击事件,由于是模板生成,用委托注册
    $('.category-left ul').on('tap', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');

        //2.1 点击li,显示右侧分类对应的列,
        //获取左侧li的id,通过自定义属性获取
        //  var id = this.dataset['id'];
        var id = $(this).data('id');
        // console.log(id);
         // 如果点击id没有发生变化就不执行请求
         if(id==oldId){
             return false;
         }
         console.log(id);
         // 4. 根据点击的id请求分类右侧的数据 调用封装函数 传人当前点击li的id
         querySecondCategory(id);
         // 请求完成把id赋值给oldId
         oldId=id;


    })

     // 封装一个请求右侧分类的函数 由于id不是固定 通过参数传递
     function querySecondCategory(id){
         $.ajax({
             url:"/category/querySecondCategory",
             data:{id:id},
             success:function (data) {
                 console.log(data);
                  //   5. 调用模板
                  var html=template('categoryRightTpl',data)
                  //   6. 渲染到右侧分类
                  $('.category-right .mui-row').html(html); 
                 
               }
         })

     }

    // 3. 初始化区域滚动实现分类左侧滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


})