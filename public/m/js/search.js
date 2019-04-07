$(function(){
    addHistory();
    queryHistory();
    clearHistory();
})
// 添加记录
function addHistory(){
    $(".btn-search").on("tap",function(){
        var search=$(".input-search").val().trim();
        if(search==""){
            return;
        }
        var arr=localStorage.getItem("searchHistory");
        if (arr == null) {
            // 5.2 只需要把arr赋值为空数组
            arr = [];
        } else {
            // 5.3 如果之前有数据 把字符串转成数组
            arr = JSON.parse(arr);
        }
        arr = uniq(arr);
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == search) {
                arr.splice(i, 1);
                i--;
            }
        }
        arr.unshift(search);
        localStorage.setItem('searchHistory', JSON.stringify(arr));
        $('.input-search').val('');
        queryHistory();
        // console.log("productlist.html?search="+search);
        location="productlist.html?search="+search;
    })
}
// 数组去重
function uniq(arr){
    var temp=[];
    for(var i=0;i<arr.length;i++){
        if(temp.indexOf(arr[i]) == -1) {
            temp.push(arr[i]);
        }
    }
    return temp;
}
// 查找历史
function queryHistory(){
    var arr=localStorage.getItem("searchHistory");
    if(arr==null){
        arr=[];
    }else{
        arr=JSON.parse(arr);
       
    }
     // 渲染模板
     var html=template("search-history",{
        rows:arr
    });
    $('.search-history ul').html(html);
    deleteHistory();
    
}
// 删除记录
function deleteHistory(){
    $(".fa-close").on("tap",function(){
        var index=$(this).data("index");
        var arr=JSON.parse(localStorage.getItem("searchHistory"));
        arr.splice(index,1);
        localStorage.setItem("searchHistory",JSON.stringify(arr));
        queryHistory();
    })
}
// 清空记录
function clearHistory(){
    $(".btn-clear").on("tap",function(){
        localStorage.removeItem("searchHistory");
        queryHistory();
    })
}
