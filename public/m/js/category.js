// 渲染左侧商品分类
function queryTopCategory(){
    $.ajax({
        url:"/category/queryTopCategory",
        success:function(obj){
            var html=template("leftTempLate",obj);
            $(".left .mui-table-view").html(html);
            leftClick()
        }
    });
}
//渲染右侧商品目录
function querySecondCategory(id){
    $.ajax({
        url:"/category/querySecondCategory",
        data: { id: id },
        success:function(obj){
            var html=template("rightTempLate",obj);
            $(".right .mui-row").html(html);
        }
    });
}
// 左侧分类点击事件
function leftClick(){
    var lis=$(".left .mui-table-view li");
    lis.on("click",function(){
        $(this).addClass("active").siblings().removeClass("active");
        querySecondCategory($(this).data("id"));
    })
}

$(function(){
    mui('.left .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,
        indicators: false,
    });
    mui('.right .mui-scroll-wrapper').scroll({
        deceleration: 0.0005 ,
        indicators: true,
    });
    queryTopCategory();
    querySecondCategory(1);
})