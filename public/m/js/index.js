$(function () { 
      // 1.1 MUI 初始化轮播图设置自动轮播图
      var gallery = mui('.mui-slider');
      gallery.slider({
          interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

    
      // 2. MUI的初始化区域滚动
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  
  
 })