$(function(){
   currentpage = 1;
   size = 2;
   render();
   function render(){
     $.ajax({
       type:'get',
       url:'/product/queryProductDetailList',
       data:{
         page: currentpage,
         pageSize: size
       },
       success:function(info){
         console.log(info);
         $('tbody').html(template('product_tmp', info ) );
  
         //   分页
         $('#paginator').bootstrapPaginator({
           bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
           currentPage: currentpage,//当前页
           totalPages: Math.ceil( info.total / info.size ) ,//总页数
           size:"small",//设置控件的大小，mini, small, normal,large
           onPageClicked:function(a,b,c,page){
             //为按钮绑定点击事件 page:当前点击的按钮值
              currentpage = page;
             render();
           }
         })
         
       }
     })
   }

//   添加商品模块
$('.add_btn').click(function(){
  // alert('行不行');
  $('#add_product').modal('show');
  
  // 请求所有的二级分类列表, 进行页面渲染, 模拟的接口 (page:1, pageSize:100)
   $.ajax({
     type:'get',
     url:'/category/querySecondCategoryPaging',
     data:{
       page:1,
       pageSize: 100,
     },
     success:function( info ){
       console.log(info);
       $('.dropdown-menu').html( template( "dropdownTpl", info ) )
     }
   })
});
  
  // 3. 选择二级分类功能, 通过事件委托来做
  
  $('.dropdown-menu').on('click','a',function(){
     var txt = $(this).text();
     $('#dropdownText').text(txt);
     
     var id = $(this).data('id');
     $('[name="brandId"]').val( id );
     
    
  });
  
  // 4. 多文件上传步骤
  // 1. 引入插件包
  // 2. 配置结构, name, data-url multiple(配置可以选择多文件)
  // 3. 进行插件初始化
  $('#fileupload').fileupload({
    dataType:"json",
    done:function( e,data ){
      var picUrl = data.result.picAddr;
      var picObj = data.result;
      $('#imgBox').prepend('<img src="'+picUrl+'" width="100" alt="">');
      
      picArr.unshift( picObj );
      
      if( picArr.length > 3 ){
        picArr.pop();
        
        $('#imgBox img:last-of-type').remove();
        }
  
      // 说明满足上传 3 张的图片的条件了, 手动更新 picStatus 隐藏域的校验状态
      // console.log(picArr);
      if( picArr.length === 3 ){
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
      }
    }
  });
  
  //5.表单校验功能
  $('#form').bootstrapValidator({
    excluded:[],
    // 指定校验时的图标显示
    feedbackIcons: {
      // 校验成功的
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    
    //校验的字段
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类',
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
  
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
      
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存要求, 必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品库存要求, 两位数字-两位数字, 例如: 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入原价"
          }
        }
      },
      
      //图片是否上传满三张的校验
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }
  });

  
  $('#form').on("success.form.bv",function( e ){
    
    e.preventDefault();
    
    var params = $('#form').serialize();
    
    params += "picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    params += "&picName2=" + picArr[1].picName + "&picAddr2="+ picArr[1].picAddr;
    params += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: params,
      success: function( info ){
        
        if( info.success ){
          
          $('#addModal').modal("hide");
          
          $('#form').data("bootstrapValidator").resetForm(true);
          
          //重新渲染第一页
          currentpage = 1;
          render();
          
          $('#dropdownText').text('请选择二级分类');
          $('#imgBox img').remove();
          
          
          //清空数组
          picArr = [];
        }
      }
    })
  })












//   入口函数闭合
});