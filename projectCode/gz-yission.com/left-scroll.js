/**
 * @fileOverview js向左滚动插件
 * @author liang
 */
(function(){
	$.fn.leftScroll = function(){
		var This = $(this),
			next = This.find('.next'),
			prev = This.find('.prev');
			num = 0,
			scrollBox = This.find('.list'),
			widtd = scrollBox.find('li').width(),  //一个图片的宽度
			len = scrollBox.find('li').length;

		scrollBox.width(width * len);
		next.on('click', function(){
			num ++;
			if(num > len-4){
				num = 0;
			};
			scrollBox.animate({left: -num * width});
		})
		prev.on('click', function(){
			num --;
			if(num < 0){
				num = len -4;
			}
			scrollBox.animate({left: -num * width});
		})
	};
}(jQuery));

/*
http://code.ciaoca.com/jquery/transit/
jQuery Transit 使用 CSS3 的新特性来实现过渡效果，比默认的.animate方法要顺畅得多。
 */