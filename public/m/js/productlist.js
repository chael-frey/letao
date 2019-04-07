$(function(){
    var search;
    // 页面加载完成函数
    searchProduct();
    // 当前页面搜索功能
    nowSearchProduct();
    sortProduct();
    pullRefresh();
    // 初始化滚动函数
    function pullRefresh(){
        mui.init({
            pullRefresh: {
                container: "#pullrefresh", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
                down: {
                    contentdown: "正在刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "刷新完毕", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: '刷新中...',
                    callback: pulldownRefresh
                },
                up: {
                    contentdown: "正在加载", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    contentover: "加载完毕", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    contentrefresh: '加载中...',
                    callback: pullupRefresh
                }
            }
        });
        // 下拉回调函数
        function pulldownRefresh() {
            // 为了模拟请求延迟添加一个定时器
            setTimeout(function () {
                //    下拉刷新业务功能分析
                // 1. 请求刷新刷新页面
                queryProduct({
                    proName: search,
                    page: 1,
                    pageSize: 2
                });
                // 2. 结束转圈圈 调用结束方法
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
            }, 1500)
        }
        var page=1;
        // 上滑加载的回调函数  因为要额外增加数据，所以逻辑代码重写
        function pullupRefresh(){
            setTimeout(function(){
                page++;
                $.ajax({
                    url:"/product/queryProduct",
                    data:{
                        page:page,
                        pageSize:2,
                        proName: search
                    },
                    success:function(res){
                        if (res.data.length > 0) {
                            // 4. 调用模板指定模板id和当前后台返回的数据对象
                            var html = template('product-tpl', res);
                            // 5. 渲染使用追加渲染 使用append 追加dom元素到mui-row（不能使用html）
                            $('.mui-card-content .mui-row').append(html);
                            // 6. 有数据还是要结束转圈圈 只是不需要传参
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        } else {
                            // 7. 没有数据结转圈圈 并提示没有数据了
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }
                    }
                })
            },1000)
        }
   
    }
     // 排序函数
     function sortProduct(){
        $(".mui-card-header a").on("tap",function(){
            var type=$(this).data("type");
            if($(this).data("sort")==1){
                $(this).data("sort",2).addClass("active").siblings().removeClass("active");
                $(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up")
            }else{
                $(this).data("sort",1).addClass("active").siblings().removeClass("active");
                $(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down")
            }
            var sort=$(this).data("sort");
            var params={
                proName: search,
                pageSize: 2
            }
            params[type]=sort;
            queryProduct(params)
        })
    }
    // 搜索商品函数
    function searchProduct(){
        search=getQueryString("search");
        queryProduct({
            proName: search
        });
    }
    // 当前页面搜索函数
    function nowSearchProduct(){
        $(".btn-search").on("tap",function(){
            search=$(".input-search").val().trim();
            if (search == '') {
                return;
            }
            queryProduct({
                proName: search
            });
        })
    }
    // 发送请求函数
    function queryProduct(params){
        params.page = params.page || 1;
        params.pageSize = params.pageSize ||2;
        $.ajax({
            url:"/product/queryProduct",
            data:params,
            success:function(obj){
                var html=template("product-tpl",obj);
                $(".mui-card-content .mui-row").html(html)
            }
        })
    }
    // 正则提取url传值函数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
});