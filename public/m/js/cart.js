$(function(){
    var page=1;
    pullRefresh();
    // 购物车下拉刷新和上拉加载
    function pullRefresh(){
        mui.init({
            pullRefresh: {
                container: '.mui-scroll-wrapper',
                down: {
                    auto: true,
                    callback:pulldownRefresh
                },
                up: {
                    contentrefresh: '正在加载...',
                    callback:pullupRefresh
                }
            }
        });
    }
    function pullupRefresh(){
        page++;
        setTimeout(function(){
            $.ajax({
                url:"/cart/queryCartPaging",
                data:{
                    page:page,
                    pageSize:4
                },
                success:function(obj){
                    if(obj.data){
                        var html=template("cartTpl",obj);
                        $(".cart-list").append(html);
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                    }else{
                        mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                    }
                   
                    
                }
            })
        },1000)
    }
    function  pulldownRefresh(){
        setTimeout(function(){
            $.ajax({
                url:"/cart/queryCartPaging",
                data:{
                    page:1,
                    pageSize:5
                },
                success:function(obj){
                    var html=template("cartTpl",obj);
                    $(".cart-list").html(html);
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    page = 1;
                }
            })
        },1000)
    }
    
})