$(function(){
//  区域滚动初始化
  mui('.mui-scroll-wrapper').scroll({
    indicators: false,
  });
  
  //获得slider插件对象，mui('选择器')可以生成一个mui实例对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
  });
  
});

//作用：根据传入的key值，解析地址栏参数，获取对应的value值；

