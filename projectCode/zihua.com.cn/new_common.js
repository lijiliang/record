var open_menu = {
    box_hover: function () {
        $('.open_menu .left dl').eq(0).addClass('cur');
        $('.open_menu:eq(0) .right .l,.open_menu:eq(0) .right .r').css('height',$('.open_menu:eq(0) .left dl').size()*64 + 'px');
        $('.new_nav').hover(function(){
            if($('.validate').css('display') == 'block'){
                $('.open_menu').css('top','85px');
            }else{
                $('.open_menu').css('top','55px');
            }
        })
        $('.open_menu').hover(function () {
            
        }, function () {
            $('.open_menu .right').hide();
            $('.open_menu .left dl').removeClass('cur');
            $('.open_menu .left dl').eq(0).addClass('cur');
        })
        $('.new_nav .menu2 a:eq(2),.open_menu:eq(0)').hover(function () {
            if($('.new_nav .menu2 a:eq(2)').hasClass('careercourse')){
                return false;
            }
            $('.open_menu .right').eq(0).show()
            $('.open_menu').eq(0).show();
            $('.new_nav .menu2 a:eq(2)').addClass('cur');
        }, function () {
            $('.new_nav .menu2 a:eq(2)').removeClass('cur');
            $('.open_menu').eq(0).hide();
        })
        $('.menu_box dl dd .portfolio,.open_menu:eq(1)').hover(function () {
            $('.open_menu').eq(1).show();
        }, function () {
            $('.open_menu').eq(1).hide();
        })
    },
    box_inner_hover: function () {
        $('.open_menu .left dl').hover(function () {
            var _index = $(this).index();
            $(this).addClass('cur').siblings().removeClass('cur');
            $('.open_menu .right').eq(_index).show().siblings('.right').hide();
        })
    }
}

//var aspect = {
//    toggle: function () {
//        $('.aspect dd p span').click(function () {
//            var _this = $(this).parent();
//            _this.siblings().css('height', '23px');
//            if (_this.css('height') == '23px') {
//                _this.css('height', 'auto');
//            } else {
//                _this.css('height', '23px');
//            }
//        })
//    }
//}

var path_share = {
    toggle: function () {
        $(document).click(function () {
            $('.path_top .box .fx_box').hide();
        })
        $('.path_top .box .fx,.path_top .box .fx_box').click(function (e) {
            e.stopPropagation();
            $('.path_top .box .fx_box').show();
        })
    }
}
var search = {
    toggle:function(){
        $('.search .text').focus(function(){
            $('.search .btns').addClass('focus');
            $(this).animate({width:"200px"});
        })
        $('.search .text').blur(function(){
            $('.search .btns').removeClass('focus');
            $(this).animate({width:"104px"});
        })
    }
}

$(function () {
    open_menu.box_hover();
    open_menu.box_inner_hover();
    path_share.toggle();
    search.toggle();
//    aspect.toggle();
})















