$(function(){
  
  $('#form').bootstrapValidator({
    
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      fields:{
        username: {
          validators: {
            notEmpty: {
              message: '用户名不能为空'
            },
            callback:{
              message:'用户名不存在'
            }
          }
        },
          
        password:{
            validators:{
              notEmpty:{
                message:'密码不能为空'
              },
              stringLength:{
                min: 6,
                max: 12,
                message:'密码长度必须在6到30位之间'
              },
              callback:{
                message:'密码错误'
              }
            }
        }

        }
  })


  
  //后台校验
  $('#form').on('success.form.bv',function(e){
    e.preventDefault();
    // alert('haha');
    // console.log($('#form').serialize());
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href = "index.html";
        }
        if(info.error == 1000){
          // 将密码框, 校验状态改成 错误状态 INVALID
          // updateStatus 三个参数
          // 参数1: 字段名称
          // 参数2: 校验状态  VALID成功  INVALID失败
          // 参数3: 校验规则(主要是用来设置, 提示信息的)
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if( info.error == 1001 ){
          $('#form').data("bootstrapValidator").updateStatus('password',"INVALID","callback");
        }
      }
    });
    
  //  实现重置功能
    $('[type="reset"]').click(function(){
      $('#form').data('bootstrapValidator').resetForm(true);
    })
    
    
    
    
    
    
  })


});