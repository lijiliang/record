/***lazyload***/
;(function($){
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