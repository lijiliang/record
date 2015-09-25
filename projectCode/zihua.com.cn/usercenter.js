/**
 * Name:usercenter.js
 * Date:2014-12-25
 */
$(function () {
    var nickname = '';
    $('.nickname').focus(function(){
        nickname = $(this).val();
    });
    
    //登录弹层
    var hdLoginDialog = {
        init:function(){
            this.loginBtn = $('.hd-btn-login,.btn-login-dialog');
            this.loginDia = $('.user-overlay,.user-dialog');
            this.loginClosed = $('.ud-closed');
            this.loginError = $('.udm-error > span');
            this.loginSubmit = $('.dia-login-btn');
            this.form = $('.user-dialog').find('form');
            
            $(document).on('click','.hd-btn-login,.btn-login-dialog',function(event){
                event.preventDefault();
                $('.detail-overlay,.detail-dialog').hide();
                hdLoginDialog.loginError.hide();
                hdLoginDialog.showApv();
            });
            this.loginClosed.click(function(){
                hdLoginDialog.closedApv();
            });
//            this.loginSubmit.click(function(){
//                //hdLoginDialog.verifyInput();
//                event.preventDefault();
//                hdLoginDialog.verifyInput();
//            });
            this.form.on("submit", function(event) {
                event.preventDefault();
                hdLoginDialog.verifyInput();
            });
        },
        showApv:function(){
            hdLoginDialog.loginDia.show();
        },
        closedApv:function(){
            hdLoginDialog.loginDia.hide();
            hdLoginDialog.clearInput();
        },
        verifyInput:function(){
//            var loginEmail = $('#login-email'),
//                loginPwd = $('#login-pwd');
            var action = this.form.attr('action');
            var params = this.form.serialize(); 
//            if(loginEmail.val() == "" || loginPwd.val() == ""){
//                
//                return false;
//            }else{
//                alert('success.');
//                hdLoginDialog.closedApv();
//            }
            $.post(action, params, function(data) {
                if (data.success) {
                    $('#login-email,#login-pwd').removeClass('input_warning');
                    if (data.target_url && data.target_url !== '/') {
                        window.location = data.target_url;
                    } else {
                        window.location.reload(true);
                    }
                } else {
                    $('#login-email,#login-pwd').addClass('input_warning');
                    hdLoginDialog.loginError.show();
                }
            });
        },
        clearInput:function(){
            $('#login-email').val('');
            $('#login-pwd').val('');
        }

    }
    hdLoginDialog.init();
    
    //注册弹层
    
    var hdRegDialog = {
        init:function(){
            this.formEmailWrap = $('.rd-email-tpl');
            this.formPhoneWrap = $('.rd-phone-tpl');
            this.regBtn = $('.hd-btn-reg');
            this.regBtnBak = $('.hd-btn-reg-bak');
            this.regDia = $('.reg-overlay,.reg-dialog');
            this.regClosed = $('.rd-closed');
            this.regError = $('.rdm-error > span');
            this.regSubmit = $('.dia-reg-btn',this.formEmailWrap);
            this.regPhoneSubmit = $('.dia-reg-btn',this.formPhoneWrap);
            this.regCodeSubmit = $('.rd-set-code',this.formPhoneWrap);
            this.rtEpTabEl = $('.rt-ep-tab');
            
            $('.reg-dialog .hd-btn-login').click(function(){
                hdRegDialog.closedApv();
            });
            $('.udm-reg .hd-btn-reg-bak').click(function(){
                hdLoginDialog.closedApv();
            });
            //tab
            this.rtEpTabEl.click(function(){
                hdRegDialog.clearInput();
                var index = $(this).index();
                hdRegDialog.rtEpTabEl.removeClass('on');
                $(this).addClass('on');
                if(index == 0){
                    $('.rd-phone-tpl').hide();
                    $('.rd-email-tpl').show();
                }else{
                    $('.rd-phone-tpl').show();
                    $('.rd-email-tpl').hide();
                }
            });

            this.regBtn.click(function(){
                hdRegDialog.showApv();
            });
            this.regBtnBak.click(function(){
                hdRegDialog.showApv();
                
            });
            this.regClosed.click(function(){
                hdRegDialog.closedApv();
                hdRegDialog.clearInput();
            });
            //邮箱 button click
            this.regSubmit.click(function(){
                var form = $(this).parent().parent();
                if(hdRegDialog.isEmailValid()){
                    form.submit();
                    hdRegDialog.isSuccess();
                }
            });
            hdRegDialog.verifyEmailInput();
            //手机 button click
            this.regPhoneSubmit.click(function(){
                var that = $(this);
                var now_form = that.parent().parent();
                if(hdRegDialog.isPhoneValid()){
                    now_form.submit();
                    hdRegDialog.isSuccess();
                }
            });
            hdRegDialog.verifyPhoneInput();
            //点击验证码
            this.regCodeSubmit.click(function(){
                
                var meEl = $('#reg-phone');
                if(!meEl.next().find('.rdm-error').is(":hidden")){
                    return false;
                }
                var meElVal = $.trim(meEl.val());
                var phoneNum=/^1\d{10}$/;
                hdRegDialog.isClear(meEl);
                if(phoneNum.test(meElVal) == false || meElVal == ''){
                    hdRegDialog.inputFail(meEl);
                }else{
                    var that = $(this);
                    var is_send = that.attr('is_send');
                    //获取验证码
                    if(is_send == '0'){
                        //验证邮箱是否已经注册
                        $.ajax({
                            type:'post',
                            url:'/register/',
                            data:{act:'phone',phone:meElVal},
                            success:function(result){
                                var result= eval('('+result+')');
                                if(result.status=='1'){  //已经注册
                                    meEl.addClass('input_warning');
                                    meEl.next().find('.rdm-error').text('*该手机号已经注册');
                                    hdRegDialog.inputFail(meEl);
                                }else{
                                    meEl.removeClass('input_warning');
                                    var codeBtnHtml="<time id='bebtn-time'>60</time>秒后重新获取";
                                    hdRegDialog.regCodeSubmit.attr("disabled","disabled");
                                    hdRegDialog.regCodeSubmit.css('cursor','default');
                                    hdRegDialog.regCodeSubmit.html(codeBtnHtml);
                                    var bebtnTime=$('#bebtn-time');

                                    that.attr('is_send','1');
                                    $.ajax({
                                        type:'post',
                                        url:'/get/phone/code',
                                        data:{act:'1',phone:meElVal},
                                        success:function(result){
                                            var result = eval('('+result+')');
                                            if(result.status= 'ok'){
                                                var codeObj = $('#reg-phone-code');
                                                codeObj.attr('code',result.code).attr('exipire',result.exipire).attr('real_phone',result.token);
                                            }
                                        }
                                    });

                                    //倒计时
                                    var i=59;
                                    var tid=setInterval(function(){
                                        if(i<1){
                                            that.attr('is_send','0');
                                            clearInterval(tid); 
                                            hdRegDialog.regCodeSubmit.removeAttr("disabled").css('cursor','pointer').html('发送验证码');
                                        }else{
                                            bebtnTime.text(i);
                                            i--;        
                                        }       
                                    },1000);
                                }
                            }
                        });
                    } 
                }
            });
        },
        showApv:function(){
            hdRegDialog.regDia.show();
        },
        closedApv:function(){
            hdRegDialog.regDia.hide();
            hdRegDialog.clearInput();
        },
        verifyEmailInput:function(){
            hdRegDialog.formEmailWrap.on('blur','#reg-email',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val());
                var emailNum = /^([a-zA-Z0-9]+[-|\-|_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\-|_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                hdRegDialog.isClear(meEl);
                if(emailNum.test(meElVal) == false || meElVal == ''){
                    meEl.addClass('input_warning');
                    meEl.next().find('.rdm-error').text('*邮箱格式不正确');
                    hdRegDialog.inputFail(meEl);
                }else{
                    //验证邮箱是否已经注册
                    $.ajax({
                        type:'post',
                        url:'/register/',
                        data:{act:'email',email:meElVal},
                        success:function(result){
                            var result= eval('('+result+')');
                            if(result.status=='1'){  //已经注册
                                meEl.addClass('input_warning');
                                meEl.next().find('.rdm-error').text('*该邮箱已经注册');
                                hdRegDialog.inputFail(meEl);
                            }else{
                                meEl.removeClass('input_warning');
                                hdRegDialog.inputSuccess(meEl);
                            }
                        }
                    });
                }
            }).on('blur','#reg-pwd',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val());
                hdRegDialog.isClear(meEl);
                if(meElVal.length < 6){
                    meEl.addClass('input_warning');
                    hdRegDialog.inputFail(meEl);
                }else{
                    meEl.removeClass('input_warning');
                    hdRegDialog.inputSuccess(meEl);
                }
            }).on('blur','#reg-pwda',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val()),
                    upPwdVal = $.trim($('#reg-pwd').val());
                hdRegDialog.isClear(meEl);
                if(meElVal == '' || meElVal !== upPwdVal){
                    meEl.addClass('input_warning');
                    hdRegDialog.inputFail(meEl);
                }else{
                    meEl.removeClass('input_warning');
                    hdRegDialog.inputSuccess(meEl);
                }
            }).on('blur','#reg-nickname',function(){
                var that = $(this);
                var errorObj = that.siblings('.rdm-error-warp').find('.rdm-error');
                var val = that.val();
                if(val.length == '0'){
                    errorObj.text('用户昵称不能为空');
                    errorObj.show();
                    if(!that.hasClass('input_warning')){
                        that.addClass('input_warning');
                    }
                    if(!that.hasClass('inpon')){
                        that.addClass('inpon');
                    }
                    return false;
                }else{
                    if(val != nickname){
                        $.ajax({
                            type:'post',
                            url:'/register/',
                            data:{'act':'nickname','val':val},
                            dataType:'json',
                            success:function(result){
                                if(result.status == '1'){
                                    errorObj.text(result.message);
                                    errorObj.show();
                                    if(!that.hasClass('inpon')){
                                        that.addClass('inpon');
                                    }
                                    if(!that.hasClass('input_warning')){
                                        that.addClass('input_warning');
                                    }
                                }else{
                                    errorObj.hide();
                                    if(that.hasClass('inpon')){
                                        that.removeClass('inpon');
                                    }
                                    if(that.hasClass('input_warning')){
                                        that.removeClass('input_warning');
                                    }
                                }
                                return false;
                            }
                        });
                    }else{
                        return false;
                    }
                }
            })
        },
        isEmailValid:function(){
            var isPassed = true;
            var regPhone = $('#reg-email',hdRegDialog.formEmailWrap),
                regNickname = $('#reg-nickname',hdRegDialog.formEmailWrap),
                regPwd = $('#reg-pwd',hdRegDialog.formEmailWrap),
                regPwda = $('#reg-pwda',hdRegDialog.formEmailWrap),
                rdmCountryT = $('#rdm-country',hdRegDialog.formEmailWrap),
                rdmProvinceT = $('#rdm-province',hdRegDialog.formEmailWrap),
                rdmCityT = $('#rdm-city',hdRegDialog.formEmailWrap),
                rdmCityTextT = $('#reg-city-inp',hdRegDialog.formEmailWrap),
                rdmChkEl = $('.rdm-chk',hdRegDialog.formEmailWrap);
            
            regPhone.blur();
            regPwd.blur();
            regPwda.blur();
            regNickname.blur();

            $('.email-inp-el',hdRegDialog.formEmailWrap).each(function(){
                if($(this).hasClass('inpon')){
                    isPassed = false; 
                    return false;
                }
            });
            //服务条款验证
            if(!rdmChkEl.is(':checked')){
                isPassed = false; 
                alert('请同意用户协议！');
                return false;
            }
            return isPassed;
        },
        verifyPhoneInput:function(){

            hdRegDialog.formPhoneWrap.on('blur','#reg-phone',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val());
                var phoneNum=/^1\d{10}$/;
                hdRegDialog.isClear(meEl);
                if(phoneNum.test(meElVal) == false || meElVal == ''){
                    meEl.addClass('input_warning');
                    meEl.next().find('.rdm-error').text('*手机格式不正确');
                    hdRegDialog.inputFail(meEl);
                }else{
                    //验证邮箱是否已经注册
                    $.ajax({
                        type:'post',
                        url:'/register/',
                        data:{act:'phone',phone:meElVal},
                        success:function(result){
                            var result= eval('('+result+')');
                            if(result.status=='1'){  //已经注册
                                meEl.addClass('input_warning');
                                meEl.next().find('.rdm-error').text('*该手机号已经注册');
                                hdRegDialog.inputFail(meEl);
                            }else{
                                meEl.removeClass('input_warning');
                                hdRegDialog.inputSuccess(meEl);
                            }
                        }
                    });
                }
            }).on('blur','#reg-pwd-t',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val());
                hdRegDialog.isClear(meEl);
                if(meElVal.length < 6){
                    meEl.addClass('input_warning');
                    hdRegDialog.inputFail(meEl);
                }else{
                    meEl.removeClass('input_warning');
                    hdRegDialog.inputSuccess(meEl);
                }
            }).on('blur','#reg-pwda-t',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val()),
                    upPwdVal = $.trim($('#reg-pwd-t').val());
                hdRegDialog.isClear(meEl);
                if(meElVal == '' || meElVal !== upPwdVal){
                    meEl.addClass('input_warning');
                    hdRegDialog.inputFail(meEl);
                }else{
                    meEl.removeClass('input_warning');
                    hdRegDialog.inputSuccess(meEl);
                }
            }).on('blur','#reg-phone-code',function(){
                var meEl = $(this),
                    meElVal = $.trim(meEl.val());
                var code = $('#reg-phone-code').attr('code');
                var exipire = parseInt($('#reg-phone-code').attr('exipire'));
                var now_date = parseInt((new Date()).valueOf());
                hdRegDialog.isClear(meEl);
                if(meEl.val() == ''){
                    return false;
                }
                if(typeof(code) == 'undefined'){
                    meEl.addClass('inpon');
                    meEl.addClass('input_warning');
                    meEl.next().find('.rdm-error').text('*验证码不正确').show();
                }else{
//                    if(now_date < exipire){
                        var encyCode = md5(md5(meElVal)+'zihua.com.cn');
                        if(encyCode == code){
                            meEl.removeClass('input_warning');
                            var real_phone = meEl.attr('real_phone');
                            $('#real_phone').val(real_phone);
                            hdRegDialog.inputSuccess(meEl);
                        }else{
                            meEl.addClass('inpon');
                            meEl.addClass('input_warning');
                            meEl.next().find('.rdm-error').text('*验证码不正确').show();
                        }
//                    }else{
//                        meEl.addClass('inpon');
//                        meEl.next().find('.rdm-error').text('*验证码已过期，请点击发送重新获取！').show();
//                    }
                }
            }).on('blur','#reg-nickname-t',function(){
                var that = $(this);
                var errorObj = that.siblings('.rdm-error-warp').find('.rdm-error');
                var val = that.val();
                if(val.length == '0'){
                    errorObj.text('用户昵称不能为空');
                    errorObj.show();
                    if(!that.hasClass('input_warning')){
                        that.addClass('input_warning');
                    }
                    if(!that.hasClass('inpon')){
                        that.addClass('inpon');
                    }
                    return false;
                }else{
                    if(val != nickname){
                        $.ajax({
                            type:'post',
                            url:'/register/',
                            data:{'act':'nickname','val':val},
                            dataType:'json',
                            success:function(result){
                                if(result.status == '1'){
                                    errorObj.text(result.message);
                                    errorObj.show();
                                    if(!that.hasClass('inpon')){
                                        that.addClass('inpon');
                                    }
                                    if(!that.hasClass('input_warning')){
                                        that.addClass('input_warning');
                                    }
                                }else{
                                    errorObj.hide();
                                    if(that.hasClass('inpon')){
                                        that.removeClass('inpon');
                                    }
                                    if(that.hasClass('input_warning')){
                                        that.removeClass('input_warning');
                                    }
                                }
                                return false;
                            }
                        });
                    }else{
                        return false;
                    }
                }
            })
        },
        isPhoneCodeValid:function(){
            //$.ajax();
        },
        isPhoneValid:function(){
            var isPassed = true;
            var regPhone = $('#reg-phone',hdRegDialog.formPhoneWrap),
                regNickname = $('#reg-nickname-t',hdRegDialog.formPhoneWrap),
                regPwd = $('#reg-pwd-t',hdRegDialog.formPhoneWrap),
                regPwda = $('#reg-pwda-t',hdRegDialog.formPhoneWrap),
                regPhoneCode = $('#reg-phone-code',hdRegDialog.formPhoneWrap),
                rdmCountryT = $('#rdm-country-t',hdRegDialog.formPhoneWrap),
                rdmProvinceT = $('#rdm-province-t',hdRegDialog.formPhoneWrap),
                rdmCityT = $('#rdm-city-t',hdRegDialog.formPhoneWrap),
                rdmCityTextT = $('#reg-city-inp-t',hdRegDialog.formPhoneWrap),
                rdmChkEl = $('.rdm-chk',hdRegDialog.formPhoneWrap);
            
            regNickname.blur();
            regPhone.blur();
            regPwd.blur();
            regPwda.blur();
            regPhoneCode.blur();

            $('.phone-inp-el',hdRegDialog.formPhoneWrap).each(function(){
                if($(this).hasClass('inpon')){
                    isPassed = false; 
                    return false;
                }
            });
            //服务条款验证
            if(!rdmChkEl.is(':checked')){
                isPassed = false; 
                alert('请同意用户协议！');
                return false;
            }
            return isPassed;
        },
        inputFail:function(el){
            el.addClass('inpon');
            el.next().find('.rdm-error').show();
        },
        inputSuccess:function(el){
            el.next().find('.rdm-error').hide();
        },
        clearInput:function(){
            $('.phone-inp-el').val('');
            $('.email-inp-el').val('');
            $('.rdm-error').hide();
            $('input').removeClass('input_warning');
        },
        isClear:function(el){
            el.removeClass('inpon');
            el.next().find('.rdm-error').hide();
        },
        isSuccess:function(){
            $('.reg-dialog').hide();
            $('.reg-dialog-success').show();
            setTimeout(function(){
                $('.reg-dialog-success').hide();
                hdRegDialog.closedApv();
            },2000);
        }
    }
    hdRegDialog.init();




})
    
    
