$(function(){
   mui.init({
    //    配置下拉刷新以及上拉加载
    pullRefresh:{
        container:".mui-scroll-wrapper",
        down:{
            auto: true,
            callback: function(){
                $.ajax({
                    type:'get',
                    url:'/cart/queryCart',
                    success:function(data){
                      setTimeout(function(){
                          if(data.error === 400){
                             location.href = "login.html?retUrl=" + location.href;
                             return;
                          }
                          //获取到的购物车数据是一个数组,渲染到页面中，data是一个数组
                          $(".mui-table-view").html(template("tpl",{list:data}));
                          
                          //结束下拉刷新
                          mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                      },500)
                    }
                })
            }
        }
    }
   })

})