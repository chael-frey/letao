var slider = mui("#slider");
slider.slider({
    interval: 5000
});
// 初始化滚动
mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,
    indicators: false,
});