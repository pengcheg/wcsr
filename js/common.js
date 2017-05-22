//设置HTML font-size 可以使用rem
(function(){
	var width = $(window).width()/12.42;
	$("html").css("font-size",width+"px");
	$(window).resize(function(){
		var width = $(window).width()/12.42;
		$("html").css("font-size",width+"px");
	})
})()

//获取URL参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}