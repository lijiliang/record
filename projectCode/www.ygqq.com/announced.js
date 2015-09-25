var formatDate = function(date,format){if(!format)format="yyyy-MM-dd HH:mm:ss";date=new Date(parseInt(date));var dict={"yyyy":date.getFullYear(),"M":date.getMonth()+1,"d":date.getDate(),"H":date.getHours(),"m":date.getMinutes(),"s":date.getSeconds(),"S":(""+(date.getMilliseconds()+1000)).substr(1),"MM":(""+(date.getMonth()+101)).substr(1),"dd":(""+(date.getDate()+100)).substr(1),"HH":(""+(date.getHours()+100)).substr(1),"mm":(""+(date.getMinutes()+100)).substr(1),"ss":(""+(date.getSeconds()+100)).substr(1)};return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g,function(a){return dict[a]})};
/**
 * 描述：图片延迟加载
 * 
 * */
function lazyload200(page){
	//设置图片延迟加载  距离屏幕100像素开始加载图片
	$("img.lazy"+page).lazyload({
		effect : "fadeIn",
		placeholder : "/static/img/front/loading_200.gif",
		threshold : 100
	});
}
function lazyload(size){
	//设置图片延迟加载  距离屏幕100像素开始加载图片
	$("img.lazy"+size).lazyload({
		effect : "fadeIn",
		placeholder : "/static/img/front/loading_"+size+".gif",
		threshold : 100
	});
}
var jiexiao = function(page, flag){
	
	$.ajax({
		url:"/goods/jiexiaoQuery.do",
		type:"post",
		dataType:"json",
		data:{
			jsdCard : $(".w_tab_color").attr("data-i"),
			size : "30",
			page : page
		},
		success:function(result){
			
			if(result.status){
				$("#total").html(result.pageModel.total);
				
				var str = [];
				$(result.pageModel.dataList).each(function(index,goods){
					
					str.push('<li class="w_latest');
					str.push('"><div class="w_latestImg"><a class="w_goods_img" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank"><img class="lazy' + page + '" data-original="'+imageGoodsPath+goods.showImages.split(',')[0]+'" /><noscript><img src="'+imageGoodsPath+goods.showImages.split(',')[0]+'" /></noscript></a></div>');
					str.push('<a class="w_goods_three" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank">(第'+goods.period+'期)'+goods.title+'</a>');
					str.push('<b>商品价值：￥'+goods.totalPrice+'.00</b>');
					str.push('<div class="w_different w_different_add">');
					str.push('<div class="w_figure"><img class="lazy20" data-original="'+path+eval('('+goods.userInfo+')').icons+'"/><noscript><img src="'+path+eval('('+goods.userInfo+')').icons+'"/></noscript></div>');
					str.push('<dl class="w_text">');
					str.push('<dd>获得者：<a href="/other/cloudRecord/'+eval('('+goods.userInfo+')').mid+'.html">'+eval('('+goods.userInfo+')').nickname+'</a></dd>');
					str.push('<dd>来自：<em>'+(goods.userBuyAddress?goods.userBuyAddress.split(" ")[0]:"地址不详")+'</em></dd>');
					str.push('<dd>幸运号码：<i>'+goods.userWinCode+'</i></dd>');
					str.push('<dd>本期参与：<i>'+goods.userYgCount+'</i>人次</dd>');
					str.push('<dd>揭晓时间：'+formatDate(goods.publishTime)+'</dd>');
					str.push('<dd class="w_add_multiple_box"><span class="w_add_multiple">回报率：'+(goods.totalPrice/goods.userYgCount).toFixed(2)+'倍</span><a class="w_span w_span_other" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank">查看详情</a></dd>');
					str.push('</dl></div>');
					if(goods.priceArea == 10){
						str.push('<span class="w_add_tag"><img src="/static/img/front/goods/zone_03.png"/></span>');
					}
					if(goods.maxBuy != 0){
						str.push('<span class="w_add_tag"><img src="/static/img/front/goods/zone_05.png"/></span>');
					}
					str.push('</li>');
					
				});
				
				
				$(".w_announced_one ul").html(str.join(""));
				
				lazyload200(page);
				lazyload('20');
				
				$(".w_text .w_add_multiple_box").hover(function(){
			        var index=$(this).index(".w_text .w_add_multiple_box");
			        $($(".w_text .w_add_multiple_box .w_span_other")[index]).show();
			    },function(){
			       	$(".w_text dd a.w_span_other").hide();
			    });
				
				//分页插件
				if(result.pageModel && result.pageModel.total && $("#kkpager")){
					kkpager.generPageHtml({
						pno : result.pageModel.page,//当前页码
						total : result.pageModel.totalPage,//总页码
						totalRecords : result.pageModel.total,//总数据条数
						isToTop : true,
						pagerParent : "w_con",
						mode:'click',
						click:function(n){
							//this.selectPage(n); //处理完后可以手动条用selectPage进行页码选中切换
							jiexiao(n, flag);
						}
					});
				}else{
					$("#kkpager").html("<img src='/static/img/jie_no.png'/><a  class='buy_aaa' href='/' style='left: 538px;'></a>");
				}
				
				if(flag)
					waiting(1, true);
				
			}
		},
		error:function(){
			
		}
	});
	
}

var waiting = function(page,flag){
	
	$.ajax({
		url:"/goods/publishwait.do",
		type:"post",
		dataType:"json",
		data:{
			jsdCard : $(".w_tab_color").attr("data-i"),
			size : "30",
			page : page
		},
		success:function(result){
			
			if(result.status){
				
				if(flag)
					$("#total").html(result.pageModel.total+parseInt($("#total").html()));
				else
					$("#total").html(result.pageModel.total);
				
				$('.w_latest_color').remove();
				var str = [];
				$(result.pageModel.dataList).each(function(index,goods){
					
					str.push('<li class="w_latest w_latest_color ');
					str.push('goods'+goods.gid+'_'+goods.periods+'"><div class="w_latestImg"><a  class="w_goods_img" href="/goods/goods'+goods.gid+'-'+goods.periods+'.html" target="_blank"><img src="'+imageGoodsPath+goods.showImages.split(',')[0]+'" /></a></div>');
					str.push('<a class="w_goods_three" href="/goods/goods'+goods.gid+'-'+goods.periods+'.html">(第'+goods.periods+'期)'+goods.title+'</a>');
					str.push('<b>商品价值：￥'+goods.totalPrice+'.00 <i>已满员</i></b>');
					//str.push('<div class="w_different_other">');
					//str.push('<p class="w_countdown">等待揭晓</p>');
					str.push('<div class="w_different">');
					str.push('<div class="w_countdown"><strong>揭晓倒计时</strong><p><b>0</b><b>0</b><span>:</span><b>0</b><b>0</b><span>:</span><b>0</b><b>0</b></p></div>');
					str.push('</div></li>');
					
				});
				
				$(".w_announced_one ul").prepend(str.join(""));
				
				lazyload200(page);
				
				$(result.pageModel.dataList).each(function(index,goods){
					var objc=$($(".goods"+goods.gid+"_"+goods.periods+" .w_different .w_countdown")[0]);
					if(goods.expectPublishTime - result.now > 0){
						Time_fun( goods.expectPublishTime - result.now + new Date().getTime(), objc, goods.gid, goods.periods);
					}else{
						objc.parent().addClass("w_different_add").addClass("w_different_newadd").html('<p class="w_prompt  w_prompt_s">非常抱歉！</p><p class="w_prompt">福彩中心通讯故障~请耐心等待</p>');
					}
					
				});
				
				if(flag)
					return;
				
				//分页插件
				if(result.pageModel && result.pageModel.total && $("#kkpager")){
					kkpager.generPageHtml({
						pno : result.pageModel.page,//当前页码
						total : result.pageModel.totalPage,//总页码
						totalRecords : result.pageModel.total,//总数据条数
						isToTop : true,
						pagerParent : "w_con",
						mode:'click',
						click:function(n){
							//this.selectPage(n); //处理完后可以手动条用selectPage进行页码选中切换
							waiting(n);
						}
					});
				}else{
					$("#kkpager").html("<img src='/static/img/jie_no.png'/><a class='buy_aaa' href='/' style='left: 538px;'></a>");
				}
				
			}
		},
		error:function(){
			
		}
	});
	
}

var baowei = function(){
	$.ajax({
		url:'/goods/getGoods.do',
		type:'post',
		dataType:"json",
		data:{
			order:"publicTime",
			size:11
		},
		success:function(result){
			if(result.status && result.goods){
				var detailoutput=$('#baowei').parseTemplate(result.goods);
				$(".w_announced_two").html(detailoutput);
				lazyload('200');
			}
		},
		error:function(){
			
		} 
	});
	
}


//我要包尾
function gotoCart(a){
	addCart(a)
	window.location.href="/cart/cartList.html";
}
//加入购物车
function addCart(a){
	var gid = $("#gid_"+a).val();
	var pid = $("#pid_"+a).val();
	var times = $("#surplus_"+a).val();
	var cart = jaaulde.utils.cookies.get("cart")
	if (cart == null || cart=='' || cart == "undefined") {
		cart = '[{"buyPeriod":1,"client":1,"gid":' + gid
				+ ',"times":'+$("#surplus_"+a).val()+',"type":2}]';
	} else {
		var check = 0;
		var list = eval(cart);
		if(list.length>=30){
			return;
		}else{
			for (var i = 0; i < list.length; i++) {
				if (list[i].gid == gid  && list[i].type==2) {
					list[i].times = $("#surplus_"+a).val();
					check = 1;
					break;
				}
			}
			if (check == 0) {
				if(typeof(cart)=="object"){
					cart = JSON.stringify(cart);
				}
				cart = cart.substring(0, cart.length -1);
				cart = cart + ',{"buyPeriod":1,"client":1,"gid":'
				+ gid+ ',"times":'+$("#surplus_"+a).val()+',"type":2}]';
			} else {
				cart = JSON.stringify(list)+"";
			}
		}
	}
	jaaulde.utils.cookies.set('cart', cart,{path:"/"});
	cartCount();
}


setTimeout(function(){
	$(".yMenuIndex :contains('最新揭晓')").addClass("yMenua");
}, 500);


//商品揭晓信息
var info = function(gid, pid){
	$.ajax({
		url:'/goods/querygoods.do',
		type:'post',
		dataType:"json",
		data:{
			gid:gid,
			pid:pid
		},
		success:function(result){
			if(result.status ){
				var goods = result.goods;
				var p = goods.period || goods.periodCurrent;
				if(p == pid && goods.userWinCode){//返回来的商品详情期数不对应或没有云购码则揭晓失败
					var str = [];
					str.push('<div class="w_latestImg"><a class="w_goods_img" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank"><img src="'+imageGoodsPath+goods.showImages.split(',')[0]+'" /></a></div>');
					str.push('<a class="w_goods_three" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank">(第'+goods.period+'期)'+goods.title+'</a>');
					str.push('<b>商品价值：￥'+goods.totalPrice+'.00</b>');
					str.push('<div class="w_different w_different_add">');
					str.push('<div class="w_figure"><img src="'+path+eval('('+goods.userInfo+')').icons+'"/></div>');
					str.push('<dl class="w_text">');
					str.push('<dd>获得者：<a href="/other/cloudRecord/'+eval('('+goods.userInfo+')').mid+'.html">'+eval('('+goods.userInfo+')').nickname+'</a></dd>');
					str.push('<dd>来自：<em>'+(goods.userBuyAddress?goods.userBuyAddress.split(" ")[0]:"地址不详")+'</em></dd>');
					str.push('<dd>幸运号码：<i>'+goods.userWinCode+'</i></dd>');
					str.push('<dd>本期参与：<i>'+goods.userYgCount+'</i>人次</dd>');
					str.push('<dd>揭晓时间：'+formatDate(goods.publishTime)+'</dd>');
					str.push('<dd class="w_add_multiple_box"><span class="w_add_multiple">回报率：'+(goods.totalPrice/goods.userYgCount).toFixed(2)+'倍</span><a class="w_span w_span_other" href="/goods/goods'+goods.gid+'-'+goods.period+'.html" target="_blank">查看详情</a></dd>');
					str.push('</dl></div>');
					if(goods.priceArea == 10){
						str.push('<span class="w_add_tag"><img src="/static/img/front/goods/zone_03.png"/></span>');
					}
					if(goods.maxBuy != 0){
						str.push('<span class="w_add_tag"><img src="/static/img/front/goods/zone_05.png"/></span>');
					}
					$(".goods"+gid+"_"+pid).removeClass('w_latest_color').html(str.join(''));
				}else{
					$($(".goods"+gid+"_"+pid+" .w_different")[0]).addClass("w_different_add").addClass("w_different_newadd").html('<p class="w_prompt  w_prompt_s">非常抱歉！</p><p class="w_prompt">福彩中心通讯故障~请耐心等待</p>');
				}
			}
		},
		error:function(){
			
		} 
	});
}

/**
 * 跑秒动画产生效果函数
 * 参数说明：times - 要跑秒时长+new Date().getTime()
 * 			 objc  - 跑秒要显示的位置
 * 特别说明：① - 此句中的new Date().getTime()只是为形成跑秒动画效果而使用的，和跑秒的时间长短无关
 * 				  即使用户浏览器或电脑系统时间不同，但每次打开网页显示的时间跑秒动画是统一的
 */
var t = {}
function Time_fun(times,objc,gid,pid){               
	t.time = times - (new Date().getTime());
	t.h = parseInt((t.time/1000)/60/60%24);//时
	t.i = parseInt((t.time/1000)/60%60);
	t.s = parseInt((t.time/1000)%60);
	t.ms = String(Math.floor(t.time%1000));
	t.ms = parseInt(t.ms.substr(0,2));
	if(t.h<10)t.h='0'+t.h; //剩余时
	if(t.i<10)t.i='0'+t.i; //剩余分钟
	if(t.s<10)t.s='0'+t.s; //剩余秒
	if(t.ms<0)t.ms='00'; //剩余毫秒
	t.oh=String(t.h).slice(0,1);
	t.th=String(t.h).slice(1);
	t.oi=String(t.i).slice(0,1);
	t.ti=String(t.i).slice(1);
	t.os=String(t.s).slice(0,1);
	t.ts=String(t.s).slice(1);
	t.oms=String(t.ms).slice(0,1);
	t.tms=String(t.ms).slice(1);
	if(t.h>0)
		objc.find("p").html("<b>"+t.oh+"</b><b>"+t.th+"</b><span>:</span><b>"+t.oi+"</b><b>"+t.ti+"</b><span>:</span><b>"+t.os+"</b><b>"+t.ts+"</b>");   
	else
		objc.find("p").html("<b>"+t.oi+"</b><b>"+t.ti+"</b><span>:</span><b>"+t.os+"</b><b>"+t.ts+"</b><span>:</span><b>"+t.oms+"</b><b>"+t.tms+"</b>");   
	if(t.time<=0){     
		objc.find("p").addClass("w_timeing");           
	    objc.find("p").html('正在计算，请稍后...');
	    setTimeout(function(){
	    	info(gid,pid);
	    },15000);                             
	    return;                     
	}
	setTimeout(function(){                                 
    	Time_fun(times,objc,gid,pid);                 
	},30); 
}