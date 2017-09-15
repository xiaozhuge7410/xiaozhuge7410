import './components/httpRequest';
import './components/httpRequest';
import './components/dataFormat';

function Login(){
    this.ajaxLoading = false;
    this.accountOk = false;
    this.passwordOk =false;
    this.init();
}

Login.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')!=null&&window.localStorage.getItem('uidClinic')!=null){
        window.location.href="report/4min_walk.html";
    }else{
        this.bind();
    }
};

Login.prototype.bind = function(){
    var _this = this;
    $('.account-input').on('keyup',function(){
        _this.user= $('.account-input').val();
        _this.testAccount();
    });
    $('.password-input').on('keyup',function(){
        _this.pwd = $('.password-input').val();
        _this.testPassword();
    });
    $('.login-form').on('keyup',function(e){
        if(e.keyCode == 13){
            _this.postLogin();
        }
    });
    $('.login-button').on('click',function(){
        _this.postLogin();
    });
};
Login.prototype.testAccount = function(){
    var _this = this;
    var mailReg = /^[A-z0-9][A-z0-9_]+@[A-z0-9_-]+\.[A-z]+$/i;
    var phoneReg = /^1[34578]\d{9}$/g;
    var testAccountReg = /^[A-z0-9_]{3,15}$/g;

    if(mailReg.test(_this.user)||phoneReg.test(_this.user)||testAccountReg.test(_this.user)){
        if(!_this.accountOk){
            $('.account-check-ok').show();
            _this.accountOk = true;
        }
    }else{
        $('.account-check-ok').hide();
        _this.accountOk = false;
    }
};
Login.prototype.testPassword = function(){
    var _this = this;
    var pwdReg = /^[A-z0-9_]{6,15}$/g;
    if(pwdReg.test(_this.pwd)){
        if(!_this.passwordOk){
            $('.password-check-ok').show();
            _this.passwordOk = true;
        }
    }else{
        $('.password-check-ok').hide();
        _this.passwordOk = false;
    }
};
Login.prototype.postLogin = function(){
    var _this = this;
    _this.user = $('.account-input').val();
    _this.pwd = $('.password-input').val();
    $('.login-button').addClass('loading');
    if(_this.user != '' && _this.pwd != ''){
        if(!_this.ajaxLoading){
            _this.ajaxLoading = true;
            var reqUrl = 'login';
            var url = window.simUrlHandler(reqUrl);
            $.ajax({
                url:url,
                method : 'POST',
                data:{
                    'userName':_this.user,
                    'password':window.encryptByDES(_this.pwd)
                }
            }).done(function(res){
                _this.ajaxLoading = false;
                if(res.status==200){
                    window.localStorage.setItem('auClinic',res.datas.author);
                    window.localStorage.setItem('uidClinic',res.datas.uid);
                    window.localStorage.setItem('utClinic',res.datas.ut);
                    window.localStorage.setItem('userImgUrlClinic',res.datas.icon);
                    window.localStorage.setItem('userNickNameClinic',res.datas.name);
                    window.location.href="report/4min_walk.html";
                }
                if(res.status==500||res.status==501||res.status==505){
                    swal({
                        title:'提示',
                        text: '登录失败！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
                if(res.status==502){
                    swal({
                        title:'提示',
                        text: '请输入正确的用户名和密码！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
                if(res.status==503){
                    swal({
                        title:'提示',
                        text: '请输入正确的用户名和密码！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
                if(res.status==504){
                    swal({
                        title:'提示',
                        text: '该账户已被冻结！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
                if(res.status==511){
                    swal({
                        title:'提示',
                        text: '该账号已在其他地方登录！',
                        type: 'info',
                        showConfirmButton: true,
                        confirmButtonText: '确定',
                        timer: 2000,
                        confirmButtonColor: '#009CAA'
                    });
                }
                $('.login-button').removeClass('loading');
            }).fail(function(err){
                _this.ajaxLoading = false;
                $('.login-button').removeClass('loading');
            })
        }
    }else{
        _this.ajaxLoading = false;
        swal({
            title:'提示',
            text: '该输入您的账号密码！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        });
        $('.login-button').removeClass('loading');
    }
};

new Login();










