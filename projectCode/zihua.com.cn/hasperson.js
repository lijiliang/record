/**
 * Name:hasperson.js
 * Date:2014-11-12
 */

$(function () {
    $(document).on('click','.hp-home-wrap .hm-item-pannel .hmi-img-tpl .a span b',function(e){
    e.preventDefault();
    e.stopPropagation();
    var that = $(this);
    var data = {};
    var con1 = (that.hasClass('cur') && !that.hasClass('ys') && !that.hasClass('dz'));
    var con2 = (that.hasClass('ys') && that.hasClass('cur'));
    var con3 = that.hasClass('btn-login-dialog');
    
    var likeObj = that.parents('.hm-item-pannel').find('.likecount');
//    var likeCount = parseInt(likeObj.text());
    var likeCounts = parseInt(likeObj.text());
    var isAdd = that.hasClass('sc') ? '1' : '0';
    console.info(likeCounts);
    console.info(likeObj);
    
    
    if(con1 ||  con2 || con3){
        return false;
    }else{
        if(typeof(that.attr('issend')) == 'undefined'){
            that.attr('issend','1');
            var id = that.attr('data-id');
            if(that.hasClass('ys')){    //有事
                var url = that.hasClass('sc') ? '/social/interview/like/ajax/'+id+'/1' : '';
            }else{                      //有人
                var url = that.hasClass('sc') ? '/social/interview/like/ajax/'+id+'/0' : '/social/user/collect/'+id;
                if(!that.hasClass('sc')){
                    var collect = that.hasClass('cur') ? '0' : '1';
                    data={act:'1',collect:collect};
                }
            }
            if(url.length > 0){
                $.ajax({
                    type:'post',
                    url:url,
                    data:data,
                    dataType:'json',
                    success:function(result){
                        console.info(isAdd);
                        if(isAdd == '1'){
                            console.info(likeCounts);
                            var val = likeCounts+1;
                            likeObj.text(val);
                        }
                        if($(data).length > 0){
                            if(that.hasClass('cur')){
                                that.removeClass('cur');
                            }else{
                                that.addClass('cur');
                            }
                        }else{
                            that.addClass('cur');
                        }
                        that.removeAttr('issend');
                    }
                });
            }
        }else{
            return false;
        }
    }

    });
    //youren列表弹出详情
    $(document).on('click','.hmi-img-tpl a,.scroll_list a',function(e){
        var wurl = window.location.href;
        var id = $(this).parent('.hmi-img-tpl').attr('detailid');
        if(!id)
        {
            id = $(this).data('id');
        }
        if (wurl.indexOf('portfolio/list') > 0 && id)
        {
            e.preventDefault();
            var url = $(this).attr('href');
            $.post(url, {ajax: '1'}, function (data) {
                if (data)
                {
                    $('.detail-overlay').height($(window).height());
                    //var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    //$('.detail-overlay').css('top', scrollTop);
                    $('.detail-dialog #detail_box').html(data);
                    $(document.body).css("overflow","hidden");
                    $('.detail-overlay').show();
                    $('.detail-dialog').show();
                    $('input[name=login_to]').val(url);
                    complaintDialog.init();
                }
            });
        }
        var num = 0;
        $('.detail-dialog').hover(function(){
            num = 1;
        },function(){
            num = 0;
        })
        $('.detail-overlay').click(function(){
            if(num == 0){
                $(this).animate({scrollTop:0},0);
                $(document.body).css("overflow","scroll");
                $(this).hide();
            }
        })
    });
    
    //图片 上下 定时 循环滚动
    /*var undownScrollTpl = {
     init:function(){
     this.panWrap = $('.updown-scroll-tpl');
     var _interval=5000;
     var _moving;
     this.panWrap.hover(function(){ 
     clearInterval(_moving);
     },function(){ 
     _moving = setInterval(function(){ 
     var _field = undownScrollTpl.panWrap.find('li:first'); 
     var _h = _field.height(); 
     _field.animate({marginTop:-_h+'px'},600,function(){
     _field.css('marginTop',0).appendTo(undownScrollTpl.panWrap);
     }); 
     },_interval)
     }).trigger('mouseleave');  
     }
     }
     undownScrollTpl.init();*/

    //搜索框 hover
    var searchFormWrap = $('.search-form-wrap'),
            searchFormInput = $('.hp-search-inp', searchFormWrap),
            searchBtn = $('.hp-search-btn', searchFormWrap);
    var sfPass = true;
    searchFormInput.keypress(function (e) {
        if (e.which == 13) {
            getUrl();
        }
    });
    searchBtn.click(function () {
        getUrl();
    });
    searchFormInput.on('focus click', function (e) {
        sfPass = false;
        searchFormWrap.addClass('sfw-on');
        searchFormInput.show();
        e.stopPropagation();
    }).on('blur', function () {
        sfPass = true;
    });
    $(document).click(function () {
        if (searchFormInput.val() == '') {
            searchFormWrap.removeClass('sfw-on');
            searchFormInput.hide();
        }
    });
    searchFormWrap.mouseenter(function () {
        searchFormInput.show();
        $(this).addClass("sfw-on");
    }).mouseleave(function () {
        if (searchFormInput.val() == '') {
            if (sfPass) {
                searchFormWrap.removeClass('sfw-on');
                searchFormInput.hide();
            }
        } else {
            searchFormWrap.addClass('sfw-on');
            searchFormInput.show();
        }
    });
    if (searchFormInput.val() !== '') {
        searchFormWrap.addClass('sfw-on');
        searchFormInput.show();
    }


//搜索



    //返回到顶部
    var toTopBtnEl = $('.to-top-btn'),
            winEl = $(window);
    /*winEl.scroll(function(){
     var scrollTop = winEl.scrollTop(),
     winH = winEl.height();
     if(scrollTop > 0){
     toTopBtnEl.show();
     }else{
     toTopBtnEl.hide();
     }
     });
     toTopBtnEl.click(function(){
     //winEl.scrollTop(0); //点击返回到顶部
     $('html,body').animate({ scrollTop: '0px' }, 500);
     });*/

    //滚动条到底部
    var isScrollBot = function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        if (scrollTop + windowHeight === scrollHeight) {
            return true;
        } else {
            return false;
        }
    };
    winEl.scroll(function () {
        if (isScrollBot()) {
            $('.hp-pro-load').show();
            //$.ajax();
        }
    });

    //作品页面
    //作品和专访切换
    var hwrNavWrap = $('.hwr-nav');
    hwrNavWrap.find('a').on('click', function () {
        hwrNavWrap.find('a').removeClass('hn-on');
        $(this).addClass('hn-on');
        var index = $(this).index();
        if (index == 0) {
            $('.hwsr-works-pannel').show();
            $('.hwsr-interwiew-pannel').hide();
        } else {
            $('.hwsr-works-pannel').hide();
            $('.hwsr-interwiew-pannel').show();
        }
    });
    //点赞
    var clickGoodEl = $('.support-btn'),
        supportAttenApvEl = $('.support-atten-apv');
    $(document).on('click','.support-btn',function () {

        if ($(this).hasClass('gray')) {
            alert('您已经赞过了。');
        } else {
            var id = $(this).attr('interview_id');
            var like_type = $(this).attr('like_type');
            var like = $(this);
            $.ajax({
                "type": "get",
                "url": "/social/interview/like/ajax/" + id + "/" + like_type,
                "success": function (responseData) {
                    if (responseData.status === 'true') {
                        var num = $("#like_trans").text();
                        num = parseInt(num);
                        if (num >= 0) {
                            num += 1;
                            $("#like_trans").text(num);
                        }
                        like.addClass('gray');
                        like.html('谢谢');
                        
                        if(supportAttenApvEl.length && !$('.atten-btn-el').hasClass('cannel')){
                            supportAttenApvEl.show();
                        }
                        
                    }

                }
            });
        }
    });
    
    if (supportAttenApvEl.length) {
        supportAttenApvEl.parent().mouseleave(function(){
            supportAttenApvEl.hide();
        });
        supportAttenApvEl.click(function(){
            $('.atten-btn-el').click();
            $(this).hide();
        });
    }

    //点击作品图 弹层
	$('#topic').click(function(e){
		e.preventDefault();
		$('#topic-wrap,.works-overlay').show();
		})
    var worksBoxEl = $('.hmi-text-tpl').find('.box-apv'),
            showDialogTpl = $('.works-overlay,.works-dialog');
    var oldScrollTop = 0;

    $(document).on('click','.box-apv', function () {
        oldScrollTop = winEl.scrollTop();
        var fromId = $(this).attr('fromId');
        var fromType = $(this).attr('fromType');

        $.ajax({
            "type": "get",
            "url": "/social/box/list",
            "data": {"fromId": fromId, 'fromType': fromType},
            "success": function (responseData) {
                if (responseData.success) {
                    $("#social_box").html(responseData.data);
                    winEl.scrollTop(0);
                    //关闭层
                    $('.wd-closed').on('click', function () {
                        winEl.scrollTop(oldScrollTop);
                        showDialogTpl.hide();
                        clearWdJsonNum();
                    });
                    showDialogTpl.show();
                }
            }
        });
    });

    //关闭层
    $('.wd-closed').on('click', function () {
        winEl.scrollTop(oldScrollTop);
        showDialogTpl.hide();
        clearWdJsonNum();
		$('#topic-wrap,.works-overlay').hide();
    });
    //清空异步数据
    var clearWdJsonNum = function () {
        //hcpTextEl.empty();
    };

    //点击评论发布按钮
    var wdCommentArea = $('.wd-comment-area');
    wdCommentArea.find('button').on('click', function () {
        var textareaVal = wdCommentArea.find('textarea').val();
        if (textareaVal.length < 1) {
            alert('还没输入！');
        }
        else if (textareaVal.length > 300) {
            alert('字数超过限制！');
            return false;
        } else {
            alert('success.');
            //$.ajax();
        }
    });
    //评论支持和反对
    var wdCommentListTpl = $('.wd-comment-list');
    wdCommentListTpl.find('.wd-support').on('click', function (evt) {
        var oldNum = $(this).next('.ok-num').text(),
                newNum = parseInt(oldNum) + 1;
        $(this).next('.ok-num').html(newNum);
        evt.preventDefault();
    });
    wdCommentListTpl.find('.wd-against').on('click', function (evt) {
        var oldNum = $(this).next('.no-num').text(),
                newNum = parseInt(oldNum) + 1;
        $(this).next('.no-num').html(newNum);
        evt.preventDefault();
    });


    // 分类列表下拉
	var zihuaSelect = {
	choice:function(){
		$('.select dl dd').click(function(){
			if($(this).hasClass('cur')){
				$(this).removeClass('cur');
				return false;
				}
			if($(this).parents('.select').find('.cur').size() == 3){
				$('.select p .warning').show().fadeOut(1000);
				}else{
					$(this).addClass('cur');
					}
			}).hover(function(){
				if(!$(this).hasClass('cur')){
					$(this).addClass('hover');
					}
				},function(){
					$(this).removeClass('hover');
					}),
		$('.select p span').click(function(){
                            var that = $(this);
                            //取消按钮
                            if(that.hasClass('cancle')){
                                $('.select dl dd').removeClass('cur');
                            }
                            //确定按钮
                            if(that.hasClass('confirm')){
                                var hover = that.parent().siblings('#list').find('.cur');
                                var id= '';
                                if(hover.length > 0){
                                    $.each(hover,function(){
                                        id +=$(this).attr('val')+',';
                                    });
                                    var id = id.substring(0,(parseInt(id.length)-1));
                                    
                                    var url = window.location.href;
                                    var locations = url.indexOf('ids=');
                                    var isargu = url.indexOf('?');
                                    if(isargu != '-1'){
                                        if(locations != '-1'){
                                            location.href = url.replace(/ids=\d+(\,\d+){0,}/,'ids='+id);
                                        }else{
                                            location.href = url+'&ids='+id;
                                        }
                                    }else{
                                        location.href = url+'?ids='+id;
                                    }
                                }
                            }
                            var _this = that.parents('.select');
                            _this.hide();
			}),
		$('.snav-pannel').hover(function(){
			$(this).find('.select').show();
			},function(){
				$(this).find('.select').hide();
				})
		}
	}
zihuaSelect.choice();

    //板块类型下拉
    var workListDateSel = {
        init: function () {
            this.selWrap = $('.sel-date-tpl');
            this.selTitle = $('.snav-title', this.selWrap);
            this.selListTpl = $('.snav-sel-tpl', this.selWrap);
            this.selOneItemTpl = $('.sel-one-list', this.selWrap);


            //鼠标滑过层显示与隐藏
            this.selWrap.mouseenter(function () {
                workListDateSel.selListTpl.show();
            }).mouseleave(function () {
                workListDateSel.selListTpl.hide();
                workListDateSel.selOneItemTpl.find('li').removeClass('onbg');
            });
            //1 级菜单点击 事件
            this.selWrap.on('click', '.sel-one-list li', function () {
                var meEl = $(this),
                        meElVal = meEl.html();
                workListDateSel.selItemLeave(meEl);
                workListDateSel.selTitle.html(meElVal);
                getUrl();
                workListDateSel.selListTpl.hide();
            });
        },
        selItemLeave: function (me, index) {
            workListDateSel.selOneItemTpl.find('li').removeClass('on');
            me.addClass('on');
            if (typeof index !== 'undefined' && index !== null) {
                workListDateSel.selOneItemTpl.find('li').eq(index).addClass('on');
            }
        },
        selTwoEnter: function (index) {
            workListDateSel.selOneItemTpl.find('li').removeClass('onbg');
            workListDateSel.selOneItemTpl.find('li').eq(index).addClass('onbg');
        }
    };
    workListDateSel.init();

    //板块类型下拉b
    var workListAreabSel = {
        init: function () {
            this.selWrap = $('.sel-areab-tpl');
            this.selTitle = $('.snav-title', this.selWrap);
            this.selListTpl = $('.snav-sel-tpl', this.selWrap);
            this.selOneItemTpl = $('.sel-one-list', this.selWrap);


            //鼠标滑过层显示与隐藏
            this.selWrap.mouseenter(function () {
                workListAreabSel.selListTpl.show();
            }).mouseleave(function () {
                workListAreabSel.selListTpl.hide();
                //workListAreabSel.selOneItemTpl.find('li').removeClass('onbg');
            });
            //1 级菜单点击 事件
            this.selWrap.on('click', '.sel-one-list li', function () {
                var meEl = $(this),
                        meElVal = meEl.html();
                workListAreabSel.selItemLeave(meEl);
                workListAreabSel.selTitle.html(meElVal);
                workListSel.getUrl(meEl);
                workListAreabSel.selListTpl.hide();
            });
        },
        selItemLeave: function (me, index) {
            workListDateSel.selOneItemTpl.find('li').removeClass('on');
            me.addClass('on');
            if (typeof index !== 'undefined' && index !== null) {
                workListAreabSel.selOneItemTpl.find('li').eq(index).addClass('on');
            }
        },
        selTwoEnter: function (index) {
            workListAreabSel.selOneItemTpl.find('li').removeClass('onbg');
            workListAreabSel.selOneItemTpl.find('li').eq(index).addClass('onbg');
        }
    };
    workListAreabSel.init();

    //课程页 banner 上传弹层
    var courseBanUpload = {
        init: function () {
            this.overlay = $('.upload-overlay,.upload-dialog');
            this.uploadbtn = $('.cl-ban-btn');
            this.uploadclosed = $('.upd-closed');
            this.uploadsetbtn = $('.upd-set-btn');
            //点击上传按钮
            this.uploadbtn.click(function () {
                courseBanUpload.overlay.show();
            });
            //点击关闭层
            this.uploadclosed.click(function () {
                courseBanUpload.overlay.hide();
            });
            //点击发送按钮
            this.uploadsetbtn.click(function () {
                //courseBanUpload.inputVerify();
                if (courseBanUpload.inputVerify()) {
                    //ajax();
                    alert('提交成功。');
                    courseBanUpload.overlay.hide();
                    courseBanUpload.clearInput();
                }
            });
        },
        inputVerify: function () {
            var isPassed = true;
            var updMain = $('.upd-main'),
                    inputName = $('.updm-inp', updMain),
                    textareaText = $('.updm-area', updMain);
            if (inputName.val().length < 1) {
                alert('请输入标题！');
                isPassed = false;
                return false;
            } else if (textareaText.val().length < 1) {
                alert('请输入正文！');
                isPassed = false;
                return false;
            }
            return isPassed;
        },
        clearInput: function () {
            var updMain = $('.upd-main'),
                    inputName = $('.updm-inp', updMain),
                    textareaText = $('.updm-area', updMain);
            inputName.val('');
            textareaText.val('');
        }
    }
    courseBanUpload.init();

    //活动页 banner 上传弹层
    var eventBanUpload = {
        init: function () {
            this.formEl = $('.et-form-tpl');
            this.overlay = $('.upload-overlay,.upload-dialog');
            this.uploadbtn = $('.el-ban-btn');
            this.uploadclosed = $('.et-upd-closed');
            this.uploadsetbtn = $('.et-set-btn');

            //点击上传按钮
            this.uploadbtn.click(function () {
                eventBanUpload.overlay.show();
            });
            //点击关闭层
            this.uploadclosed.click(function () {
                eventBanUpload.overlay.hide();
            });
            //点击发送按钮
            this.uploadsetbtn.click(function (evt) {
                if (eventBanUpload.isValid()) {
                    var title = $('#eventInputName').val();
                    var category_id = $("input[name='eventarea'][checked]").val();
                    var event_properties = $("input[name='evenpro'][checked]").val();
                    var organization = $("#eventInputHost").val();
                    var organizer = $("#person").val();
                    var start_time = $("#eventInputDate").val();
                    var location = $("#eventInputAddress").val();
                    var event_url = $("#eventUrl").val();
                    var participant_limit = $("#eventLimit").val();
                    var price = $("#price").val();
                    var reservation_url = $("#eventBook").val();
                    var sell_url = $("#eventTicket").val();
                    var reservation = $("#eventAppointment").val();
                    var content = $("#eventInputDetail").val();
                    $.ajax({
                        "type": "post",
                        "url": "/social/event/ajax",
                        "data": {'title': title, 'category_id': category_id,
                            'event_properties': event_properties, 'organization': organization,
                            'organizer': organizer, 'start_time': start_time, 'location': location, 'event_url': event_url,
                            'participant_limit': participant_limit, 'price': price, 'reservation_url': reservation_url,
                            'sell_url': sell_url, 'reservation': reservation, 'content': content},
                        "success": function (responseData) {

                            if (responseData === 'ok') {
                                //   location.href = '/';
                                alert('添加成功');
                                eventBanUpload.overlay.hide();
                            }
                        }
                    });
                    //alert('success.');
                }
                evt.preventDefault();
            });
            //input 失去焦点 验证
            this.formEl.on('blur', '#eventInputName', function () {
                var meEl = $(this),
                        meElVal = $.trim(meEl.val());
                eventBanUpload.isClear(meEl);
                if (meElVal.length < 2 || meElVal.length > 18) {
                    eventBanUpload.inputFail(meEl);
                }
            }).on('blur', '#eventInputHost', function () {
                var meEl = $(this),
                        meElVal = $.trim(meEl.val());
                eventBanUpload.isClear(meEl);
                if (meElVal.length < 1) {
                    eventBanUpload.inputFail(meEl);
                }
            }).on('blur', '#eventInputDate', function () {
                var meEl = $(this),
                        meElVal = $.trim(meEl.val());
                eventBanUpload.isClear(meEl);
                if (meElVal.length < 1) {
                    eventBanUpload.inputFail(meEl);
                }
            }).on('blur', '#eventInputAddress', function () {
                var meEl = $(this),
                        meElVal = $.trim(meEl.val());
                eventBanUpload.isClear(meEl);
                if (meElVal.length < 2 || meElVal.length > 18) {
                    eventBanUpload.inputFail(meEl);
                }
            }).on('blur', '#eventInputDetail', function () {
                var meEl = $(this),
                        meElVal = $.trim(meEl.val());
                eventBanUpload.isClear(meEl);
                if (meElVal.length < 1) {
                    eventBanUpload.inputFail(meEl);
                }
            });
        },
        isValid: function () {
            var isPassed = true;
            var eventInputName = $('#eventInputName'),
                    eventInputHost = $('#eventInputHost'),
                    eventInputDate = $('#eventInputDate'),
                    eventInputAddress = $('#eventInputAddress'),
                    eventInputDetail = $('#eventInputDetail'),
                    pifChkEl = $('.et-updm-chk');

            eventInputName.blur();//验证
            eventInputHost.blur();
            eventInputDate.blur();
            eventInputAddress.blur();
            eventInputDetail.blur();

            $('.etinp-el', eventBanUpload.formEl).each(function () {
                if ($(this).hasClass('on')) {
                    isPassed = false;
                    return false;
                }
            });
            //活动属性
            // if(!pifChkEl.is(':checked')){
            //   isPassed = false; 
            //    alert('请选择活动属性！');
            //   return false;
            // }
            return isPassed;
        },
        inputFail: function (el) {
            el.addClass('on');
            el.next('.inp-error').show();
        },
        inputSuccess: function (el) {
            //el.next('.inp-ok').show();
        },
        isClear: function (el) {
            el.removeClass('on');
            el.next().hide();
            //el.next('.inp-ok').hide();
        }
    };
    eventBanUpload.init();
    
    //团队关注
    var attenBtnEl = $('.atten-btn-ell');
    $(document).on('click', '.atten-btn-ell',function () {
        if(!$(this).hasClass('hd-btn-login')){
            var team_id = $(this).attr('id');
            var status = $(this).attr('status');
            var el = $(this);
            $.ajax({
                type: 'post',
                url: '/team/follow',
                data: {'teamId':team_id,'status':status,'act':'1'},
                dataType: 'json',
                success: function (result) {
                    var gz = $('.follow-wo');
                    if (result.success) {
                        if (el.hasClass('cannel')) {
                            el.removeClass('cannel');
                            el.html('关注').attr('status','0');
                            if(gz.length > 0){
                                var num = parseInt(gz.text())-1;
                                gz.text(num);
                            }

                        }else{
                            el.addClass('cannel');
                            el.html('取消关注').attr('status','1');
                            if(gz.length > 0){
                                var num = parseInt(gz.text())+1;
                                gz.text(num);
                            }
                        }
                    }else{
                        alert(result.message);
                    } 
                }
            });
        }else{
            return false;
        }
        
    })


    //关注
    var attenBtnEl = $('.atten-btn-el');
    $(document).on('click', '.atten-btn-el',function () {
        var id = $(this).attr('id');
        var el = $(this);
 
        if ($(this).hasClass('cannel')) {
            $.ajax({
                type: 'post',
                url: '/social/profile/following/cancel/' + id,
                data: {},
                dataType: 'json',
                success: function (result) {
                    if (result.code == '1') {
                        // $('#follow_' + id).hide();
                        el.removeClass('cannel');
                        el.html('关注');
                        addFollowCount('sub','follow-ta');
//                        alert('已经取消关注');
                    } else if (result.code == '4') {
//                        alert('已经取消关注');
                    } else if (result.code == '5') {
                        // hdLoginDialog.loginError.hide();
                        // hdLoginDialog.showApv();
                    }
                }
            });

        } else {
            $.ajax({
                type: 'post',
                url: '/social/profile/following/' + id,
                data: {},
                dataType: 'json',
                success: function (result) {console.info(result);
                    if (result.code == '1') {
                        // $('#follow_' + id).hide();
                        el.addClass('cannel');
                        el.html('取消关注');
                        addFollowCount('add','follow-ta');
                    } else if (result.code == '2') {
                        el.addClass('cannel').html('取消关注');
                        alert('已经关注');
                    }
                    else if (result.code == '3') {
                        alert('自己不能关注自己');
                    } else if (result.code == '5') {
                        // hdLoginDialog.loginError.hide();
                        // hdLoginDialog.showApv();
                    }
                }
            });

        }
    });

    //创意人
    var ideaHomeRight = $('.idea-home-right'),
        ihrnNavEl = $('.ihrn-nav-el', ideaHomeRight),
        ihrProjectListTpl = $('.project-list-tpl', ideaHomeRight),
        ihrCollectListTpl = $('.collect-list-tpl', ideaHomeRight)
        ,$leftBar = $('.idea-home-left');
    function _equalHeight($right){
        $leftBar.height('auto')
        var lh = $leftBar.height(),rh = $right.height()
        if(lh > rh){
            $right.height(lh)
        }else{
            $leftBar.height(rh)
        }
    }
    _equalHeight(ihrProjectListTpl)

    ihrnNavEl.click(function (evt) {
        var meEl = $(this),index = meEl.index();

        ihrnNavEl.removeClass('on');
        meEl.addClass('on');

        if (index == 0) {
            ihrProjectListTpl.show();
            ihrCollectListTpl.hide();
            _equalHeight(ihrProjectListTpl)
        } else {
            ihrProjectListTpl.hide();
            ihrCollectListTpl.show();
            _equalHeight(ihrCollectListTpl)
        }
        evt.preventDefault();

    });

    //关注列表 关注按钮
    var aipAttenBtn = $('.aip-atten-btn');
    aipAttenBtn.click(function () {
        var id = $(this).attr('id');
        var meEl = $(this);
        if (meEl.hasClass('cannel')) {
            // meEl.removeClass('cannel');
            // meEl.html('关注');
            $.ajax({
                type: 'post',
                url: '/social/profile/following/cancel/' + id,
                data: {},
                dataType: 'json',
                success: function (result) {
                    if (result.code == '1') {
                        $('#follow_' + id).hide();
                        addFollowCount('sub','follow-wo')
                    } else if (result.code == '4') {
                        alert('已经取消关注');
                    } else if (result.code == '5') {
                        //  hdLoginDialog.loginError.hide();
                        //  hdLoginDialog.showApv();
                    }
                }
            });

        } else {
            meEl.addClass('cannel');
            meEl.html('取消');
            //$.ajax();
        }
    });

    //图片预览弹层
    var picViewDialog = {
        init: function () {
            this.picScrollWrap = $('.edtp-pic-scroll');
            this.picScrollItem = $('.slides > li', this.picScrollWrap);
            this.overlay = $('.picview-overlay,.picview-dialog');
            this.picViewClosed = $('.pvd-closed');

            //点击上传按钮
            this.picScrollItem.click(function () {
                oldScrollTop = winEl.scrollTop();
                winEl.scrollTop(0);
                picViewDialog.overlay.show();
                var url = $(this).find('a img').attr('src');

                $('#event_big_img').attr('src', url);
                //$.ajax();
            });
            //点击关闭层
            this.picViewClosed.click(function () {
                $('#event_big_img').attr('src', '');
                picViewDialog.overlay.hide();
                winEl.scrollTop(oldScrollTop);
            });

        },
        clearPic: function () {
            var pvdMain = $('.pvd-main');
            pvdMain.empty();
        }
    }
    picViewDialog.init();




//专访图片预览弹层
    var interpicViewDialog = {
        init: function () {
            this.picScrollWrap = $('.interview-pic-scroll');
            this.picScrollItem = $('.slides > li', this.picScrollWrap);
            this.overlay = $('.picview-overlay,.picview-dialog');
            this.picViewClosed = $('.pvd-closed');

            //点击上传按钮
            this.picScrollItem.click(function () {

                oldScrollTop = winEl.scrollTop();
                winEl.scrollTop(0);
                interpicViewDialog.overlay.show();
                var url = $(this).find('a input').attr('value');

                $('#event_big_img').attr('src', url);
                //$.ajax();
            });
            //点击关闭层
            this.picViewClosed.click(function () {
                $('#event_big_img').attr('src', '');
                interpicViewDialog.overlay.hide();
                winEl.scrollTop(oldScrollTop);
            });

        },
        clearPic: function () {
            var pvdMain = $('.pvd-main');
            pvdMain.empty();
        }
    };
    interpicViewDialog.init();






    $("#checkbox_stu").click(function () {
        // if ($(this).is(":checked")) {
        getUrl();
        //  }else{

        // }


    });

    //投诉弹层
    var complaintDialog = {
        init: function () {
            this.overlay = $('.complaint-overlay,.complaint-dialog');
            this.plComplaintEl = $('.pl-complaint');
            this.cdClosed = $('.cd-closed');
            this.complaintSentBtn = $('.complaint-sent-btn');
            //点击上传按钮
            this.plComplaintEl.click(function () {
               
                complaintDialog.overlay.show();
            });
            //点击关闭层
            this.cdClosed.click(function () {
                complaintDialog.overlay.hide();
            });
            //点击发送按钮
            var _this = this;
            
            this.complaintSentBtn.click(function () {
               
                //complaintDialog.inputVerify();
                if (complaintDialog.inputVerify()) {
                	var complaintSentBtnTxt = _this.complaintSentBtn.text();
                	_this.complaintSentBtn.text("发送中...").prop("disabled",true);
                    $.post('/social/portfolio/complaint',{
                    	"address":$("#cdemail").val(),
                    	"content":$("#cdtextarea").val(),
                        "website":$("#cdwebsite").val()
                    },function(data){
                    	complaintDialog.overlay.hide();
                    	complaintDialog.clearInput();
                    	_this.complaintSentBtn.text(complaintSentBtnTxt).prop("disabled",false);
                    	alert("发送成功");
                    },'JSON');
                }
            });
        },
        inputVerify: function () {
            var isPassed = true;
            if ($('#cdtextarea').val().length < 1) {
                alert('请输入内容！');
                isPassed = false;
                return false;
            } else if ($('#cdemail').val().length < 1) {
                alert('请输入邮箱！');
                isPassed = false;
                return false;
            } else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test($('#cdemail').val())){
            	alert('请输入正确的邮箱!');
            	isPassed = false;
            	return false;
            }
            return isPassed;
        },
        clearInput: function () {
            $('#cdtextarea').val('');
            $('#cdemail').val('');
        }
    };
    complaintDialog.init();
    
    var moretext = "更多";
    var lesstext = "收起";
 
    $(document).on('click','.morelink',function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        zihuaZfdetail.getheight();
        return false;
    });




    /*
     * 分页 URL 创建 并 载入
     * preUrl : 前端获取的 url
     * time_type : 时间段类型
     */
    $('.youren_course_page_list a.btn-goto').click(function(event){
        
        event.preventDefault();
        
        var $this = $(this);
        var pageLastUrl = '';
        var page = $this.data('page');
        var time_type = $this.data('time');

        var searchCont = $('.search-form-wrap .hp-search-inp').val();

        if(page){
            pageLastUrl = '?page='+page;
        }
        if(time_type){
            pageLastUrl += '&t='+time_type;
        }
        
        if(searchCont){
            pageLastUrl += '&q='+searchCont;
        }

        location.href = pageLastUrl;
    });
});

function getUrl() {
    var search = '';
    var url = $(".sel-area-tpl, .sel-areab-tpl").find('span').attr('url');
    var id = $(".inter-category").children().attr('val');
    var q = $('.hp-search-inp').val();
    if ($.trim(q) != '') {
        search = '&q=' + q;
    }

    var t = $("#checkbox_stu");
    var c = '';
    if (t.length > 0 && t.is(":checked")) {
        c = '&c=0';
    }
    url = url + '?t=' + id + search + c;
    location.href = url;

}

//收藏
$(document).on('click','.favorite',function () {
    var that = $(this);
    var collect = $('.collect_star').hasClass('on') ? 0 : 1;
    var isSubmit = that.attr('submit');
    if (isSubmit == '0') {
        that.attr('submit', '1');
        $.ajax({
            type: 'post',
            url: '/social/user/collect/' + poloid,
            data: {act: '1', collect: collect},
            dataType: 'json',
            success: function (result) {
                that.attr('submit', '0');
                if (result.code == '1') {
                    if (collect) {
                        $('.collect_star').addClass('on');
                        $('.collect_star').attr('title','已收藏');
                    } else {
                        $('.collect_star').removeClass('on');
                        $('.collect_star').attr('title','收藏');
                    }
                } else {
//                    that.removeClass('favorite').addClass('hd-btn-login');
//                    hdLoginDialog.init();
                    location.reload();
                }
            }
        });
    }
    
    
    
    
});
$(document).on('click','.detail-dialog .dd-closed',function(){
    $(document.body).css("overflow","scroll");
    $('.detail-dialog,.detail-overlay').hide();
})

function addFollowCount(type,cla) {
    var num = $('.'+cla).text();
    num = parseInt(num);
    if (num >= 0) {
        if (type === 'add') {
            num += 1;
        } else {
            num -= 1;
        }
        $("."+cla).text(num);
    }

}
var zihuaZfdetail = {
	getheight:function(){
		var l = $('.pdm-right').height();
		var r = $('.pdm-right-it').height();
		if(l < r){
			$('.pdm-right').height(r + 20);
			}
    $('.pdm-left,.pdm-right').css('height','auto');
    var $projectLeftBar = $('.pdm-left');
    if($projectLeftBar.length !== 0){
        var $projectDetail = $('.pdm-right');
        var lh = $projectLeftBar.height();
        var rh = $projectDetail.height();
        setTimeout(function(){
            if(lh > rh){
                $projectDetail.height(lh+40);
            }else{
                $projectLeftBar.height(rh-40);
            }
        },100);
    }
		}
	}
zihuaZfdetail.getheight();

var media_down = {
    close:function(){
        $('.media_down input,.media_down span').click(function(){
            $('.media_down,.bind-overlay').hide();
            })
    }
}
media_down.close();
