/**
 * @fileOverview slider
 * @author liang
 */
(function(){
	$.fn.slider = function(){
		/**
		 * [defaults 定义默认配置项]
		 */
		var defaults = {
			picBox: '.pic-list',
			numBox: '.num-list',
			next: '.next',
			prev: '.prev',
			imgWidth: 1180
		}

		var opts = $.extend(true, defaults, options),
			This = $(this),
			picBox = This.find(opts.picBox),
			numBox = This.find(opts.numBox),
			len = pciBox.find('li').length,
			width = opts.imgWidth,
			timer = null,
			iNow = 0;

		picBox.width(opts.imgWidth * length);

		//点击快速跳到某一张
		numBox.find('li').on('click', function(){
			iNow = $(this).index();
			animateMove(iNow);
		});

		//左右按钮显示与隐藏
		This.hove(function(){
			This.find(opts.next).animate({right: 0});
            This.find(opts.prev).animate({left: 0});
		},function(){
			This.find(opts.next).animate({right: '-40px'});
			This.find(opts.prev).animate({left: '-40px'});
		});

		//点击 上一个
		This.find(opts.next).on('click', function(){
			if(iNow >= len -1){
				iNow = -1;
			}
			iNow++;
			animateMove(iNow);
		})

		//点击 下一个
		This.find(opts.prev).on('click', function(){
			if(iNow <= 0){
				iNow = len;
			}
			iNow--;
			animateMove(iNow);
		});

		//开启定时器
		timer = setInterval(function(){
			iNow++;
			if(iNow >= len){
				iNow = 0;
			}
			animateMove(iNow);
		}, 3000);	
		This.hover(function(){
			clearInterval(timer);
		}, function(){
			timer = setInterval(function(){
				iNow++;
				if(iNow >= len){
					iNow = 0;
				}
				animateMove(iNow);
			}, 3000);
		})

		/**
		 * [animateMove 主函数实现]
		 * @param  {[type]} num [传入的第几个数值]
		 */
		function animateMove(num){
			numBox.find('li').removeClass('active');
			numBox.find('li').eq(num).addClass('active');
			picBox.animate({left: - width * num}, 'slow');
		};

	};	
}(jQuery));