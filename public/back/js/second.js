$(function() {
  var currentpage = 1;
  var pagesize = 5;
  render();
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentpage,
        pageSize: pagesize
      },
      success: function (info) {
        // console.log(info);
        $('table tbody').html(template('second_tmp', info));
        //  分页插件
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentpage,
          totalPages: Math.ceil(info.total / info.size),
          size: 'small',
          onPageClicked: function (a, b, c, page) {
            currentpage = page;
            render();
          }
        })
      }
    })
  }


//注册按钮
  $(function () {
    
    $('#addbtn').click(function () {
      $('#addmodal').modal('show');
      
      $.ajax({
        type: 'get',
        url: "/category/queryTopCategoryPaging",
        data: {
          page: 1,
          pageSize: 100
        },
        success: function (info) {
          // console.log(info);
          $('.dropdown-menu').html(template('addsecond_tmp', info));
        }
      })
    });
    
    
    //因为是自动生成的所以用事件委托
    $('.dropdown-menu').on('click', "a", function () {
      // alert('哈哈');
      var txt = $(this).text();
      // console.log(txt);
      $('#dropdownText').text(txt);
      //状态更新到input框
      $('[name = "categoryId"]').val($(this).data("id"));
      
      //手动更新校验状态
      $('#form').data("bootstrapValidator").updateStatus('categoryId', 'VALID');
    });
    
    
    //4.配置文件上传
    //引fileupload的文件包
    //写结构
    //写js，进行文件上传初始化，配置回调函数，进行图片上传回调处理
    $('#fileupload').fileupload({
      dataType: "json",
      done: function (e, data) {
        
        //拿到上传完成得到的图片地址
        var picUrl = data.result.picAddr;
        
        $('#imgBox img').attr('src', picUrl);
        $('[name = "brandLogo"]').val(picUrl);
        
        //更新校验状态为VALID
        $('#form').data("bootstrapValidator").updateStatus("brandLogo", 'VALID');
        
      }
      
    })
    
    
    //5.表单校验
    $('#form').bootstrapValidator({
      
      //默认对隐藏域不进行校验，所以需要重置
      excluded: [],
      
      feedbackIcons: {
        // 校验成功的
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      
      //配置校验字段
      fields: {
        categoryId: {
          validators: {
            notEmpty: {
              message: "请选择一级分类"
            }
          }
        },
        
        brandName: {
          validators: {
            notEmpty: {
              message: "请输入二级分类名称"
            }
          }
        },
        brandLogo: {
          validators: {
            notEmpty: {
              message: "请上传图片"
            }
          }
        }
      }
      
    })
    
    
    //检验成功ajax提交
    $('#form').on('success.form.bv', function (e) {
      e.preventDefault();
      
      console.log($('#form').serialize());
      
      $.ajax({
        type: 'post',
        url: "/category/addSecondCategory",
        data: $('#form').serialize(),
        success: function (info) {
          console.log(info);
          if (info.success) {
            $('#addmodal').modal('hide');
            currentPage = 1;
            render();
            
            //重置表单
            $('#form').data('bootstrapValidator').resetForm( true );
            $('#dropdownText').text('请选择一级分类');
            $('#imgBox img').attr('src','./images/none.png');
          }
        }
      })
      
    })
    
    
  })
  
  
})
