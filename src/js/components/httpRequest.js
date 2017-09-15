window.simUrlHandler = function(reqUrl){
    // var urlOrigin = 'http://apiclinic.igetwell.cn/';
    var urlOrigin = 'http://192.168.0.198:8091/';
    //  var urlOrigin = 'http://192.168.0.173:8091/';
        return urlOrigin + reqUrl;
};

window.urlHandler = function(reqUrl,userId,token){
    // var urlOrigin = 'http://apiclinic.igetwell.cn/';
    var urlOrigin = 'http://192.168.0.198:8091/';
    // var urlOrigin = 'http://192.168.0.173:8091/';
    var timeStamp = new Date().getTime();
    var desString = window.encryptByDES(token+timeStamp);
    desString = desString.replace(/[+]+/g,"Jd2b");
    desString = desString.replace(/\s+/g,"Jd1b");
    desString = desString.replace(/==/g,"Jd3b");
    return urlOrigin + reqUrl + '?' + 'userId=' + userId + '&&timestamp=' + timeStamp + '&&sign=' + desString;
};

window.encryptByDES = function(handletext){
    var keyHex = CryptoJS.enc.Utf8.parse('jdhealthy12@igetwell.com');
    var encrypted = CryptoJS.DES.encrypt(handletext, keyHex, {
        iv:'01234567',
        mode : CryptoJS.mode.ECB,
        padding : CryptoJS.pad.Pkcs7
    });
    return  encrypted.toString();
};

window.decryptByDES = function(ciphertext){
    var keyHex = CryptoJS.enc.Utf8.parse('jdhealthy12@igetwell.com');
    var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
};

window.dataErrorHandler = function(res){
    if(res.status == 500){
        swal({
            title:'提示',
            text: '服务器繁忙，请稍后再试！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 501){
        swal({
            title:'提示',
            text: '请求参数为空！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 502){
        swal({
            title:'提示',
            text: '没有找到该用户！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 503){
        swal({
            title:'提示',
            text: '账号或密码错误！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 504){
        swal({
            title:'提示',
            text: '该账号已被冻结！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 505){
        swal({
            title:'提示',
            text: '服务器解析失败，请稍后再试！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }else if(res.status == 506){
        alert('登录状态过期,请重新登录！');
        window.location.href="../login.html";
        window.localStorage.clear();
    }else if(res.status == 507){
        alert('登录状态过期,请重新登录！');
        window.location.href="../login.html";
        window.localStorage.clear();
    }else if(res.status == 508){
        alert('登录状态过期,请重新登录！');
        window.location.href="../login.html";
        window.localStorage.clear();
    }else if(res.status == 510){
        swal({
            title:'提示',
            text: '服务器繁忙，请稍后再试！',
            type: 'info',
            showConfirmButton: true,
            confirmButtonText: '确定',
            timer: 2000,
            confirmButtonColor: '#009CAA'
        })
    }
};

