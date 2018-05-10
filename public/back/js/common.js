

  // 登录拦截 调用接口来判断是是否需要拦截
  //判断登陆页面的地址栏是都有login.html字符串有就不需要拦截
  if(location.href.indexOf("login.html") == -1){
    //indexOf 的用法忘记了？
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      data:"json",
      dataType:'json',
      success:function( info ){
        console.log(info);
      if( info.error === 400 ){
        location.href = "login.html";
      }
    }

    })
  }


//禁用进度条的属性
NProgress.configure({ showSpinner: false });

//了解ajax全局事件,注册对应对应事件，帮助完成ajax提交，ajax结束，进度条完成

$(document).ajaxStart(function(){
  NProgress.start();
});

$(document).ajaxStop()
  setTimeout(function(){
    NProgress.done();
  },500);


//菜单切换
$(function(){
  
  $('.category').click(function () {
    // console.log('哈哈');
    $('.child').stop().slideToggle();
  })
  
  
  //点击菜单按钮，进行切换菜单
  $('.right .right_menu').click(function(){
    // console.log('哈哈');
    $('.left').toggleClass("hideleft");
    $('.It_top').toggleClass("hideleft");
    $('.right').toggleClass("hideleft");
  })
  
  
  
  //退出按钮 跳出模态框 实现退出
  $('.log-out').click(function(){
     $('#logoutModal').modal("show");
  });
  
  $('#logout_btn').click(function(){
    //调用退出接口
    $.ajax({
      type:'get',
      url:'/employee/employeeLogout',
      dataType:'json',
      success:function(info){
        // console.log(info);
        if( info.success ){
          location.href = "login.html";
        }
      }
    })
  });
  
});



