
$(function(){
    var id=getQueryString("id");
    quertDetail(id);
    addCart();
    // 添加购物车函数
    function addCart(){
        $(".btn-add-cart").on("tap",function(){
            var num=mui(".mui-numbox").numbox().getValue()
            var size=$(".detail-size .mui-btn-warning").data("size");
            if(!size){
                mui.toast('请选择尺码',{ duration:1000, type:'div' });
                return;
            }else if(num==0){
                mui.toast('商品数量不能为0',{ duration:'long', type:'div' });
                return;
            }
            
            //将数据提交至后台处理
            $.ajax({
                type:"post",
                url:"/cart/addCart",
                data:{
                    size:size,
                    num:num,
                    productId:id
                },
                success:function(obj){
                    console.log(obj);
                   if(obj.error==400){
                           location = 'login.html?returnUrl=' + location.href;
                   }else{
                        mui.confirm('是否前往购物车结账', '添加成功', ['确定', '取消'], function (e) {
                       
                            if (e.index == 0) {
                                location = 'cart.html';
                            } else {
                                mui.toast('请继续添加!', {
                                    duration: 1000,
                                    type: 'div'
                                });
                            }
                        })
                   }
                }
            })
        })
    }
    
    // 查找商品详情函数
    function quertDetail(id){
        $.ajax({
            url:"/product/queryProductDetail",
            data:{
                id:id
            },
            success:function(obj){
                console.log(obj);
                var newArr=[];
                var arr=obj.size.split("-");
                for(var i=+arr[0];i<=+arr[1];i++){
                    newArr.push(i);
                }
                obj.size=newArr;
                var html=template("detailTpl",obj);
                $(".mui-scroll").html(html);
                // 渲染完页面给组件重新初始化
                mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
                mui('.mui-scroll-wrapper').numbox().setOption('step',1);
                mui('.mui-slider').slider({
                    interval: 5000
                });
                // 选择尺码事件
                $(".detail-size .mui-btn").on("tap",function(){
                    $(this).addClass("mui-btn-warning").removeClass("mui-btn-outlined").siblings().removeClass("mui-btn-warning").addClass("mui-btn-outlined");
                })
            }
        })
    }
    // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
})