var qqLogin = {
    init: function() {
        $('.udm-qq').click(function(event) {
            event.preventDefault();
            
            QC.Login.signOut(); 
            QC.Login({}, qqLogin.loginSuccess);
            if(!(QC.Login.check())){
                qqLogin.showPopup();
            }
        });

        $('#logout').click(function() {
            QC.Login.signOut(); 
        });
    },
    showPopup: function() {
        qqLogin.closePopup();
        
        var $qqScript = $('#qq_script');
        var appId = $qqScript.data('appid');
        var redirectURI = $qqScript.data('redirecturi');
        var url = 'https://graph.qq.com/oauth2.0/authorize?client_id=' + appId + '&response_type=token&scope=all&redirect_uri=' + encodeURI(redirectURI);
        
        this.oauthWindow = window.open(url, 'oauth_dialog' ,'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes');
    },
    closePopup: function() {
        if (this.oauthWindow) {
            this.oauthWindow.close();
        }
    },
    loginSuccess: function(reqData, opts) {
        var avatarUrl = reqData.figureurl_qq_2;
        var nickname = QC.String.escHTML(reqData.nickname);
        
        var paras = {};
        QC.api("get_user_info", paras)
            .success(function(s){
                qqLogin.apiSuccess(s,avatarUrl, nickname);
            });
    },
    apiSuccess:function (s,avatarUrl, nickname){
        QC.Login.getMe(function(openId, accessToken){
            var params = {
                avatarUrl: avatarUrl,
                nickname: nickname,
                openId: openId,
                accessToken: accessToken,
                gender: qqLogin.getGender(s.data.gender)
            };

            $.post('/oauth/login', params, function(data) {
                if (data.success) {
                    //loginDialog.closeDialog();//不清楚为什么微博那里没问题，考虑以后换成php的SDK
                    qqLogin.closePopup();
                    if(data.first_login){
                        window.location.href = '/member/student/profile/registerInfo';
                    }else{
                        var login_to = $('input[name=login_to]').val();
                        if(login_to)
                        {
                            window.location.href = login_to;
                        }
                        else
                        {
                            window.location.reload(true);
                        }
                    }
                } else {
                    alert('Login Failed!');
                }
            });
        });
    },
    getGender: function(gender) {
        return (gender === '女') ? 1 : 0;
    }
};

var weiboLogin = {
    init: function() {
        $('.udm-sina').click(function(event) {
            event.preventDefault();
            WB2.logout();
            WB2.login(function() {
                weiboLogin.getUserId();
            });
        });
        
        $('#logout').click(function() {
            WB2.logout();
        });
    },
    getUserId: function() {
        WB2.anyWhere(function(W){
            W.parseCMD('/account/get_uid.json', function(oResult, bStatus) {
                weiboLogin.getUserInfo(oResult.uid);
            }, {}, { method: 'get' });
        });
    },
    getUserInfo: function(uid) {
        WB2.anyWhere(function(W){
            W.parseCMD('/users/show.json', function(oResult, bStatus) {
                var params = {
                    avatarUrl: oResult.profile_image_url,
                    nickname: oResult.name,
                    openId: uid,
                    accessToken: ''
                };
                
                $.post('/oauth/login', params, function(data) {
                    if (data.success) {
                        if(data.first_login){
                            window.location.href = '/member/student/profile/registerInfo';
                        } else {
//                            loginDialog.closeDialog();
                            var login_to = $('input[name=login_to]').val();
                            if (login_to)
                            {
                                window.location.href = login_to;
                            }
                            else
                            {
                                window.location.reload(true);
                            }
                        }
                    } else {
                        alert('Login Failed!');
                    }
                });
            }, {
                uid: uid
            }, { 
                method: 'get' 
            });
        });
    }
};

$(function() {
    qqLogin.init();
    weiboLogin.init();
});