var page = 1;
var loading = 1;
$(window).bind("scroll", function() {
    var scrollTop2 = $('.b_o_t').offset().top;
    var scrollTop = $('.hp-footer .hpf-container').offset().top;
    // 判断窗口的滚动条是否接近页面底部
    if (scrollTop2 <= scrollTop + 60) {

        //添加新数据
        if (loading == 1) { //2加载中 1可以
            $('#plist').css('padding-bottom', '100px');
            $('body,html').animate({
                scrollTop: scrollTop2 + 100
            }, 0);
            loading = 2;
            page++;

            var pageurl = window.location.href;
            var ajaxurl;
            if (pageurl.indexOf("?") > 0) {
                ajaxurl = pageurl + '&ajax=1&page=' + page;
            } else {
                ajaxurl = pageurl + '?ajax=1&page=' + page;
            }

            $('#ajax-loader').css('bottom', '105px').css('top', 'inherit');
            $.get(ajaxurl, function(data) {
                $('#ajax-loader').css('bottom', 'inherit').css('top', '50%');
                if (data.length < 50) {
                    $("#plist").append('<p class="ajax-down">没有更多内容咯....</p>');
                    $('.ajax-down').fadeOut(function() {
                        $('#plist').css('padding-bottom', '0px');
                    });
                    return false;
                }
                $("#plist").append(data);
                $('.hm-item-pannel-ajax').fadeIn();
                $('#plist').css('padding-bottom', '0px');
                loading = 1;
            });
        }


    }
});

$(document).on('click', '#l .ys', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var that = $(this);
    var isAdd = that.hasClass('sc') ? '1' : '0';
    var data = {};
    var likeObj = that.parents('#l').find('.likecount');
    var likeCounts = parseInt(likeObj.text());
    var isAdd = that.hasClass('sc') ? '1' : '0';
    if (that.hasClass('cur')) {
        return false;
    }
    if (typeof(that.attr('issend')) == 'undefined') {
        that.attr('issend', '1');
        var id = that.attr('data-id');

        if (that.hasClass('ys')) { //有事
            var url = '/social/interview/like/ajax/' + id + '/1';

        }
        if (url.length > 0) {
            $.ajax({
                type: 'post',
                url: url,
                data: data,
                dataType: 'json',
                success: function(result) {
                    if (isAdd == '1') {
                        console.info(likeCounts);
                        var val = likeCounts + 1;
                        likeObj.text(val);
                    }
                    if ($(data).length > 0) {
                        if (that.hasClass('cur')) {
                            that.removeClass('cur');
                        } else {
                            that.addClass('cur');
                        }
                    } else {
                        that.addClass('cur');
                    }
                    that.removeAttr('issend');
                }
            });
        }
    } else {
        return false;
    }

});

$('img[data-original]').lazyload({
    effect: "fadeIn"
});
$('img[data-original]').lazyload({
    threshold: 200
});
$('img[data-original]').lazyload({
    skip_invisible: false
});
var indexVideo = {
    init: function() {
        indexVideo.wrapper = $("#video");
        indexVideo.player = this.wrapper.find("video")[0];

        $('.look-video-el,.video_xj').click(function() {
            if ($(this).hasClass('look-video-el')) {
                var video_url = "http://223.6.251.44/media/invitation/unbox.mp4";
                $('#zihua-player').zihuaPlayer({
                    cdn: "http://z.zihua.com.cn/prod",
                    videoUrl: video_url,
                    autoPlay: true
                });
                $('#zihua-player').show();
            } else {
                var player = polyvObject('#zihua-player2').videoPlayer({
                    'width': '100%',
                    'height': '100%',
                    'vid': 'a0dedeea8b09aa79417518963aac0096_a'
                });
                $('#zihua-player2').show();
            }
            $('.works-overlay').show();
            $('.look-video-dialog').show();
        });

        $('.lvd-closed').click(function() {
            $('#zihua-player,#zihua-player2').hide();
            $('.look-video-dialog').hide();
            $('.works-overlay').hide();
            //indexVideo.pause();
        });
    },
    play: function() {
        //indexVideo.player.load();
        //indexVideo.player.play();
        $f().play();
    },
    pause: function() {
        //indexVideo.player.pause();
        $f().stop();
    }
};

var favorite = {
    init: function() {
        $('.collect-icon-post').click(function(event) {
            event.preventDefault();
            favorite.addFavorite($(this));
        });
    },
    addFavorite: function($el) {
        if ($el.hasClass('icon-collection')) {
            $el.removeClass('icon-collection').addClass('icon-no-collection');
            $el.attr('title', '收藏');
        } else {
            $el.removeClass('icon-no-collection').addClass('icon-collection');
            $el.attr('title', '已收藏');
        }

        $.post($el.data('action'));
    }
};

$(function() {
    $('.ncl-pro-wrap .pro-item').hover(function() {
        var _h = $(this).find('.title p').css('height', 'auto').height();
        var _h2 = $(this).find('.title a').css('height', 'auto').height();
        $(this).find('.title p').height(0).animate({
            height: _h,
            marginTop: '8px'
        }, 300);
        $(this).find('.title a').height(20).animate({
            height: _h2
        }, 300);
    }, function() {
        $(this).find('.title p').animate({
            height: '0px',
            marginTop: '0px'
        }, 300);
        $(this).find('.title a').animate({
            height: '20px'
        }, 300);
    })

    indexVideo.init();
    favorite.init();
    $('.flexslider').flexslider({
        animation: "fade",
        slideshowSpeed: 4000,
        animationDuration: 600,
        animationLoop: true,
        slideshow: true,
        controlNav: true,
        pauseOnAction: true,
        pauseOnHover: true,
        directionNav: true,
        prevText: "",
        nextText: "",
        manualControls: ".carousel-indicators li",
        before: function(slider) {
            $('.carousel-indicators li').each(function(_index) {
                var _src_2 = $('.flexslider li').eq(_index).find('.src').attr('src_2');
                var _style_2 = $('.flexslider li').eq(_index).find('.style_2').attr('style_2');
                $('.flexslider li').eq(_index).find('.src').attr('src', _src_2);
                $('.flexslider li').eq(_index).find('.style_2').css('backgroundImage', 'url(' + _style_2 + ')');
            })
        }
    });
});


function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
