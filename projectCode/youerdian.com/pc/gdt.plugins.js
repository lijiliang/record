(function(){
	$(document).ready(function (){
		/***导航栏**/
		var itemLine=$(".item");
			itemLine.each(function(a) {
                var nav=itemLine.eq(a);
				nav.mouseenter(function(){
					nav.find(".header_navTip").stop(true,true).show()	;
				})
				nav.mouseleave(function(){
					nav.find(".header_navTip").stop(true,true).hide();	
				})
            });
			
		/**头部购物车***/
		$(".header_cart_prompt").mouseenter(function(){
			$(".header_cart_popu").show();
			var url = window.location.href;
			var newurl = url.split('/')[0]+'/index.php/simple/showCart';
			show(newurl);
		})
		$(".header_cart_prompt").mouseleave(function(){
			$(".header_cart_popu").hide()	;
		})
		$(".header_cart_popu").mouseover(function(){
			$(".header_cart_popu").show()	;
		})
		$(".header_cart_popu").mouseout(function(){
			$(".header_cart_popu").hide()	;
		})
		
		/***侧边****/
		var popBox=$(".popBox")
			popBox.each(function(i) {
                var poItem=popBox.eq(i);
					poItem.mouseenter(function(){
						poItem.find(".sidePop").show().stop(true,true).animate({opacity:1,right:35+"px"});
					})
					poItem.mouseleave(function(){
						poItem.find(".sidePop").stop(true,true).animate({opacity:0,right:50+"px"},function(){ });
					})
            });
		/**左边购物车**/
		var sideShop = $(".sideShop")
		    sideCart = $(".sideCart");
			sideShop.mouseenter(function(){
				$(".sideCart").show().stop(true,true).animate({opacity:1,right:20+"px"});
				$(".sideCart").addClass("_hover");
			});
			sideCart.mouseleave(function(){
				$(".sideCart").stop(true,true).animate({opacity:0,right:-320+"px"},function(){$(".sideCart").hide() });
				$(".sideCart").removeClass("_hover");
			});
		/***新品开售**/
		var traTab=$(".main_traTab").find("li");
		var traMain=$(".mainTra_list");
			traMain.eq(0).css({opacity:1});
			traTab.each(function(t) {
                var tItem=traTab.eq(t);
					tItem.click(function(){
						traTab.removeClass("_hover");
						tItem.addClass("_hover");
						traMain.hide().css({opacity:0})	;
						traMain.eq(t).show().stop(true,true).animate({opacity:1});
					})
            });
		/***优惠卷***/
		var Tmall=$(".promo-Tmall").click(function(){
			if($(".sc_promoList").hasClass("_hover")){
				$(".sc_promoList").stop(true,true).slideUp();
				$(".sc_promoList").removeClass("_hover");
			}else{
				$(".sc_promoList").stop(true,true).slideDown();
				$(".sc_promoList").addClass("_hover");	
			}
		})
		var pomoBar=$(".sc_pomoTop").find(".scbar") ;
		var pomo=$(".sc_pomoCon").find(".sc_pomoInfo");
			pomoBar.each(function(p) {
                var poItem=pomoBar.eq(p);
					poItem.click(function(){
						pomoBar.removeClass("_hover");
						poItem.addClass("_hover");
						pomo.hide();
						pomo.eq(p).show();
					})
            });
		/***删除历史纪录****/
		var hsList=$(".sc_hisList").find("li");
		var num=0;
		var hsLen=hsList.length;
		$(".sc_hisList").css({width: hsLen * 734 + "px"});
		$(".prebtn").click(function(){
			if(num>0){
				num-=1;
				$(".sc_hisList").animate({left:$(".sc_hisList").position().left + 734 + "px"});
			}	
		})
		$(".nextbtn").click(function(){
			if(num<hsLen-1){
				num+=1;
				$(".sc_hisList").animate({left:-(num*734) + "px"})	;
			}
		})
		if(hsLen>1){
		}
		/**产品列表页 尺寸选择  2014 12 08 修改***/
		var hot=$(".itemMode");
		var size=$(".proSize");
			hot.each(function(h) {
               	_hotItem=hot.eq(h);
			   _hotItem.mouseenter(function(){
			   		var item=hot.eq(h).find(".sizeBox")
					item.stop(true,true).animate({top:221 + "px"});
				})
				_hotItem.mouseleave(function(){
					var item=hot.eq(h).find(".sizeBox")
					item.stop(true,true).animate({top:308 + "px"});
				})
            });
		/***产品列表 鼠标经过效果***/
		var pro=$(".pro_listCon").find("li")
			pro.each(function(o) {
                var _Item=pro.eq(o).find(".itemDetail");
					_Item.each(function(i) {
                        var pic=_Item.eq(i);
							pic.mouseenter(function(){
								_Item.removeClass("hover");
								pic.addClass("hover");
								pic.find(".pro_hotArea").stop(true,true).animate({opacity:1});
							})
							pic.mouseleave(function(){
								pic.find(".pro_hotArea").css({opacity:0});
								pic.removeClass("hover");
								
							})
                    });
            });
			
		/****产品详情页 产品介绍 导航栏****/
		
		var scro=$(".scrollUl").find("li")
			scro.each(function(s) {
                	var sItem=scro.eq(s);
					sItem.click(function(){
						var _h0 = $(".header").height() + $(".proBody").height() + 10;
	                    var _h1 = $("#c01").height() + _h0 + 10;
	                    var _h2 = $("#c02").height() + _h1;
	                    var _h3 = $("#c03").height() + _h2;
	                    var _h4 = $("#c04").height() + _h3;
		                var _hArr=[_h0,_h1,_h2,_h3,_h4]
						scro.removeClass("_cur");
						sItem.addClass("_cur");
						$(document).scrollTop(_hArr[s])
					})
            });
		
		/***产品详情页 图片列表 大小图切换***/
		var smallPic=$(".smallPic").find(".picShow_module_item")
		var bigPic=$(".picShow_module").find(".bigPic")
			smallPic.each(function(m) {
                var mItem=smallPic.eq(m);
					mItem.mouseenter(function(){
						if(mItem.hasClass("current")){}
						else{
							smallPic.removeClass("current")	;
							mItem.addClass("current");
							var urlStr=mItem.attr("bigUrl")
							bigPic.find("img").attr("src",urlStr)
						}
					})
            });
		
		$(window).scroll(function(){
			if($(document).scrollTop()>=150){
				if($(".wrapper").hasClass("proBody")){}
				else{
					$(".topPopBox").addClass("_hover")	;
				}
			}else{
				$(".topPopBox").removeClass("_hover");
			}	
		})
		
		/***模拟下拉列表***/
		var sel=$(".selSimilar");
		var box=$(".SelList");
		var list=$(".psSele");
			list.each(function(i) {
				var _item=list.eq(i);
					_item.click(function(){
						box.hide();
						var _box=box.eq(i);
							_box.show();
						var txt=_box.find(".selTxt");
							txt.each(function(j) {
                                var _val=txt.eq(j);
									_val.click(function(){
										_box.hide()	;
										var selTxt=list.eq(i).find(".selTit");
											selTxt.html(_val.html());
									})
                            });
					})
			});
			if($(".setTime").length>0){
				updateEndTime()	
			}
			if($(".setOrderTime").length>0){
				updateOrderEndTime()	
			}
			if($(".shopCartTime").length>0){
				updateCartEndTime()	
			}
	})	
	
})(jQuery)

function show(urlVal)
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

/***倒计时***/
function anb(){
	updateEndTime()	
}
function updateEndTime(){
	var date=new Date();
	var time=date.getTime();
	$(".setTime").each(function(i){
		var endDate=this.getAttribute("endTime");
		var endStr=eval('new Date('+ endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
		var endTime=endStr.getTime();
		var lag = (endTime - time) / 1000;
		var lag2 = (endTime - time) / 10;
		
		if(lag > 0)
		{
			var msecond = Math.floor(lag2 % 100);
			var second = Math.floor(lag % 60); 
			var minite = Math.floor((lag / 60) % 60);
			var hour = Math.floor((lag / 3600) % 24);
			var day = Math.floor((lag / 3600) / 24);
			$(this).html(day+"天"+hour+"小时"+minite+"分"+second+"秒"+msecond);
		}
		else{
				$(this).html("活动已经结束！");
			}
		});		
		setTimeout("anb()",10);
}

/***倒计时***/
function orderAnb(){
	updateOrderEndTime()	
}
function updateOrderEndTime(){
	var date=new Date();
	var time=date.getTime();
	$(".setOrderTime").each(function(i){
		var endDate=this.getAttribute("endTime");
		var endStr=eval('new Date('+ endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
		var endTime=endStr.getTime();
		var lag = (endTime - time) / 1000;
		
		if(lag > 0)
		{
			var second = Math.floor(lag % 60); 
			var minite = Math.floor((lag / 60) % 60);
			var hour = Math.floor((lag / 3600) % 24);
			var day = Math.floor((lag / 3600) / 24);
			$(this).html(minite+"分"+second+"秒");
		}
		else{
				$(this).html("付款超时!");
			}
		});		
		setTimeout("orderAnb()",1000);
}

/***购物车倒计时***/
function cartAnb(){
	updateCartEndTime()	
}
function updateCartEndTime(){
	var date=new Date();
	var time=date.getTime();
	$(".shopCartTime").each(function(i){
		var endDate=this.getAttribute("endTime");
		var endStr=eval('new Date('+ endDate.replace(/\d+(?=-[^-]+$)/, function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
		var endTime=endStr.getTime();
		var lag = (endTime - time) / 1000;
		var lag2 = (endTime - time) / 10;
		
		if(lag > 0)
		{
			var msecond = Math.floor(lag2 % 100);
			var second = Math.floor(lag % 60); 
			var minite = Math.floor((lag / 60) % 60);
			var hour = Math.floor((lag / 3600) % 24);
			//var day = Math.floor((lag / 3600) / 24);
			$(this).html(hour+"时"+minite+"分"+second+"秒"+msecond);
		}
		else{
				$(this).html("00分00秒");
			}
		});		
		setTimeout("cartAnb()",10);
}


/***
	 2015 02 11 修改by haoxin
***/
/***幻灯片***/
(function(){
	$.fn.inBanner = function(options){
		options = $.extend({
			'timeInterval':5000
		},options);
		if(this.length == 0){
			return this;
		}
		if(this.length > 1) {
			$(this).each(function(){
				$(this).inBanner(options);
			});
			return this;
		}
		var _ban=$(this).find("li")
			_ban.eq(0).css({"display":"block"})
		var len=_ban.length
		var num=0
		var now=0;
		var _w=$(this).find("li").width()
		var _slideIcons = $(this).find("i");
		    _slideIcons.eq(0).css("background-color","#fffc01");
			//倒计时
		var _time;
			setime();
			$(this).find(".nextbtn").bind("click",nextBan);
			$(this).find(".prebtn").bind("click",preBan);
			$(this).find("i").bind("click",slideBan);
		//图片切换
		function moveBan(w){
			window.clearTimeout(_time)
			var width=w;
			var nowBan=_ban.eq(now)
			var nextBan=_ban.eq(num)	
				nowBan.fadeOut(500,function(){
					setime();
					bindBtn();
				})
				nowBan.css({zIndex:0})	
				_slideIcons.css("background-color","#fff");
				//nextBan.css({top:0,left:width,zIndex:8})
				nextBan.fadeIn(1000)	
				_slideIcons.eq(num).css("background-color","#fffc01");	
		}
		//倒计时开始
		function setime(){
			_time=setTimeout(timeOut,options.timeInterval);	
		}
		//倒计时结束
		function timeOut(){
			window.clearTimeout(_time);
			$(this).find(".nextbtn").unbind("click",nextBan);
			$(this).find(".prebtn").unbind("click",preBan);
			$(this).find("i").unbind("click",slideBan);
			num+=1;
			now=num-1;
			if(num > len-1){
				num=0;
				now=len-1
			}
			moveBan(_w);
		}
		//开放按钮点击
		function bindBtn(){
			$(this).find(".nextbtn").bind("click",nextBan);
			$(this).find(".prebtn").bind("click",preBan);	
			$(this).find("i").bind("click",slideBan);
		}
		//下一张图
		function nextBan(){
			$(this).find(".nextbtn").unbind("click",nextBan);
			$(this).find(".prebtn").unbind("click",preBan);
			$(this).find("i").unbind("click",slideBan);
			window.clearTimeout(_time);
			num+=1;
			now=num-1;
			if(num>len-1){
				num=0;
				now=len-1
			}
			moveBan(_w)
		}
		//上一张图
		function preBan(){
			$(this).find(".nextbtn").unbind("click",nextBan);
			$(this).find(".prebtn").unbind("click",preBan);
			$(this).find("i").unbind("click",slideBan);
			window.clearTimeout(_time);
			num-=1;
			now=num+1;
			if(num<0){
				num=len-1;	
				now=0
			}
			moveBan(-_w)
		}
		//指定图
		function slideBan() {
			$(this).find(".nextbtn").unbind("click",nextBan);
			$(this).find(".prebtn").unbind("click",preBan);
			$(this).find("i").unbind("click",slideBan);
			var index = _slideIcons.index($(this));
			now = num;
			if(index == now) {
				return false;
			}
			num = index;
			if(num < now) {
				moveBan(-_w);
			}else{
				moveBan(_w)
			}
		}
	};
})();

/***
	点赞
**/
(function(){
	$.paiseMain=function(){
		var paise=$(".praise")
			paise.each(function(a) {
				var _item=paise.eq(a)
					_item.click(function(){

						var txt=$(this).find(".aiseTxt")
						var str=txt.html()
						var num=parseInt(str) + 1
							txt.html(num)
							num = num + 10*Math.random()
						var pid = $(this).attr('pid')
						$.getJSON("/site/updatepraise",{"pid":pid,"praisenum":num,"random":Math.random()},function(json){});

					})
			});	
	}

})();

/***
	年龄选择
**/
(function(){
	$.ageMain=function(){
		var about=$(".newsPro_about")
			about.each(function(i) {
				var _item=about.eq(i)
				var Inage=_item.find(".Inage")
					Inage.each(function(k) {
						var _age=Inage.eq(k)
							_age.click(function(){
							Inage.removeClass("_cur")
							$(this).addClass("_cur")
						})
					});
			});		
	}
})();

/***
    autor:haoxin
    改变滚动焦点广告定位
**/
(function(){
	$.fn.picScroll = function(options){
		options = $.extend({
			'firstHeight':0,
			'secondHeight':0,
			'fixedTop':0,
			'absoluteTop':0
		},options);
		var _self = this;
		$(window).scroll(function() {
			var sc_Top = $(document).scrollTop();
            if(sc_Top < options.firstHeight) {
                _self.removeClass("scrollFixed").removeClass("scrollAbsolute");
            }else if(sc_Top > options.firstHeight && sc_Top < options.secondHeight) {
                _self.removeClass("scrollAbsolute").addClass("scrollFixed").css('top',options.fixedTop + 'px');
            }else{
                _self.removeClass("scrollFixed").addClass("scrollAbsolute").css('top',options.absoluteTop + 'px');
            }
		});
		return this;
	};
})();

/***
    auto:haoxin
    tabs插件
**/
(function(){
	$.fn.yedTabs = function(options){
		options = $.extend({
			index:0,
			selClass:"selected",
			beforeClick:null,
			afterClick:null
		},options);
		$(this).each(function(){
			var tabList = $(this).find(".tablists"),
		        tabOptions = $("li",tabList),
		        contentboxs = $(this).find(".tabbox");
		    var selClass = options.selClass,
		        index = options.index;
		    init();
		    function init() {
			    $(tabList).addClass('clearfix');
			    $.each(tabOptions,function(i,e) {
				    $(e).css({'float':'left','cursor':'pointer'});
				    if(i == index) {
					    $(e).addClass(selClass).siblings('li').removeClass(selClass);
					    $(contentboxs).eq(i).show().siblings('div').hide();
				    }
			    });
			tabSwitch();
		    }

		    function tabSwitch() {
			    $(tabOptions).on('click',function() {
				    if($(this).hasClass(selClass)) {
					    return false;
				    }
				    if(options.beforeClick != null) {
					    options.beforeClick.call(this,$(this));
				    }

				    var index = $(tabOptions).index(this);
				    $(this).addClass(selClass).siblings('li').removeClass(selClass);
				    $(contentboxs).eq(index).show().siblings('div').hide();
				
				    if(options.afterClick != null) {
					    options.afterClick.call();
				    }
			    });
		    }
		});
		
		return this;
	}
})();

/***
    auto:haoxin
    show waitingRoll
**/
(function() {
	$.showWaitRoll = function(options) {
		var top = $(window).height()/2;
		var left = $(window).width()/2;
		options = $.extend({
			"top":top,
			"left":left
		},options);
		var $loading = $("<div clsss='loading'><img src='/views/newtheme/resources/images/yy0.gif' alt='loading'/></div>");
        $loading.css({
        	"top":options.top + "px",
        	"left":options.left + "px",
        	"position":"absolute"
        }).show();
	}

	$.hideWaitRoll = function() {
		$(".loading").hide();
	}
})();

/***
    auto:haoxin
    alert dialog
**/
(function() {
	$.showConfirmDialog = function(options) {
		options = $.extend({
			message:"hello",
			onConfirm:defClick,
			onCancel:defClick
		},options);
		var dia_x = ($(window).width() - 300)/2 + "px";
	    var dia_y = ($(window).height() - 200)/2 + "px";
		if($(".confirmDialog").length == 0) {
			var domhtml = [];
			domhtml.push("<div class='confirmDialog' style='display:none;position:fixed;width:300px;height:155px;border: 1px solid #dadada;box-shadow: 0 0 2px #dadada;background-color:#fff;top:"+dia_y+";left:"+dia_x+"'>");
			domhtml.push("<i class='cancelIcon'></i>");
			domhtml.push("<div style='padding: 10px 20px;'>");
			domhtml.push("<h3 style='border-bottom: 2px solid #9100bd;'>系统提示</h3>");
			domhtml.push("<p class='tips' style='text-align: center;font-size:14px;'>"+options.message+"</p>");
			domhtml.push("<p style='position: absolute;bottom: 20px;right: 122px;'><input class='confirm' style='width: 74px;height: 33px;font-size: 15px;color:#fff;background-color: #9100bd;border:none;' type='button' value='确定'/><p>");
			domhtml.push("</div></div>");
			$(domhtml.join("")).appendTo("body");
		}
        $(".confirmDialog").find(".tips").html(options.message).end().show();
        $(".confirmDialog .confirm").die("click").on("click",function() {
        	options.onConfirm.call(window);
        });
        $(".confirmDialog .cancelIcon").die("click").on("click",function() {
        	options.onCancel.call(window);
        });
		
		function defClick() {
			$(".confirmDialog").hide();
		}
	}
})();

/***
	 2015 02 12 by haoxin
***/
/***lazyload***/
(function($){
	$.fn.lazyload = function(options) {
		var params = $.extend({
			attr:"data-url",
			container: $(window),
			callback: $.noop
		},options || {});

		params.cache = [];

		$(this).each(function() {
			var url= $(this).attr(params["attr"]);
			//重组
			var data = {
				obj: $(this),
				url: url
			};
		
			params.cache.push(data);
		});
		var callback = function(call) {
			if ($.isFunction(params.callback)) {
				params.callback.call(call.get(0));
			}
		};
		//动态显示数据
		var loading = function() {
			
			var contHeight = params.container.height();
			if (params.container.get(0) === window) {
				contop = $(window).scrollTop();
			} else {
				contop = params.container.offset().top;
			}		
			
			$.each(params.cache, function(i, data) {
				var o = data.obj, url = data.url, post, posb;
				if (o) {
					post = o.offset().top - contop, posb = post + o.height();
					if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
						if (url) {
							//在浏览器窗口内
				            //图片，改变src
							callback(o.attr("src", url));
						} else {
							// 无地址，直接触发回调
							callback(o);
						}
						data.obj = null;	
					}
				}
			});	
		};
		//事件触发
		//加载完毕即执行
		loading();
		//滚动执行
		params.container.bind("scroll", loading);
	}
})(jQuery);

//广告图片播放


/*var _ban=$(".mainBanList").find("li")
var len=_ban.length
var num=0
var _w=$(".mainBanList").find("li").width()
	_ban.each(function(b) {
		var _Item=_ban.eq(b)
			_Item.css({left:_w * b + "px"})
			
	});
$(".nextbtn").click(function(){
	if(num < len-1){
		num+=1	
		_ban.each(function(b) {
			var _Item=_ban.eq(b)
				_Item.animate({left:_ban.eq(b).position().left-(num * _w ) + "px"})
				
		});
	}
})
$(".prebtn").click(function(){
	if(num > 0){
		num-=1	
		_ban.each(function(b) {
			var _Item=_ban.eq(b)
				_Item.animate({left:_ban.eq(b).position().left + _w + "px"})	
				
		});
	}	
})	*/