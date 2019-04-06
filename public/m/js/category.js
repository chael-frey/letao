mui('.left .mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,
    indicators: false,
});
mui('.right .mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,
    indicators: true,
});
// 左侧商品分类
$.ajax({
    url:"/category/queryTopCategory",
    success:function(obj){
        var html=template("leftTempLate",obj);
        console.log(obj);
        $(".left .mui-table-view").html(html);
    }
});
// 右侧商品目录
$.ajax({
    url:"/category/querySecondCategory",
    // success:function(obj){
        // console.log(obj);
        // var html=template("leftTempLate",obj);
        // console.log(html);
        // $(".left .mui-table-view").html(html);
    // }
});