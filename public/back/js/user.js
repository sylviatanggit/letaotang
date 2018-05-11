$(function(){
  
  var currentpage = 1;
  var  pageSize = 5;
  
  render();
  
    function render(){
      $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{
          page: currentpage,
          pageSize: pageSize
        },
        dataType:'json',
        success:function( info ){
          // console.log(info);
          $('.lt_content tbody').html(template('user_tmp',info));


          // //  分页插件
          $("#pagintor").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentpage,//当前页
            totalPages: Math.ceil(info.total / info.size ),//总页数
            size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked:function(event, originalEvent, type,page){
              currentpage = page;
              render();
            }
          });
        }
      });
    }

  
//    注册按钮事件
  $('.lt_content tbody').on('click','.btn',function(){
    // console.log('哈哈');
    var id= $(this).parent().data("id");
    // console.log(id);
    var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
    
    $('#status_changeModal').modal('show');
  
    $('#submitBtn').off().click(function(){
      // alert('哈哈');
       $.ajax({
         type:'post',
         url:'/user/updateUser',
         data:{
           id: id,
           isDelete: isDelete
         },
         success:function(info){
           console.log(info);
           $('#status_changeModal').modal('hide');
           render();
         }
       })
    })
    
  })

    
    
    
    
    
    
});