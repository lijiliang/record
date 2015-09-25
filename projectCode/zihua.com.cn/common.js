if (window.top !== window.self) window.top.location.replace(window.self.location.href);

var inputPlaceHolder = {
    init: function() {
        inputPlaceHolder.inputTextArea();
        inputPlaceHolder.passwordInput();
    },
    inputTextArea: function() {
        if (!('placeholder' in document.createElement('input'))) {

            $('input[placeholder][type != "password"],textarea[placeholder]').each(function() {
                var that = $(this),
                        text = that.attr('placeholder');
                if (that.val() === "") {
                    that.val(text).addClass('placeholder');
                }
                that.focus(function() {
                    if (that.val() === text) {
                        that.val("").removeClass('placeholder');
                    }
                })
                        .blur(function() {
                            if (that.val() === "") {
                                that.val(text).addClass('placeholder');
                            }
                        })
                        .closest('form').submit(function() {
                    if (that.val() === text) {
                        that.val('');
                    }
                });
            });
        }

    },
    passwordInput: function() {
        $("input[type='password']").focus(function() {
            if ($(this).val() == "") {
                $(this).siblings("label").css("visibility", "hidden");
            }
        }).blur(function() {
            if ($(this).val() == "") {
                $(this).siblings("label").css("visibility", "visible");
            }
        }).change(function() {
            if ($(this).val() == "") {
                $(this).siblings("label").css("visibility", "visible");
            } else {
                $(this).siblings("label").css("visibility", "hidden");
            }
        });

    }

};

$(function() {
    inputPlaceHolder.init();

});

var formValidate = {
    init: function() {
        this.form = $('.js-check');
        
        this.form.find('.input-required').blur(function() {
            formValidate.checkRequired($(this));
        });

        this.form.find('input').focus(function() {
            formValidate.resetStatus($(this));
        });
    },
    checkRequired: function($el) {
        if (!$el.val()) {
            formValidate.showError($el, '.required');
        } else {
            formValidate.hideError($el, '.required');
        }
    },
    checkFormValid: function($submitBtn) {
        $submitBtn.prop('disabled', formValidate.hasError());
    },
    hasError: function() {
        return this.form.find('.has-error').length > 0;
    },
    disableSubmitBtn: function() {
        this.form.find('.btn-submit').prop('disabled', true);
    },
    enableSubmitBtn: function() {
        this.form.find('.btn-submit').prop('disabled', false);
    },
    showError: function($el, messageClass) {
        formValidate.toggleError($el, true, messageClass);
    },
    hideError: function($el, messageClass) {
        formValidate.toggleError($el, false, messageClass);
    },
    toggleError: function($el, isVisible, messageClass) {
        var $wrap = $el.closest('.form-list');
        var $tip = $wrap.find('.tip');
        var $message = $tip.find(messageClass);

        if (isVisible) {
            $el.addClass('has-error');
            $tip.removeClass('hidden');
            $message.removeClass('hidden');
        } else {
            $el.removeClass('has-error');
            $tip.addClass('hidden');
            $message.addClass('hidden');
        }
    },
    resetStatus: function($el) {
        var $wrap = $el.closest('.form-list');
        $el.removeClass('has-error');
        $wrap.find('.tip span').addClass('hidden');
    }
};

var form = {
    init: function() {
        var $form = $('form');
        if ($form.length) {
            $('form').submit(function() {
                form.disableSubmit($(this));
            });
        }
    },
    disableSubmit: function($el) {
        form._toggleSubmit($el, false);
    },
    enableSubmit: function($el) {
        form._toggleSubmit($el, true);
    },
    _toggleSubmit: function($el, enabled) {
        var $submitBtn = $el.find('.btn-submit');

        if ($submitBtn.length) {
            $submitBtn.prop('disabled', !enabled);
        }
    }
};
form.init();

var nav = {
    init: function() {
        $('a[target="new"]').click(function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            nav.openNamedWindow($(this));
        });
    },
    openNamedWindow: function(el) {
        window.open($(el).attr('href'), "_blank");
    }
};
nav.init();

var popup = {
    init: function() {
        $('.zihua-popup').click(function(e) {
            e.preventDefault();
            var action = $(this).data('action');
            popup.openWindow(action);
        });

//        window.onunload = function (event) {
//            var action = $('body').data('action');
//            
//            if (popup.randomInt(1, 10) == 1) {
//                popup.openWindow(action);
//            }
//        };
    },
    openWindow: function(action) {
        window.open(action, 'zihua', 'width=905,menubar=0,status=0,titlebar=no,location=no,toolbar=no,menubar=no,scrollbars=yes,alwaysRaised=yes');
    },
    randomInt: function(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};
popup.init();

var pager = {
    init: function() {
        this.$pageList = $('.page-list');

        this.$pageList.on('click', '.btn-goto', function(e) {
            e.preventDefault();
            var action = pager.$pageList.data('action');
            var page = $(this).data('page');
            pager.goto(action, page);
        });

        this.$pageList.on('click', '.btn-jumpto', function(e) {
            e.preventDefault();
            var page = pager._getPage($(this));
            pager.goto(page);
        });
    },
    goto: function(action, page) {
        var $pageList = this.$pageList;

        $.get(action, {is_ajax: true, page: page}, function(data) {
            $pageList.html(data.list);
        });
    },
    _getPage: function($el) {
        return $el.prev().val();
    }
};
pager.init();

/* ==============================================
 NAVIGATION DROP DOWN MENU
 =============================================== */

$('.nav-toggle').hover(function() {
    $(this).find('.dropdown-menu').first().stop(true, true).fadeIn(250);
	
}, function() {
   $(this).find('.dropdown-menu').first().stop(true, true).fadeOut(250);
});

/* ==============================================
 MOBILE NAV BUTTON
 =============================================== */

$(".mobile-nav-button").click(function() {
    $(".nav-inner div.nav-menu").slideToggle("medium", function() {
        // Animation complete.
    });
});

$('.nav-inner div.nav-menu ul.nav li a').click(function() {
    if ($(window).width() < 1000) {
        $(".nav-menu").slideToggle("2000");
    }
});

/* 
 * Custom Select
 */
var customSelect = {
    init: function() {
        $('.btn-select').on('click', '.dropdown-menu li', function() {
            var $this = $(this);
            var $wrap = $this.parents(".btn-select");

            customSelect.setSelectedOption($wrap, $this);
        });
    },
    setSelectedOption: function($wrap, $option) {
        $wrap.find('.dropdown-menu li').removeClass('selected');
        $option.addClass('selected');

        $wrap.find(".selected-label").html($option.text());
        $wrap.find("input.select-value").val($option.data('value'));
    },
    getSelectedVal: function($wrap) {
        return $wrap.find("input.select-value").val();
    }
};
customSelect.init();

/* 
 * Global Ajax Loader
 */
var $loader = $('#ajax-loader');
$(document).on({
    ajaxStart: function() {
        $loader.show();
    },
    ajaxStop: function() {
        $loader.hide();
    }
});

var session = {
    init: function() {
        var $user = $('#user');
        if ($user.length) {
            session.setCookie('myname', $user.data('username'));
        } else {
            session.deleteCookie('myname');
        }
    },
    setCookie: function(name, value) {
        document.cookie = name + "=" + escape(value) + ";path=/;domain=.zihua.com.cn";
    },
    deleteCookie: function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=.zihua.com.cn';
    }
};

    //获取市
var locations = {
    init: function() {
        var cityObj = $('#social_profile_city');
        var provinceObj = $('#social_profile_province');
        var arr = ['1','2','3','4','32','33'];
        var input_province = $("#social_profile_province_hide");
        var input_city = $("#social_profile_city_hide");
        if(!($.inArray(provinceObj.val(), arr) < 0)){
            cityObj.css('display','none');
        }else{
            cityObj.css('display','');
        }
        
        var socialProfileCountryEl = $('#social_profile_country'),
        countryVal = $('#social_profile_country').val(),
        location = $('.location'),
        othercityEl = $('#othercity');

        if(countryVal !=='1'){
            location.hide();
            othercityEl.show();
        }
        socialProfileCountryEl.change(function(){
            var thisVal = $(this).val();
            if(thisVal !== '1'){
                location.hide();
                othercityEl.val('').show();
                input_province.val(0);
                input_city.val(0);
            }else{
                if(!($.inArray(provinceObj.val(), arr) < 0)){
                    cityObj.hide();
                }else{
                    cityObj.show();
                }
                provinceObj.show();
                othercityEl.val('').hide();
                input_province.val(provinceObj.val());
                input_city.val(cityObj.val());
            }
        });
    
        provinceObj.change(function(){
            var that = $(this);
            var province_id = that.val();
            input_province.val(provinceObj.val());
            if(!($.inArray(province_id, arr) < 0)){
                cityObj.css('display','none');
                input_city.val(0);
            }else{
                cityObj.css('display','');
                input_city.val(cityObj.val())
            }
            cityObj.html('<option value="0">加载中。。。</option>');
            $.ajax({
                type:'get',
                url:'/city/get/'+province_id,
                dataType: 'json',
                success: function (result) {
                    var options = '';
                    $.each(result,function(key,val){
                        options += '<option value="'+key+'">'+val+'</option>'
                    });
                    cityObj.html(options);
                    input_city.val(cityObj.val());
                }
            });
        });
        cityObj.change(function(){
        	input_city.val(cityObj.val());
        });
    }
};    
//session.init();

var jiathis_config = {
    sm: "weixin,tsina,qzone",
    title: "",
    summary: "",
    pic: "",
    shortUrl: false,
    hideMore: true
};
        
var zihuaShare = {
    init: function() {
        $('.jiaqthis_style').hover(function() {
            zihuaShare.updateConfig($(this));
            console.log('social');
            console.log(jiathis_config.title);
            console.log(jiathis_config.summary);
            console.log(jiathis_config.pic);
        });
    },
    updateConfig: function($el) {
        var title = $el.data('title') ? $el.data('title') : '自化创意 - 首家专注创意产业的在线学习和资讯平台';
        var summary = $el.data('summary') ? $el.data('summary') : title;
        var pic = $el.data('pic') ? $el.data('pic') : 'http://zihua.com.cn/images/zihua-logo-400.jpg';
        
        jiathis_config.title = title;
        jiathis_config.summary = summary;
        jiathis_config.pic = pic;
    }
};
zihuaShare.init();
