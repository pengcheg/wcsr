	/*添加H5页面调用原生代码规则*/
	var locationOrigin = location.origin;
	var locationHost = location.host;
	// flag 0生产环境  
	var flag = null;
	var bdgw = null; 
	var shareTitle = $("#title").val() || "";//获取分享title的隐藏域的值
	var shareContent = $("#content").val() || "";//分享内容的隐藏域
	var shareUrl = $("#url").val() || "";
	var shareImgUrl = $("#imgurl").val() || "";
	locationOrigin.indexOf("app.zhugedai.com")!==-1?flag = 0:flag = 1
	if(flag === 0){
		bdgw = "bdgw"
	}else{
		bdgw = "bdgwdev"
	}
	$(".bd-regist").prop("href",bdgw+'://jumpRegist/?');//跳注册
	$(".bd-callCener").prop("href",bdgw+'://callCenter/?{"number": "4008067877"}');//拨打客服电话用此操作指令
	$(".bd-closeView").prop("href",bdgw+'://closeView/?');//关闭当前H5页面用此操作指令
	$(".bd-jumpLogin").prop("href",bdgw+'://jumpLogin/?');//跳转登录界面用此操作指令
	$(".bd-jumpMine").prop("href",bdgw+'://jumpMine/?');//跳转我的
	$(".bd-jumpProductList").prop("href",bdgw+'://jumpProductList/?');//跳转到产品列表
	$("#qrcodeValue").val(locationOrigin+'/bandao-app/wap/registerPage?referrer='+$("#userId").val())//二维码赋值val
	$(".bd-myPartner").each(function(){$(this).prop("href",bdgw+'://jumpMyPartner/?{"type":1}');})//jumpMyPartner 1代表我的合伙人   2代表奖励记录
	$(".bd-myReward").each(function(){$(this).prop("href",bdgw+'://jumpMyPartner/?{"type":2}');})
	/*跳转到原生分享*/
	$(".bd-partnerShare").each(function(){$(this).prop("href",bdgw+'://jumpShared/?{"title":"'+shareTitle+'","content":"'+shareContent+'","imageUrl":"https://'+locationHost+'/bandao-app/upfiles'+shareImgUrl+'","url":"'+locationOrigin+shareUrl+'?referrer='+$("#userId").val()+'"}');})
	var jumpH5 = function(url,index,encode){
		//encode ：1对URL编码， 0不需要
		if(!index){
			index = 0;
		}
		if(!encode){
			encode = 0;
		}
		$(".bd-jumpH5").eq(index).prop("href",bdgw+'://jumpH5/?{"url": "'+locationOrigin+url+'","encode":'+encode+'}');
	}
	var jumpProductDetail = function(productId){
		$(".bd-jumpProductDetail").prop("href",bdgw+'://jumpProductDetail/?{"url": "'+productId+'"}');
	}
	/*添加H5页面调用原生代码规则结束*/
	//格式化为万元
	function formatNum10000(){
		var formatNum10000 = $(".formatNum10000")
		var length = $(".formatNum10000").length;
		for(var i=0;i<length;i++){
			var textNum = (+formatNum10000.eq(i).text()/10000)+"万元";
			formatNum10000.eq(i).text(textNum)
		}
	}
	formatNum10000();
	//查询url参数
	function getQueryString(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}