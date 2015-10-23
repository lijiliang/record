/**
 * moveBox 鼠标移动平滑效果
 * 要引用 easing.js
 */
;(function($){
    $.fn.moveBox = function (options){
        var defaults = {
            moveBox: '.move-box',
            target: 'dd'
        }

        var opts = $.extend(true,defaults,options);
        var moveBox = $(this).find(opts.moveBox);
        var moveTarget = $(this).find(opts.target);

        $(this).hover(function () {
            moveBox.stop(true,true).fadeIn(100);
        }, function (){
            moveBox.stop(true,true).fadeOut(100);
        });

        moveTarget.on('mouseenter', function (){
            moveBox.stop(true,true).animate({
                top: $(this).offset().top - $(this).parent().offset().top
            }, {
                easing: 'easeOutQuart',
                duration: 300
            });
        });
    };

}(jQuery));

//调用：$('.pattern-move-box').moveBox();


$(".thumb").each(function () {
    $(this).bind("mouseenter mouseleave",function(e) {
        var w = $(this).width();
        var h = $(this).height();
        var x = (e.pageX - $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1);
        var y = (e.pageY - $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1);
        var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        if(e.type == 'mouseenter'){
            switch(direction) {
                case 0:
                    $(this).find('.thumb-mark').css({ left: 0, top: '-100%'}).animate({ top: 0}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 1:
                    $(this).find('.thumb-mark').css({ left: '100%', top: 0}).animate({ left: 0}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 2:
                    $(this).find('.thumb-mark').css({ left: 0, top: '100%'}).animate({ top: 0}, {
                    easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 3:
                    $(this).find('.thumb-mark').css({ left: '-100%', top: 0}).animate({ left: 0}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
            };
        }else{

            switch(direction) {
                case 0:
                    $(this).find('.thumb-mark').animate({ top: '-100%'}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 1:
                    $(this).find('.thumb-mark').animate({ left: '100%'}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 2:
                    $(this).find('.thumb-mark').animate({ top: '100%'}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
                case 3:
                    $(this).find('.thumb-mark').animate({ left: '-100%'}, {
                        easing: 'easeOutQuart',
                        duration: 300
                    });
                    break;
            };
        }

    });
})


/* 需要引入 jquery.transit.min.js */
$(".public-servic .mod .direction-box").each(function () {
$(this).bind("mouseenter mouseleave",function(e) {
    var w = $(this).width();
    var h = $(this).height();
    var x = (e.pageX - this.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
    var y = (e.pageY - this.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
    var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    var eventType = e.type;
    var dirName = new Array('上方','右侧','下方','左侧');
    var markIcon = '.mark-icon';

    console.log(dirName[direction]);

    if(e.type == 'mouseenter'){

        switch(direction){
            case 0:
                $(this).find(markIcon).css({transformOrigin: 'right top',transform: 'rotate(90deg)'});
                $(this).find(markIcon).transition({ rotate: '0deg' });
                break;
            case 1:
                $(this).find(markIcon).css({transformOrigin: 'right bottom',transform: 'rotate(90deg)'})
                $(this).find(markIcon).transition({ rotate: '0deg' });
                break;
            case 2:
                $(this).find(markIcon).css({transformOrigin: 'right bottom',transform: 'rotate(-90deg)'})
                $(this).find(markIcon).transition({ rotate: '0deg' });
                break;
            case 3:
                $(this).find(markIcon).css({transformOrigin: 'left bottom',transform: 'rotate(-90deg)'})
                $(this).find(markIcon).transition({ rotate: '0deg' });
                break;
        }
    }else{
        switch(direction){
            case 0:
                $(this).find(markIcon).css({transformOrigin: 'right top'});
                $(this).find(markIcon).transition({ rotate: '90deg' });
                break;
            case 1:
                $(this).find(markIcon).css({transformOrigin: 'right bottom'})
                $(this).find(markIcon).transition({ rotate: '90deg' });
                break;
            case 2:
                $(this).find(markIcon).css({transformOrigin: 'right bottom'});
                $(this).find(markIcon).transition({ rotate: '-90deg' });
                break;
            case 3:
                $(this).find(markIcon).css({transformOrigin: 'left bottom'});
                $(this).find(markIcon).transition({ rotate: '-90deg'});
                break;
        }
    }
});
