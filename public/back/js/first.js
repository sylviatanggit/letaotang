$(function(){
  var currentpage = 1;
  var pageSize = 5;
  render();
  
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page: currentpage,
        pageSize: pageSize
      },
      success:function( info ){
        console.log(info);
        $('table tbody').html( template('first-tmp',info ));
  
        
        //分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page,//当前页
          totalPages: Math.ceil( info.total / info.size),//总页数
          size:"small",//设置控件的大小，mini, small, normal,large
          onPageClicked:function(a,b,c,page){
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentpage = page;
            render();
          }
        });
      }
    })
  }

  
//  添加按钮
  $('#addBtn').click(function() {
    $('#addModal').modal("show");
    
    //进行表单校验
    $('#form').bootstrapValidator({
      
      // 指定校验时的图标显示
      feedbackIcons: {
        // 校验成功的
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        categoryName:{
          validators:{
            notEmpty:{
              message:"请输入一级分类"
            }
          }
        }
      }
    });
    
    //阻止表单提交，
    $('#form').on("success.form.bv",function( e ){
      e.preventDefault();
      
      $.ajax({
        type:"post",
        url: "/category/addTopCategory",
        data: $('#form').serialize(),
        success:function( info ){
          console.log(info);
          if( info.success ){
            $('#addModal').modal('hide');
            currentpage = 1;
            render();
            
          //  重置表单
            $('#form').data("bootstrapValidator").resetForm( true );
          }
        }
      })
    })
    
    
  });
  
  
  
  
  
  
});