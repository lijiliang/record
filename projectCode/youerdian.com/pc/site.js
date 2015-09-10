//关闭product购物车弹出的div
function closeCartDiv()
{
	$('#product_myCart').hide('slow');
	$('.submit_join').removeAttr('disabled','');
}

//商品移除购物车
function removeCart(urlVal,goods_id,type)
{
	var goods_id = parseInt(goods_id);

	$.getJSON(urlVal,{goods_id:goods_id,type:type},function(content){
		if(content.isError == false)
		{
			$('[name="mycart_count"]').html(content.data['count']);
			$('[name="mycart_sum"]').html(content.data['sum']);
		}
		else
		{
			alert(content.message);
		}
	});
}

//添加收藏夹
function favorite_add_ajax(urlVal,goods_id,obj)
{
	$.getJSON(urlVal,{goods_id:goods_id,nocache:((new Date()).valueOf())},function(content){
		if(content.isError == false)
		{
			obj.value = content.message;
		}
		else
		{
			alert(content.message);
		}
	});
}

//寄存购物车[ajax]
function deposit_ajax(urlVal)
{
	$.getJSON(urlVal,{is_ajax:'1'},function(content){
		if(content.isError == false)
		{
			alert(content.message);
		}
		else
		{
			alert(content.message);
		}
	});
}

//购物车展示
function showCart(urlVal)
{
	$.getJSON(urlVal,{sign:Math.random()},function(content)
	{
		var cartTemplate = template.render('cartTemplete',{'goodsData':content.data,'goodsCount':content.count,'goodsSum':content.sum});
		var cartTemplate1 = template.render('cartTemplete1',{'goodsData':content.data,'goodsCount':content.count,'goodsSum':content.sum});
		//$('#div_mycart').html(cartTemplate);
		$('#topTable').html(cartTemplate);
		$('#topTable1').html(cartTemplate1);
		$('[name="mycart_count"]').text(content.count);
		$('[name="mycart_sum"]').text(content.sum);
		//$('#div_mycart').show();
	});
}

//自动完成
function autoComplete(ajaxUrl,linkUrl,minLimit)
{
	var minLimit = minLimit ? parseInt(minLimit) : 2;
	var maxLimit = 10;
	var keywords = $.trim($('input:text[name="word"]').val());

	//输入的字数通过规定字数
	if(keywords.length >= minLimit && keywords.length <= maxLimit)
	{
		$.getJSON(ajaxUrl,{word:keywords},function(content){

			//清空自动完成数据
			$('.auto_list').empty();

			if(content.isError == false)
			{
				for(var i=0; i < content.data.length; i++)
				{
					var searchUrl = linkUrl.replace('@word@',content.data[i].word);
					$('.auto_list').append('<li onclick="event_link(\''+searchUrl+'\')" style="cursor:pointer"><a href="javascript:void(0)">'+content.data[i].word+'</a>约'+content.data[i].goods_nums+'个结果</li>');
					//鼠标经过效果
					$('.auto_list li').bind("mouseover",
						function()
						{
							$(this).addClass('hover');
						}
						);
					$('.auto_list li').bind("mouseout",
						function()
						{
							$(this).removeClass('hover');
						}
						);
				}
				$('.auto_list').show();
			}
			else
			{
				$('.auto_list').hide();
			}
		});
	}
	else
	{
		$('.auto_list').hide();
	}
}

//输入框
function checkInput(para,textVal)
{
	var inputObj = (typeof(para) == 'object') ? para : $('input:text[name="'+para+'"]');

	if(inputObj.val() == '')
	{
		inputObj.val(textVal);
	}
	else if(inputObj.val() == textVal)
	{
		inputObj.val('');
	}
}

//绑定事件
function bindEvent()
{
	$(".header_nav .item").die("click").live("click",function() {
		var index = $(".header_nav .item").index(this);
		sessionStorage.navNumber = index;
	});
	$(".topPopBox .item").die("click").live("click",function() {
		var index = $(".topPopBox .item").index(this);
		sessionStorage.navNumber = index;
	});
	$(document).off("click",".onliePic i").on("click",".onliePic i",function(){
		$(this).closest(".onliePic").hide();
	});
	$(document).off("click","#qiangquan").on("click","#qiangquan",function(){
		var zindex = 10000;
		var result;
		var dialog = genAlertDialog(478,478);
		var overLay = genOverLay();
		dialog.appendTo("body");
		$.getJSON('/site/getticket',{sign:Math.random(),'userid':$("input[name=fid]").val()},function(content){
			if(content.dealstatus == -1){
				alert('请登录后再领取');
				window.setTimeout(function(){
					location.href = "/simple/login";
				},1500);
			}else if(content.dealstatus == -2){
				alert('您还未绑定手机，请绑定后再领取');
			}else if(content.dealstatus == -3){
				alert("券被抢光了么么哒");
			}else if(content.dealstatus == -4){
				alert("已经抢过一次了么么哒");
			}else if(content.dealstatus == -5){
				alert('现在未到抢券时间:每天10:00-11:00,15:00-16:00么么哒！');
			}else if(content.dealstatus == -6) {
				alert('系统错误么么哒');
			}else{
				overLay.css("z-index" , zindex + 1).show();
				dialog.css("z-index" , zindex + 2).find(".result").html("<p>抢到100元组合优惠券！</p><p>1张50元，订单满199减50</p><p>2张20元，订单满99减20</p><p>1张10元，订单满59减10</p><p>请至个人中心—我的优惠券处查看哦。</p>").end().fadeIn(1500).show();
			}
		});
	});
	$(document).off("click",".alertDialog").on("click",".alertDialog",function() {
		$(this).hide();
		$(".diaOverLay").hide();
	});
	$(document).off("click",".adverDialog i").on("click",".adverDialog i",function() {
		$(".adverDialog").hide();
		$(".diaOverLay").hide();
	});
}

//初始化导航栏样式
function initHeadNav()
{
	var index = sessionStorage.navNumber;
	if(index) {
		$(".header_nav .item:eq(" + index + ")").addClass("hover").siblings().removeClass("hover");
		$(".topPopBox .item:eq(" + index + ")").addClass("hover").siblings().removeClass("hover");
	}else{
		$(".header_nav .item:eq(0)").addClass("hover").siblings().removeClass("hover");
		$(".topPopBox .item:eq(0)").addClass("hover").siblings().removeClass("hover");
	}
}
////遮罩层模块
//加载遮罩层
function loadDiaOverLay()
{
	//var zindex = $(".container").css("z-index");
	var zindex = 10000;
	var dia_x = ($(window).width() - 820)/2 + "px";
	var dia_y = ($(window).height() - 470)/2 + "px";
	if(document.cookie.indexOf("isFirst") != -1) {
		return;
	}else{
		var overLay = genOverLay();
		overLay.css("z-index" , zindex + 1).show();
		var dialog = genAdverDialog();
		dialog.appendTo("body");
		$(dialog).css({"z-index":zindex+2,"left":dia_x,"top":dia_y}).show();
	    bindEvent_RegGuideDialog();
	    document.cookie = "iweb_isFirst='yes';path=/";
	    //sessionStorage.usedKey = (new Date()).getDate();
	}
}

//生成注册引导窗口
function genRegGuideDialog()
{
	var domHtml = [];
	var dia_x = ($(window).width() - 819)/2 + "px";
	var dia_y = ($(window).height() - 468)/2 + "px";
	domHtml.push("<div class='regGuideDialog' style='position:fixed;width:819px;height:468px;top:" + dia_y + ";left:" + dia_x + ";background:url(/views/newtheme/resources/images/dia_Bg.jpg) no-repeat;'>");
	domHtml.push("<i style='width: 30px;height: 30px;display: inline-block;cursor:pointer;position: absolute;right: -30px;top: -30px;background:url(/views/newtheme/resources/images/X.png) no-repeat;'></i>");
	domHtml.push("<div class='diaDes' style='position:absolute;top:23px;left:177px;width:364px;height:364px;background:url(/views/newtheme/resources/images/taxt.png) no-repeat;'");
	domHtml.push("</div>");
	domHtml.push("<div style='width: 250px;height: 40px;position: absolute;bottom: -53px;left: 43px;'>");
    //domHtml.push("<input type='button' id='toRegister' style='width: 135px;height: 38px;margin-right: 15px;background:url(/views/newtheme/resources/images/btn01.jpg) no-repeat;'/>");
    //domHtml.push("<input type='button' id='toRegister' style='width: 93px;height: 38px;background:url(/views/newtheme/resources/images/btn02.jpg) no-repeat;'/>");
    domHtml.push("<span id='toRegister' style='display:inline-block;cursor:pointer;width: 131px;height: 38px;margin-right: 15px;background:url(/views/newtheme/resources/images/btn01.jpg) no-repeat;box-shadow: 1px 1px 1px #3C8691;'></span>");
    domHtml.push("<span id='toMore' style='display:inline-block;cursor:pointer;width: 93px;height: 38px;background:url(/views/newtheme/resources/images/btn02.jpg) no-repeat;box-shadow: 1px 1px 1px #3C8691;'></span>");
    domHtml.push("</div>");
    domHtml.push("</div>");
    return $(domHtml.join(""));
}

//生成广告窗口
function genAdverDialog()
{
	if($(".adverDialog").length != 0){
		return $(".adverDialog");
	}
	var domHtml = [];
	var dia_x = ($(window).width() - 820)/2 + "px";
	var dia_y = ($(window).height() - 470)/2 + "px";
	domHtml.push("<div class='adverDialog' style='position:fixed;width:820px;height:470px;cursor:pointer;top:" + dia_y + ";left:" + dia_x + ";background:url(/views/newtheme/resources/images/adverImg/adverDialog005.png) no-repeat;'>");
	domHtml.push("<i style='width: 30px;height: 30px;display: inline-block;cursor:pointer;position: absolute;right: -30px;top: -30px;background:url(/views/newtheme/resources/images/adverImg/del.png) no-repeat;'></i>");
	domHtml.push("</div>");
	return $(domHtml.join(""));
}

//生成弹窗
function genAlertDialog(w,h)
{
	if($(".alertDialog").length != 0){
		$(".alertDialog").remove();
	}
	var domHtml = [];
	var dia_x = ($(window).width() - w)/2 + "px";
	var dia_y = ($(window).height() - h)/2 + "px";
	domHtml.push("<div class='alertDialog' style='display:none;z-index:99;position:fixed;width:"+w+"px;height:"+h+"px;cursor:pointer;top:" + dia_y + ";left:" + dia_x + ";background:url(/views/newtheme/resources/images/mainCont/fdfdfd.png) center no-repeat;'>");
	domHtml.push("<i>×</i>");
	domHtml.push("<div class='result'></div>");
	domHtml.push("</div>");
    //$(domHtml.join("")).appendTo("body");
    return $(domHtml.join(""));
}
/*
//生成弹窗
function genAlertDialog(w,h,r,t)
{
	if($(".alertDialog").length != 0){
		return $(".alertDialog");
	}
	var domHtml = [];
	var dia_x = ($(window).width() - w)/2 + "px";
	var dia_y = ($(window).height() - h)/2 + "px";
	domHtml.push("<div class='alertDialog' style='z-index:99;position:fixed;width:"+w+"px;height:"+h+"px;cursor:pointer;top:" + dia_y + ";left:" + dia_x + ";'>");
    domHtml.push("<i style='width: 30px;height: 30px;display: inline-block;cursor:pointer;position: absolute;right: "+r+"px;top: "+t+"px;'></i>");
    domHtml.push("</div>");
    //$(domHtml.join("")).appendTo("body");
    return $(domHtml.join(""));
}*/

//注册引导窗口元素事件绑定
function bindEvent_RegGuideDialog()
{
	$(".regGuideDialog i").die("click").live("click",function(e){
		$(".diaOverLay,.regGuideDialog").fadeOut();
		e.stopPropagation();
	});

	$(".regGuideDialog #toRegister").die("click").live("click",function(e){
		$(".diaOverLay,.regGuideDialog").fadeOut();
		location.href = "/index.php?controller=simple&action=reg";
		e.stopPropagation();
	});

	$(".regGuideDialog").die("click").live("click",function(){
		$(".diaOverLay,.regGuideDialog").fadeOut();
		location.href = "/site/regactive";
	});
}

//广告窗口绑定事件
function bindEvent_AdverDialog()
{
	$(".adverDialog").on("click",function() {
		location.href = "/simple/introduce";
	});
	$(".adverDialog i").on("click",function(e){
		$(".diaOverLay,.adverDialog").fadeOut();
		e.stopPropagation();
	});
}

//发送邮件
function writeMail()
{
	art.dialog({'id':'tmpTan',content:"正在发送，请稍候......" ,lock:true});
	var email = $("#invite_table #email").val();
	var content = $("#invite_table #content").val();
	$.post("{url:/ucenter/invite_edit/}" , {'email':email , 'content':content} , function(c){
		alert("发送完毕！");
		art.dialog({'id':"tmpTan"}).close();
	});
}

function sendMail_order() {
	var domHtml = [];
	domHtml.push("<html><body>");
}

//通过微信、空间或者微博分享
function sharetofriend(plaform,invitecode)
{
	if(plaform == 'qzone')
	{
		window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=www.youerdian.com/simple/reg/code/' + invitecode + '&showcount=1&desc=我已经获得由茉莉妈妈(www.youerdian.com)悉心挑选的精美礼品一份啦！还有100元的优惠劵哦～获取方法非常简单，只需简单的几步既可完成。我的邀请码是'+invitecode+' ～你也来参加吧～注册链接：http://www.youerdian.com/simple/reg&summary=快用我的专属链接注册&title=&site=&pics=&style=203&width=98&height=22&otype=share');
	}
	if(plaform == 'weibo')
	{
		window.open("http://v.t.sina.com.cn/share/share.php?title=我已经获得由茉莉妈妈(www.youerdian.com)悉心挑选的精美礼品一份啦！还有100元的优惠劵哦～获取方法非常简单，只需简单的几步既可完成。我的邀请码是"+invitecode+"～你也来参加吧～注册链接：http://www.youerdian.com/simple/reg&url=www.youerdian.com/simple/reg/code/"+invitecode+"&source=bookmark&width=450&height=400");
	}

}

//dom载入成功后开始操作
jQuery(function()
{
	loadDiaOverLay();
	bindEvent_AdverDialog();
	var allsortLateCall = new lateCall(200,function(){$('#div_allsort').show();});
	//商品分类
	$('.allsort').hover(
		function(){
			allsortLateCall.start();
		},
		function(){
			allsortLateCall.stop();
			$('#div_allsort').hide();
		}
		);
	$('.sortlist li').each(
		function(i)
		{
			$(this).hover(
				function(){
					$(this).addClass('hover');
					$('.sublist:eq('+i+')').show();
				},
				function(){
					$(this).removeClass('hover');
					$('.sublist:eq('+i+')').hide();
				}
				);
		}
		);

	//排行,浏览记录的图片
	$('#ranklist li').hover(
		function(){
			$(this).addClass('current');
		},
		function(){
			$(this).removeClass('current');
		}
		);

	//自动完成input框 事件绑定
	var tmpObj = $('input:text[name="word"]');
	var defaultText = tmpObj.val();
	tmpObj.bind({
		focus:function(){checkInput($(this),defaultText);},
		blur :function(){checkInput($(this),defaultText);}
	});
	bindEvent();
	initHeadNav();
	//resetCartCount();
});
