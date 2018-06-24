$(function(){
  
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function( info ){
      // console.log(info);
      $('.lt_category_left ul').html(template('cate_tmp',info));
  
      // 一进入页面, 应该渲染第一个一级分类对应的二级分类
      renderSecondById( info.rows[0].id );
    }
  });
  
  //给左侧一级列表添加点击事件，通过事件委托
  $('.lt_category_left ul').on('click','a',function(){
    var id = $(this).data('id');
    renderSecondById( id );
    $(this).addClass('current').parent().siblings().find('a').removeClass('current');
  });
  
  
  
  //渲染二级分类
  function renderSecondById( id ){
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data:{id:id},
      success: function( info ){
        console.log(info);
        var htmlStr = template( "rightTpl", info );
        $('.lt_category_right ul').html( htmlStr );
      }
    })
  }
  
});