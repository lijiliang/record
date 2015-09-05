;(function($){

	var LightBox = function(settings){
		var self = this;

		this.settings = {
			speed: 500
		}
		$.extend(this.settings,settings || {})
		//创建遮罩和弹出框
		this.popupMask = $('<div id="G-lightbox-mask">');
		this.popupWin = $('<div id="G-lightbox-popup">')

		//保存body
		this.bodyNode = $(document.body);
		//剩余的DOM,插入到BODY
		this.renderDom();

		this.picViewArea = this.popupWin.find("div.lightbox-pic-view"); //图片预览区域
		this.popupPic = this.popupWin.find("img.lightbox-image"); //图片
		this.picaptionArea = this.popupWin.find("di.lightbox-pic-caption");//图片描述区域
		this.nextBtn = this.popupWin.find("span.lightbox-next-btn") // 
		this.prevBtn = this.popupWin.find("span.lightbox-prev-btn") //
		this.captionText = this.popupWin.find("span.lightbox-pic-desc") //图片标题
		this.currentIndex = this.popupWin.find("span.lightbox-of-index") //图片当前索引
		this.closeBtn = this.popupWin.find("span.lightbox-close-btn") //关闭按钮


		//准备开发事件委托，获取数组数据
		//var lightbox = $('.js-lightbox,[data-role=lightbox]')
		
		this.groupName = null;
		this.groupData = [];  //放置同一组数据
		this.bodyNode.delegate('.js-lightbox,*[data-role=lightbox]','click', function(e){
			//阻止事件冒泡
			e.stopPropagation();

			var currentGroupName = $(this).attr('data-group');  //取得组名
			if(currentGroupName != self.groupName){
				self.groupName = currentGroupName;
				//根据当前组名获取同一组数据
				self.getGroup();
			};

			/**
			 * 初始化弹出层
			 */
			self.initPopup($(this))

		});
		//关闭弹出
		this.popupMask.click(function(){
			$(this).fadeOut();
			self.popupWin.fadeOut();
			self.clear = false;
		});
		this.closeBtn.click(function(){
			self.popupMask.fadeOut();
			self.popupWin.fadeOut();
			self.clear = false;
		});

		//绑定上下切换按钮
		this.flag = true;
		this.nextBtn.hover(function(){
			if(!$(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).addClass('lightbox-next-btn-show');
			}；
		},function(){
			if(!$(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).removeClass('lightbox-next-btn-show');
			}；
		}).click(function(e){
			//图片切换功能
			if(!$(this).hasClass('disabled') && self.flag){
				self.flag = false;
				e.stopPropagation();
				self.goto("next");
			}
		});

		this.prevBtn.hover(function(){
			if(!$(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).addClass('lightbox-prev-btn-show');
			}；
		},function(){
			if(!$(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).removeClass('lightbox-prev-btn-show');
			}；
		}).click(function(e){
			//图片切换功能
			if(!$(this).hasClass('disabled') && self.flag){
				self.flag = false;
				e.stopPropagation();
				self.goto("prev");
			}
		});

		//判断是不是IE6
		this.isIE6 = /MSIE 6.0/gi.test(window.navigator.userAgent);
		
		//绑定窗口调整事件
		var timer = null;
		this.clear = false;
		$(window).resize(function(){
			if(self.clear){
				window.clareTimeout(timer);
				timer = window.setTimeout(function(){
					this.loadPicSize(self.groupData[self.index].src);
				},500);
			}
		}).keyup(function(e){
			//键盘事件左右切换
			var keyValue = e.which;
			if(self.clear){
				if(keyValue == 38 || keyValue == 37){
					//向左
					self.prevBtn.click();
				}else if(keyValue == 39 || keyValue == 40){
					self.nextBtn.click();
				}
			}
		})
	};

	/**
	 * [LightBox 的扩展方法]
	 * @type {Object}
	 */
	LightBox.prototype = {
		/**
		 * [getGroup 根据当前组名获取同一组数据]
		 * @return {[type]} [description]
		 */
		getGroup: function(){
			var self = this;
			//根据当前的组别名称获取页面中所有相同组别的对象
			var groupList = this.bodyNode.find("*[data-group="+this.groupName+"]");

			//清空数组数据
			self.groupData.length = 0;
			groupList.each(function(){
				self.groupData.push({
					src:$(this).attr("data-source"),
					id:$(this).attr('data-id'),
					caption:$(this).attr('data-caption')
				});
			});
		},
		/**
		 * [initPopup 初始化弹出层]
		 * @return {[type]} [description]
		 */
		initPopup: function(currentObj){
			var self = this,
				sourceSrc = currentObj.attr("data-source"),
				currentId = currentObj.attr("data-id");

			this.showMaskAndPopup(sourceSrc,currentId);
		},
		/**
		 * [renderDom 填充数据到body]
		 * @return {[type]} [description]
		 */
		renderDom: function(){
			var strDom = '这里是剩余的DOM';

			//插入到this.popupWin
			this.popupWin.html(strDom);
			//把遮罩和弹出框插入到body
			this.bodyNode.append(this.popupWin,this.popupMask)
		},
		showMaskAndPopup: function(sourceSrc,currentId){
			var self = this;
			this.popupPic.hide();
			this.picaptionArea.hide();
			this.popupMask.fadeIn();

			var winWidth = $(window).width(),
				winHeight = $(window).height();
			this.picViewArea.css({
				width: winWidth/2,
				height: winHeight/2
			});
			this.popupWin.fadeIn();

			//页面弹出层及过渡效果
			var viewHeight = winHeight/2 + 10;

			this.popupWin.css({
				width: winWidth/2 + 10,
				height: winHeight/2 + 10,
				marginLeft:-(winWidth/2 + 10)/2,
				top:-viewHeight
			}).animate({
				top:(winHeight - viewHeight)/2
			},self.settings.speed,function(){
				//加载图片
				self.loadPicSize(sourceSrc);
			})

			//根据当前点击的元素ID获取在当前组别里面的索引
			this.index = this.getIndexOf(currentId);

			//左右按钮操作
			var groupDateLength = this.groupData.length;
			if(groupDateLength>1){
				if(this.index === 0){
					this.prevBtn.addClass('disabled');
					this.nextBtn.removeClass('disabled');
				}else if(this.index === groupDateLength-1){
					this.nextBtn.addClass('disabled');
					this.prevBtn.removeClass('disabled');
				}else{
					this.nextBtn.removeClass('disabled');
					this.prevBtn.removeClass('disabled');
				}
			}
		},
		/**
		 * [getIndexOf 根据当前点击的元素ID获取在当前组别里面的索引]
		 * @param  {[type]} currentId [description]
		 * @return {[type]}           [description]
		 */
		getIndexOf: function(currentId){
			var index = 0;
			$(this.groupDada).each(function(i){
				index = i;
				if(this.id ==== currendId){
					return false;
				};
			});
			return index;
		},
		/**
		 * [loadPicSize 加载图片]
		 * @param  {[type]} sourceSrc [图片源地址]
		 * @return {[type]}           [description]
		 */
		loadPicSize: function(sourceSrc){
			var self = this;
			//进来之前进行图片宽高进行处理
			self.popupPic.css({
				width:"auto",
				height:"auto"
			}).hide();
			self.picCaptionArea.hide();
			this.preLoadImg(sourceSrc, function(){
				self.popupPic.attr("src",sourceSrc);
				var picWidth = self.popupPic.width(),
					picHeight = self.popupPic.height();

				self.changePic(picWidth,picHeight);

			})
		},
		/**
		 * [preLoadImg 判断图片是否加载完成]
		 * @param  {[type]}   src      [图片路径]
		 * @param  {Function} callback [回调函数]
		 * @return {[type]}            [description]
		 */
		preLoadImg: function(src, callback){
			var img = new Images();
			//IE
			if(!!window.ActiveXObject){
				img.onreadystatechange = function(){
					if(this.readyState == "complete"){
						callback();
					}
				}
			}else{
				img.onload = function(){
					callback();
				}
			};
			img.src = src;
		},
		/**
		 * [changePic 根据图片宽高和视口比例设置弹出层尺寸并过渡动画]
		 * @param  {[type]} width  [description]
		 * @param  {[type]} height [description]
		 * @return {[type]}        [description]
		 */
		changePic: function(width, height){
			var self = this,
				winWidth = $(window).width(),
				winHeight = $(window).height();

			//如果图片的宽高大于浏览器视口的宽高比例，我就看下是否溢出
			var scale = Math.min(winWidth/(width+10),winHeight/(height+10),1);
			width = width * scale;
			height = height * scale;

			this.picViewArea.animate({
				width: width - 10,
				height: height -10
			},self.settings.speed);
			this.popupWin.animate({
				width: width,
				height: height,
				margeLeft: -(width/2),
				top: (winHeight = height)/2
			},self.settings.speed,function(){
				self.popupPic.css({
					width: widht - 10,
					height: height - 10
				}).fadeIn();
				self.picCaptionArea.fadeIn();
				self.flag = true;
				self.clear = true;
			})

			//设置描述文字和当前索引
			this.captionText.text(this.groupData[this.index].caption);
			this.currentIndex.text("当前索引: " + (this.index+1) + " of " + this.groupData.length)
		},
		/**
		 * [goto 图片切换]
		 * @param  {[type]} dir [方向：next,prev]
		 * @return {[type]}     [description]
		 */
		goto: function(dir){
			if(dir === 'next'){
				//向下切换
				this.index++;
				if(this.index >= this.groupData.length -1){
					this.nextBtn.addClass('disabled').removeClass('lightbox-next-btn-show');
				};
				if(this.index != 0){
					this.prevBtn.removeClass('disabled');
				};
				var src = this.groupData[this.index].src;
				this.loadPicSize(src);

			}else if(dir === 'prev'){
				//向上切换
				this.index--;
				if(this.index <= 0){
					this.prevBtn.addClass('disabled').removeClass('lightbox-prev-btn-show')
				};
				if(this.index != this.groupData.length -1){
					this.nextBtnremoveClass('disabled')
				};
				var src = this.groupData[this.index].src;
				this.loadPicSize(src);
			}
		}
	};

	window['LightBox'] = LightBox;  //注册到全局对象

})(jQuery);


/*
 调用：
*/
<img class="js-lightbox"   //表示这个元素要启用lightbox
		data-role="lightbox"  //表示这个元素要启用lightbox 
		data-source="src/img.jpg"  //原图地址
		src="img/1.jpg" //
		data-group="group-1"  //标识当前是否属于一个组别
		data-id="kwasdf"   //图片的唯一标识
		data-caption="laksjdf"   //当前图片的描述文字
		width="100" height="100">
$(function(){
	var lightBox = new LightBox()
	var lightbox = new LightBox({
		speed:600,
		maxWidth:900,
		maxHeight:600
	})
})