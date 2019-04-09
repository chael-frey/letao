$(function(){
    loginCheck()    
    // 点击登录事件
    function loginCheck(){
        $(".btn-login").on("tap",function(){
                var user=$(".userName").val();
                var pwd=$(".userPwd").val();
                if(user==""){
                    mui.toast('账号不能为空',{ duration:'long', type:'div' });
                    return;
                }
                if(pwd==""){
                    mui.toast('密码不能为空',{ duration:'long', type:'div' });
                    return;
                }
                console.log(1);
                $.ajax({
                    url:"/user/login",
                    type:"post",
                    data:{
                        username:user,
                        password:pwd
                    },
                    success:function(data){
                        if(data.error==403){
                            mui.toast(data.message, {
                                duration: 'short',
                                type: 'div'
                            });
                        }else{
                            var url= getQueryString("returnUrl");
                            location=url;
                        }
                    }
                })
          }
        )
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