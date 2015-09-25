var icon = ["one","two","three","four","five","six","seven"];
var goods_detail_url="/goods/goods";

var bd_brand="";//百度采集品牌
var bd_class1="";//百度采集第一分类
var bd_class2="";//百度采集第二分类
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
//获取栏目的一级分类
var categoryOne = function(){
	$.ajax({
		url:"/goods/categoryIndex.do",
		type:"post",
		dataType:"json",
		async: false,
		data:{
			
		},
		success:function(result){
			if(result.status){
				var str = [];
				$(result.categorys).each(function(index,category){
					//class="w_selected"
					if(index<6){
						str.push('<dd><a href="javascript:void(0);" data-id="'+category.id+'"><span class="w_icon w_icon_'+icon[index]+'"></span><b>'+category.cname+'</b></a></dd>');
					}else if(index==6){
						str.push('<dd class="w_special"><a href="javascript:void(0);" data-id="'+category.id+'"><span class="w_icon w_icon_'+icon[index]+'"></span><b>'+category.cname+'</b></a></dd>');
					}else{
						
					}
					
					
				});
				str.push('<div class="w_clear"></div>');
				$(".w_choose_list").html(str.join(""));
			}
		},
		error:function(){
			
		}
	});
}
//根据一级栏目id获取它的子栏目
var getAllCat = function(id){
	$.ajax({
		url:"/goods/getAllCategory.do",
		type:"post",
		dataType:"json",
		async:false,
		data:{
			id:id
		},
		success:function(result){
			if(result.status){
				$(".w_specific_class ul").html('<li><a class="w_effect" href="javascript:void(0);" data-id="'+id+'">全部分类</a></li>');
				$(result.categorys).each(function(index,category){
					$(".w_specific_class ul").append('<li><a href="javascript:void(0);" data-id="'+category.id+'">'+category.cname+'</a></li>');
				});
				
			}
		},
		error:function(){
			
		}
	});
}
//根据栏目id获取它的所有品牌
var getAllBrand = function(id){
	$.ajax({
		url:"/goods/getAllBrand.do",
		type:"post",
		dataType:"json",
		async:false,
		data:{
			id:id
		},
		success:function(result){
			$(".w_specific_class1 ul").html('<li><a class="w_effect" href="javascript:void(0);">全部</a></li>');
			if(result.status){
				$(result.brands).each(function(index,brand){
					
					if(index<15){
						$(".w_specific_class1 ul").append('<li><a href="javascript:void(0);" data-id="'+brand.id+'">'+brand.bname+'</a></li>');
					}else if(index==15){
						$(".w_specific_class1 ul").append('<span class="w_right_more">展开</span><li class="w_recharge_more" ><a href="javascript:void(0);" data-id="'+brand.id+'">'+brand.bname+'</a></li>');
					}else{
						$(".w_specific_class1 ul").append('<li class="w_recharge_more" ><a href="javascript:void(0);" data-id="'+brand.id+'">'+brand.bname+'</a></li>');
					}
				});
				$(".w_specific_class1 ul").append('<span class="w_left_more">收起</span>');
			}
		},
		error:function(){
			
		}
	});
}

//所有商品页根据cid和bid展示栏目品牌
var showGoodsCB = function(cid, bid){
	if(cid!=0){
		if($(".w_choose_list a[data-id="+cid+"]").length!=0){//cid为一级栏目id
			$(".w_choose_list a[data-id="+cid+"]").addClass("w_selected");
			$(".w_guide").html('<a href="/">首页</a><a href="/goods/allCat.html">全部商品</a><a class="w_accord" href="javascript:void(0);">'+$(".w_selected b").text()+'</a>');
			getAllCat(cid);
			getAllBrand(cid);
		}else{//cid二级栏目id
			$.ajax({
				url:"/goods/getCategory.do",
				type:"post",
				dataType:"json",
				async:false,
				data:{
					cid : cid
				},
				success:function(result){
					if(result.status){
						$(".w_choose_list a[data-id="+result.category.fid+"]").addClass("w_selected");
						$(".w_guide").html('<a href="/">首页</a><a href="/goods/allCat.html">全部商品</a><a href="/goods/allCat'+result.category.fid+'.html">'+$(".w_selected b").text()+'</a><a class="w_accord" href="javascript:void(0);">'+result.category.cname+'</a>');
						getAllCat(result.category.fid);
						getAllBrand(cid);
						$(".w_goods_class .w_effect").removeClass("w_effect");
						$(".w_goods_class li a[data-id="+cid+"]").addClass("w_effect");
					}
				},
				error:function(){
					
				}
			});
			if(bid!=0){
				$(".w_goods_brand .w_effect").removeClass("w_effect");
				$(".w_goods_brand li a[data-id="+bid+"]").addClass("w_effect");
			}
		}
		$(".w_all_class").show();
	}
}

//分页获取商品列表
var getGoods = function(page){
	var cid = $(".w_specific_class .w_effect").attr("data-id");
	var bid = $(".w_specific_class1 .w_effect").attr("data-id");
	var order = $(".w_product_con .w_announced").attr("data-id");
	var baoyuan = $(".bao_yuan").attr("data-id");
	$.ajax({
		url:'/goods/getGoods.do',
		type:'post',
		dataType:"json",
		data:{
			cid:cid,
			bid:bid,
			q:$("#q").val(),
			order:order,
			baoyuan:baoyuan,
			size:"40",
			page:page
		},
		success:function(result){
			if(result.status){
				
				$(".w_goods_nav h2 a").html(result.goods?result.goods.total:0);
				
				var buf = [];
				var i = 0;
				result.goods && $(result.goods.dataList).each(function(index,goods){
					var goodsDetailHref=goods_detail_url+goods.gid+"-"+goods.periodCurrent+".html";
					if(index%4===0)
			    		buf.push('<ul class="w_goods_one">');
			   		
			        buf.push('<li class="w_goods_details '); 
			        if(index%4===3)
			        	buf.push('w_special');
			   		buf.push('"><div class="w_imgOut" data-gid="'+goods.gid+'" data-pid="'+goods.periodCurrent+'"><a data-gid="'+goods.gid+'" data-pid="'+goods.periodCurrent+'" target="_blank"  class="w_goods_img" href="'+goodsDetailHref+'" >');
			   		buf.push('<img id="img_'+i+'" data-gid="'+goods.gid+'" data-pid="'+goods.periodCurrent+'" class="lazy' + page + '" data-original="'+imageGoodsPath+goods.showImages.split(',')[0]+'" /><noscript><img src="' + imageGoodsPath+goods.showImages.split(',')[0] + '" alt=""/></noscript></a></div>');
					buf.push('<a class="w_goods_three" target="_blank" href="'+goodsDetailHref+'" data-gid="'+goods.gid+'" data-pid="'+goods.periodCurrent+'" title="'+goods.title+'">(第'+goods.periodCurrent+'期) '+goods.title+'</a>');
					buf.push('<b>价值：￥'+goods.priceTotal+'</b>');
					buf.push('<div class="w_line"><span style="width:'+(goods.priceSell/goods.priceTotal*100 === 0 || goods.priceSell/goods.priceTotal*100 >= 1 ? goods.priceSell/goods.priceTotal*100 : 1)+'%"></span></div>');
					buf.push('<ul class="w_number">');
					buf.push('<li class="w_amount">'+goods.priceSell+'</li>');
					buf.push('<input type="hidden" id="cart_gid_'+i+'" value="'+goods.gid+'"/>');
					buf.push('<input type="hidden" id="pid_'+i+'" value="'+goods.periodCurrent+'"/>');
					buf.push('<input type="hidden" id="priceArea_'+i+'" value="'+goods.priceArea+'"/>');
					buf.push('<input type="hidden" id="period_'+i+'" value="'+goods.periodCurrent+'"/>');
					buf.push('<input type="hidden" id="priceTotal_'+i+'" value="'+goods.priceTotal+'"/>');
					buf.push('<input type="hidden" id="surplus_'+i+'" value="'+(goods.priceTotal-goods.priceSell)+'"/>');
					buf.push('<input type="hidden" id="thumbPath_'+i+'" value="'+goods.thumbPath+'"/>');
					buf.push('<input type="hidden" id="title_'+i+'" value="'+goods.title+'"/>');
					buf.push('<li class="w_amount">'+goods.priceTotal+'</li>');
					buf.push('<li class="w_amount">'+(goods.priceTotal-goods.priceSell)+'</li>');
					buf.push('<li>已云购次数</li><li>总需人次</li>');
					buf.push('<li>剩余人次</li>');
					buf.push('</ul>');
					buf.push('<dl class="w_rob">');
					buf.push('<dd><a class="w_slip" target="_blank" href="'+goodsDetailHref+'" data-gid="'+goods.gid+'" data-pid="'+goods.periodCurrent+'">立即抢购</a></dd>');
					buf.push('<dd class="w_rob_out"><a  class="w_rob_in" href="javascript:void(0);" onclick="cartoon('+i+')">加入购物袋</a></dd>');
					buf.push('</dl>');
					if(goods.isRecommend === 1)
						buf.push('<i class="w_hot"></i>');//w_hot推荐  w_hot_one热卖  w_hot_two首发  w_hot_three人气
					if(goods.isPopularity === 1)
						buf.push('<i class="w_hot_three"></i>');
					if(goods.priceArea == 10)
						buf.push('<span class="w_zone">十元专区</span>');
					if(goods.priceArea == 100)
						buf.push('<span class="w_zone">百元专区</span>');
					if(goods.maxBuy != 0)
						buf.push('<span class="w_zone w_zone_other">限购专区</span>');
					buf.push('</li>');
			        i++;
			    	if(index%4===3)
			       		buf.push('</ul>');
				});
			    $(".w_goods_con").html(buf.join(""));
			    
			    //当最后一行数据时1、2、3个时，填充空白图片
			    var lastUl = $('.w_goods_con .w_goods_one:last');
			    var num = lastUl.find('.w_goods_details').length;
			    if(num>0 && num <4){
			    	for(var i=4-num;i>0;i--){
			    		lastUl.append('<li class="w_goods_details "><img src="/static/img/front/goods/expect.jpg"/></li>');
			    	}
			    }
			    
			    
			    //分页插件
				if(result.goods && result.goods.dataList && result.goods.total){
					kkpager.generPageHtml({
						pno : result.goods.page,//当前页码
						total : result.goods.totalPage,//总页码
						totalRecords : result.goods.total,//总数据条数
						pagerid : "kkpager",
						isToTop : true,
						pagerParent : "w_con",
						mode : 'click',//默认值是link，可选link或者click
						click : function(n){
							getGoods(n);
							//手动选中按钮
							//this.selectPage(n);
							//return false;
						}
					});
				}else{
					$("#kkpager").html("<img src='/static/img/lis_icon.png'/>");
				}
			    
				lazyload200(page); //图片按分页延迟加载 
				
			}
		},
		error:function(){
			
		} 
	});
	
}

//立即购买
function gotoCart(a){
	addCart(a)
	window.location.href="/cart/cartList.html";
}
//加入购物车动画
function cartoon(a){
	addCart(a)
	var img = $("#img_"+a);
	var flyElm = img.clone().css('opacity', 0.75);
	$('body').append(flyElm);
	flyElm.css({
		'z-index': 9000,
		'display': 'block',
		'position': 'absolute',
		'top': img.offset().top +'px',
		'left': img.offset().left +'px',
		'width': img.width() +'px',
		'height': img.height() +'px'
	});
	flyElm.animate({
		top: $('.shoppingCartRightFix').offset().top,
		left: $('.shoppingCartRightFix').offset().left,
		width: 40,
		height: 26
	}, 'slow', function() {
		flyElm.remove();
	});
}
//加入购物车
function addCart(a){
	var gid = $("#cart_gid_"+a).val();
	var pid = $("#pid_"+a).val();
	var times = 1;
	var cart = jaaulde.utils.cookies.get("cart")
	if (cart == null || cart=='' || cart == "undefined") {
	cart = '[{"buyPeriod":1,"client":1,"gid":' + gid
			+ ',"period":' + pid
			+ ',"times":'+$("#priceArea_"+a).val()+',"type":2}]';
	} else {
		var check = 0;
		var list = eval(cart);
		if(list.length>=30){
			return;
		}else{
			for (var i = 0; i < list.length; i++) {
				if (list[i].gid == gid && (list[i].type==2)) {
					list[i].times = list[i].times / 1 + 1*$("#priceArea_"+a).val();
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
				+ gid+ ',"times":'+$("#priceArea_"+a).val()+',"type":2}]';
			} else {
				cart = JSON.stringify(list)+"";
			}
		}
	}
	jaaulde.utils.cookies.set('cart', cart,{path:"/"});
	cartCount();
}

//获取商品数量
var getGoodsCount = function(){
	var baoyuan = $(".bao_yuan").attr("data-id");
	$.ajax({
		url:'/goods/getGoods.do',
		type:'post',
		dataType:"json",
		data:{
			baoyuan:baoyuan
		},
		success:function(result){
			if(result.status){
				$(".w_goods_nav h2 a").html(result.goods.total);
			    
			}
		},
		error:function(){
			
		} 
	});
	
}

$(function(){                                 
	//绑定第一级分类点击事件
	$(".w_choose_list").delegate("dd a", "click" ,function(){
		var index=$(this).index(".w_choose_list dd a");
		$(".w_choose_list dd a").removeClass("w_selected");
		$(this).addClass("w_selected");
		var fid = $(this).attr("data-id");//获取第一级栏目id
		
		$(".w_all_class").show();
		if($(".bao_yuan").attr("data-id")){
			$(".w_guide").html('<a href="/">首页</a><a href="/goods/baoyuan_shopping.html">直购专区</a><a class="w_accord" href="javascript:void(0);">'+$(this).find("b").text()+'</a>');
		}else{
			$(".w_guide").html('<a href="/">首页</a><a href="/goods/allCat.html">全部商品</a><a class="w_accord" href="javascript:void(0);">'+$(this).find("b").text()+'</a>');
		}
		$("#q").val("");
		getAllCat(fid);
		getAllBrand(fid);
	    getGoods(1);
	    bd_class1=$(this).find("b").html();//获取第一级栏目名称
	    bd_class2="";
	    bd_brand="";
	    baiduTag_list(); //添加百度统计代码
	})
	//绑定第二级分类点击事件
	$(".w_specific_class ul").delegate("li a", "click", function(ev){
		var ev = ev || window.event;
	    var target = ev.target || ev.srcElement;
		var index=$(target).index(".w_specific_class ul li a");
		var fid = $(".w_choose_list .w_selected").attr("data-id");
		$(".w_specific_class ul li a").removeClass("w_effect");
		$(target).addClass("w_effect");
		if($(".bao_yuan").attr("data-id")){
			$(".w_guide").html('<a href="/">首页</a><a href="/goods/baoyuan_shopping.html">直购专区</a><a href="/goods/allCat'+fid+'.html">'+$(".w_selected b").text()+'</a><a class="w_accord" href="javascript:void(0);">'+$(target).text()+'</a>');
		}else{
			$(".w_guide").html('<a href="/">首页</a><a href="/goods/allCat.html">全部商品</a><a href="/goods/allCat'+fid+'.html">'+$(".w_selected b").text()+'</a><a class="w_accord" href="javascript:void(0);">'+$(target).text()+'</a>');
		}
		$("#q").val("");
		getAllBrand($(target).attr("data-id")); //获取所有品牌
	    getGoods(1);
	    bd_class2=$(target).html();//获取第二分类 名称
	    bd_brand="";
	    baiduTag_list(); //添加百度统计代码
	})
	//绑定品牌点击事件
	$(".w_specific_class1 ul").delegate("li a", "click", function(ev){
		var ev = ev || window.event;
	    var target = ev.target || ev.srcElement;
		var index=$(target).index(".w_specific_class1 ul li a");
		$(".w_specific_class1 ul li a").removeClass("w_effect");
		$(target).addClass("w_effect");
		$("#q").val("");
		getGoods(1);
		bd_brand=$(target).html();//获取第二分类 名称
		baiduTag_list(); //添加百度统计代码
		
	});
	$(".w_new").delegate("dd a", "click", function(){
		var index=$(this).index(".w_new dd a");
		$(".w_new dd a").removeClass('w_announced');
		$(this).addClass('w_announced');
		if($(this).attr("class") == 'w_last w_announced'){
			
			switch($(this).attr("data-id"))
			{
			case 'totalPrice_down':
				$(this).attr("data-id", "totalPrice_up");
				$(this).find("img").eq(0).attr({src:"../static/img/front/goods/jia_01.png"});
				$(this).find("img").eq(1).attr({src:"../static/img/front/goods/jia.png"});
				break;
			case 'totalPrice_up':
				$(this).attr("data-id", "totalPrice_down");
				$(this).find("img").eq(0).attr({src:"../static/img/front/goods/jia_01.png"});
				$(this).find("img").eq(1).attr({src:"../static/img/front/goods/jia.png"});
				break;
			}
			
		}else{
			$(".w_last").find("img").eq(0).attr({src:"../static/img/front/goods/jia_03.png"});
			$(".w_last").find("img").eq(1).attr({src:"../static/img/front/goods/jia_06.png"});
		}
		getGoods(1);
	})
	$(".w_specific_class1 ul").delegate(".w_right_more", "click", function(){
		$(".w_recharge_more").show();
		$(".w_right_more").hide();
		$(".w_left_more").show();
	})
	$(".w_specific_class1 ul").delegate(".w_left_more", "click", function(){
		$(".w_recharge_more").hide();
		$(".w_left_more").hide();
		$(".w_right_more").show();
	})
		
});  

/*
 * Author：gaoxiaopeng@ddtkj.com
 * Time:2015-9-10
 * 描述：百度的统计代码，用于抓去用户 操作行为
 * 用法：在页面所有，分类与品牌的点击效果上全部加上 该函数
 * 参数1：brand //品牌名称，多个品牌以|分隔 
 * 参数2： 一级品类
 * 参数3： 二级品类
 * */
function baiduTag_list(){
	var rtTag ={
	    "data": {
			    "ecom_page": {
			        "page_type": "list", //页面类型
					 "p_brand":bd_brand,  //品牌名称，多个品牌以|分隔 
			         "p_class1": bd_class1,  //一级品类
					 "p_class2": bd_class2  //二级品类
			    }
	       }
	};

	_hmt.push(['_trackRTEvent', rtTag]);
	
}