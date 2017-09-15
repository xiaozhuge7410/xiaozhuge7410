window.formatTime = function(ts){
    if(ts==undefined || ts == null || ts == ''){
        return '--';
    }else{
        var oDate = new Date(ts),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds();
        var oTime = oYear +'-'+ window.getZeroFormat(oMonth) +'-'+ window.getZeroFormat(oDay) +' '+ window.getZeroFormat(oHour) +':'+ window.getZeroFormat(oMin) +':'+window.getZeroFormat(oSen);
        return oTime;
    }
};

window.formatTime2 = function(ts){
    if(ts==undefined || ts == null || ts == ''){
        return '--';
    }else{
        var oDate = new Date(ts),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate();

        var oTime = oYear +'-'+ window.getZeroFormat(oMonth) +'-'+ window.getZeroFormat(oDay);
        return oTime;
    }
};

window.formatSex = function(num){
    if(num == 1){
        return '男';
    }else if(num == 0){
        return '女';
    }else{
        return '';
    }
};

window.nullFormat = function(str){
    if(str == null){
        return '--';
    }else if(str == undefined){
        return '--';
    }else if(str == ''){
        return '--';
    }else{
        return str;
    }
};

window.cityNullFormat = function(str){
    if(str == null){
        return '-';
    }else if(str == undefined){
        return '-';
    }else if(str == ''){
        return '-';
    }else{
        return str;
    }
};

window.zeroFormat = function(str){
    if(str == null){
        return '0';
    }else if(str == undefined){
        return '0';
    }else if(str == ''){
        return '0';
    }else{
        return str;
    }
};

window.getZeroFormat = function(num){
    if(parseInt(num) < 10){
        num = '0'+ parseInt(num);
    }
    return num;
};

window.timeToseconds = function(str){
    if(str == null){
        return '0'
    }else{
        var temp = str.split(':');
        var seconds = 3600 * Number(temp[0]) + 60 * Number(temp[1]) + Number(temp[2]);
        return seconds;
    }
};

window.cutTime = function(str){
    if(str == null){
        return '--';
    }else if(str == undefined){
        return '--';
    }else if(str == ''){
        return '--';
    }else{
        return str.substr(0,10);
    }
};

window.cutTimeUntilSeconds = function(str){
    if(str == 'null'){
        return '--';
    }if(str == null){
        return '--';
    }else if(str == undefined){
        return '--';
    }else if(str == ''){
        return '--';
    }else{
        return str.substr(0,19);
    }
};

window.cutTimeToMinutes = function(str){
    if(str == null){
        return '--';
    }else if(str == undefined){
        return '--';
    }else if(str == '0'){
        return '0';
    }else{
        var strArr = str.split(':');
        return strArr[1];
    }
};

window.secondsToTime = function(second){
    return [parseInt(second / 60 / 60), parseInt(second / 60 % 60), second % 60].join(":")
        .replace(/\b(\d)\b/g, "0$1");
};

window.awfulTimeFormat = function(str){
    if(str==null){
        return '00:00:00';
    }else{
        var strArr = str.split(':');
        for(var i=0;i<strArr.length;i++){
            strArr[i] = window.getZeroFormat(strArr[i]);
        }
        return strArr.join(':');
    }
};

window.dateToTimestamp = function(str){
    var arr = str.split("-");
    var datum = new Date(Date.UTC(arr[0],arr[1]-1,arr[2]));
    return strtotime = datum.getTime()/1000;

};
