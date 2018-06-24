$(function(){
  $('.btn_login').on('click',function(){
    // 获取input框中去掉空格后的value值
    var username = $("[name='username']").val().trim();
    var password = $("[name='password']").val().trim();
  
    //校验
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    
    if(!password){
     mui.toast("请输入密码");
     return false;
    }
    // 校验成功之后再请求数据
    $.ajax({
        type:"post",
        url:"/user/login",
        data:{
            username: username,
            password: password
        },
        success: function(data){
           if(data.error === 403){
             mui.toast(data.message);
           }
           if(data.success){
           var search = location.search;
           if(search.indexOf("retUrl") != -1){
               //说明需要回跳
              search = search.replace("?retUrl=","");
              location.href = search;
           }else {
               //跳转到会员中心
               location.href = "user.html";
           }
           }
        }
    })
  })

})