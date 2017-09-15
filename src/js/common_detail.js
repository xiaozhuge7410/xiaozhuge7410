import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function CommonReportDetail(){
    this.init();
}
CommonReportDetail.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestCustomerData();
        this.requestSportsData();
        this.bindEvent();
        this.interpretation();
    }
    var reportType1 = 1;
    window.localStorage.setItem("reportType1",reportType1);
    var data_recordId = window.localStorage.getItem('data_recordId');
    if(data_recordId == 'null'){
        $('.compile').show();
    }else{
        $('.examine').show();
    }
    $('.unscramble').attr('disabled','disabled');
    $('.page-compile').click(function(){
        $('.unscramble').removeAttr('disabled');
        $('.page-off').show();
        $(this).hide();
    })
    $('.page-call').click(function(){
        $('.report-unscramble').attr('disabled','disabled');
        $('.page-compile').show();
        $('.page-off').hide();
        window.history.go(0);
    })
};

CommonReportDetail.prototype.interpretation = function(){
    var _this = this;
    $('.report_unscramble').blur(function(){
        _this.validator();
    })
    $('.page-save').click(function(){
        _this.validator();
        _this.requestSportsData();
        var report_unscramble = $('.unscramble').val();
        var reportId = window.localStorage.getItem('reportId');
        var token = window.localStorage.getItem('utClinic'); // 登入凭证
        var uuid = window.localStorage.getItem('uidClinic'); // 用户id
        var reqUrl = 'motiondata/updateReportInterpretation';
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method:'post',
            data:{
                id:reportId,
                sportType:1,
                content:report_unscramble
            },
            success:function(res){
                if(res.status==200){
                    swal({
                        title:'提示',
                        text: '保存成功！',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    _this.requestSportsData();
                    $('.unscramble').attr('disabled','disabled');
                    $('.page-off').hide();
                    $('.page-compile').show();
                }
            }
        })
    })
}
CommonReportDetail.prototype.validator = function(){
    var report_unscramble = $('.unscramble').val();
    if(report_unscramble.length>200){
        $('.verify-report').text("仅限200字以内");
        return false;
    }else{
        $('.verify-report').hide();
        return true;
    }
}

CommonReportDetail.prototype.requestCustomerData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic'); // 登入凭证
    var uuid = window.localStorage.getItem('uidClinic'); // 用户id
    var customerId = window.localStorage.getItem('customerUUID'); // uuid
    var reqUrl = 'customer/findByCustomerUuid';
    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'post',
            data:{
                customerId:customerId
            }
        }).done(function(res){
            if(res.status==200){
                _this.renderInfo(res.datas.userInfo);
                var user = res.datas.userInfo;
                user=JSON.stringify(user);
                window.localStorage.setItem("usery",user);
            }
            ajaxLoading = false;
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

CommonReportDetail.prototype.requestSportsData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var reportId = window.localStorage.getItem('reportId');
    var reqUrl = 'customer/motionData/'+reportId+'/detail';
    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'post',
            data:{

            }
        }).done(function(res){
            if(res.status==200){
                _this.renderData(res.datas);

                var reportInterpretation = res.datas.motionInfo.reportInterpretation;
                if(reportInterpretation!=null) {
                    $('.unscramble').text(reportInterpretation);
                }
                window.localStorage.setItem('report',reportInterpretation);

                var datas = res.datas.motionInfo;
                datas = JSON.stringify(datas);
                window.localStorage.setItem("datay",datas);

                _this.setEchartsData(res.datas.muscleHeartRateInfo);

                var cartogram_data = res.datas.muscleHeartRateInfo;
                cartogram_data = JSON.stringify(cartogram_data);
                window.localStorage.setItem("cartogram",cartogram_data);

                var risk =  res.datas.riskNoteInfos;
                risk = JSON.stringify(risk);
                window.localStorage.setItem("riskNote",risk);
            }
            ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

CommonReportDetail.prototype.bindEvent = function(){
    var _this = this;
    $('.change-y-btn').on('click',function(){
        var smo2Start = $('.smo2-start').val();
        var smo2End = $('.smo2-end').val();
        var hrStart = $('.hr-start').val();
        var hrEnd = $('.hr-end').val();

        if(smo2Start==''|| smo2End==''|| hrStart==''|| hrEnd==''){
            $('.type-error-alert').text('请输入正确完整的数值范围！');
            $('.type-error-alert').fadeIn();
            setTimeout(function(){
                $('.type-error-alert').fadeOut();
            },2000);
        }
        if(smo2Start!=''||smo2End!=''||hrStart!=''||hrEnd!=''){
            if(smo2End==smo2Start||hrStart == hrEnd){
                $('.type-error-alert').text('请输入正确完整的数值范围！');
                $('.type-error-alert').fadeIn();
                setTimeout(function(){
                    $('.type-error-alert').fadeOut();
                },2000);
            }else if((parseInt(smo2End)<parseInt(smo2Start))||(parseInt(hrEnd)<parseInt(hrStart))){
                $('.type-error-alert').text('终止值不能小于起始值，请修改！');
                $('.type-error-alert').fadeIn();
                setTimeout(function(){
                    $('.type-error-alert').fadeOut();
                },2000);
            }else{
                $('#myModal').modal('hide');
                _this.setEchartsOption(smo2Start,smo2End,hrStart,hrEnd);
            }
        }
    });

    $('.reset-y-btn').on('click',function(){
        $('.smo2-start').val('');
        $('.smo2-end').val('');
        $('.hr-start').val('');
        $('.hr-end').val('');

        $('#myModal').modal('hide');
        _this.setEchartsOption(0,100,0,200);

    });

    $('.rewrite-report-remarks-btn').on('click',function(){
        var reqUrl = 'motiondata/addSportRemarks';
        var token = window.localStorage.getItem('utClinic');
        var uuid = window.localStorage.getItem('uidClinic');
        var reportId = window.localStorage.getItem('reportId');
        var reportRemarks = $('.report-remarks').val();
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            data:{
                sportType:0,
                uuid:reportId,
                content:reportRemarks
            }
        }).done(function(res){
            if(res.status==200){
                _this.requestSportsData();
                $('#rewriteModal').modal('hide');
                swal({
                    title:'提示',
                    text: '保存成功！',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            }else{
                $('.rewrite-error-alert').text('服务器解析错误，请稍后再试！');
                $('.rewrite-error-alert').fadeIn();
                setTimeout(function(){
                    $('.rewrite-error-alert').fadeOut();
                },2000);
            }
        }).fail(function(err){
            $('#rewriteModal').modal('hide');
            swal({
                title:'提示',
                text: '请求失败！',
                type: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        })
    });

    $('.smo2-start,.smo2-end').on('keypress',function(e){
        return e.keyCode>=48&&e.keyCode<=57;
    });

    $('.hr-start,.hr-end').on('keypress',function(e){
        return e.keyCode>=48&&e.keyCode<=57;
    });

    $('.smo2-start,.smo2-end').on('keyup',function(){
        if($(this).val()>100){
            $(this).val('100');
        }
        if($(this).val()<0){
            (this).val('0');
        }
    });

    $('.hr-start,.hr-end').on('keyup',function(){
        if($(this).val()>200){
            $(this).val('200');
        }
        if($(this).val()<0){
            (this).val('0');
        }
    });

    window.onresize = function(){
        _this.mixchart.resize();
    }
};

CommonReportDetail.prototype.renderInfo = function(data){
    $('.userinfo-detail-list li').eq(0).find('img').attr('src',data.icon_url);
    $('.userinfo-detail-list li').eq(1).find('p').text(data.id);
    $('.userinfo-detail-list li').eq(2).find('p').text(data.nick_name);
    $('.userinfo-detail-list li').eq(3).find('p').text(window.formatSex(data.sex));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.nullFormat(data.age));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.cityNullFormat(data.province)+window.cityNullFormat(data.city));
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(data.height)+'cm');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(data.weight)+'kg');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.nullFormat(data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(9).find('p').text(window.cutTimeUntilSeconds(data.last_upload_time));
    $('.userinfo-detail-list li').eq(10).find('p').text(window.nullFormat(data.register_time));

    $('.userinfo-remark').find('p').text(window.nullFormat(data.remarks));

    window.localStorage.setItem('customerUUID',data.uuid);
    window.localStorage.setItem('customerId',data.id);
};

CommonReportDetail.prototype.renderData = function(data){
    $('.page-content>h3').text(window.cutTime(data.motionInfo.startDate)+' '+ this.sportTypeFormat(data.motionInfo.type));
    var next_time = data.motionInfo.startDate;
    var test_type = data.motionInfo.type;
    window.localStorage.setItem('next_time',next_time);


    if(window.localStorage.getItem('auClinic') == '1'){
        $('.origin-data-download').attr('href',data.motionInfo.originData);
        $('.origin-data-download-ct').show();
        if(data.motionInfo.originData == null){
            $('.origin-data-download').text('无原始数据');
            $('.origin-data-download').addClass('no-data');
        }
    }

    if(data.motionInfo.bluetoothName==null){
        $('.device-number').text('--');
    }else{
        $('.device-number').text(data.motionInfo.bluetoothName);
    }

    $('.reportinfo-remark').find('p').text(window.nullFormat(data.motionInfo.reportRemarks));
    $('.report-remarks').val(data.motionInfo.reportRemarks);

    $('.start-time-summary span:first').text(data.motionInfo.startTime);
    $('.last-time-summary span:first').text(data.motionInfo.continuedTime);
    $('.maxo2-summary span:first').text(data.motionInfo.maxVo2);
    $('.maxo2-summary span.exdata-eva').text(data.motionInfo.vo2Conclusion);
    $('.smo2-summary span:first').text(data.motionInfo.metValue);

    $('.smo2-summary span.exdata-eva').text(data.motionInfo.metConclusion);

    $('.chart-summary-list li').eq(0).find('span').eq(0).text(data.muscleHeartRateInfo.avgHr);
    $('.chart-summary-list li').eq(1).find('span').eq(0).text(data.muscleHeartRateInfo.maxHr);

    this.maxHrHint = (parseInt(data.muscleHeartRateInfo.limitHr)*0.85).toFixed(0);
    this.minSmo2 = data.muscleHeartRateInfo.minSmo2;
    this.maxSmo2 = data.muscleHeartRateInfo.maxSmo2;
    this.minHr = data.muscleHeartRateInfo.minHr;
    this.maxHr = data.muscleHeartRateInfo.maxHr;


    if(data.riskNoteInfos.length==0){
        $('.risk-remark-list').text('无');
    }else{
        for(var i=0;i<data.riskNoteInfos.length;i++){

            if(data.riskNoteInfos[i].type == 1){
                var riskItem = '<li class="lose-water">'
                    +'<span>' + this.nullTimeFormat(data.riskNoteInfos[i].time) + '</span>'
                    +'<span class="risk-mark"></span>'
                    +'<span>' + data.riskNoteInfos[i].hint + '</span>'
                    +'</li>';
            }else{
                var riskItem = '<li class="overhb">'
                    +'<span>' + this.nullTimeFormat(data.riskNoteInfos[i].time) + '</span>'
                    +'<span class="risk-mark"></span>'
                    +'<span>' + data.riskNoteInfos[i].hint + '</span>'
                    +'</li>'
            }

            $(riskItem).appendTo('.risk-remark-list')
        }
    }
};

CommonReportDetail.prototype.nullTimeFormat = function(str){
    if(str == null || str == ''){
        return '00:00:00';
    }else{
        return str
    }
};

CommonReportDetail.prototype.sportTypeFormat = function(num){
    var typeStr = ['其他','跑步','骑行','步行','健身房','篮球','足球','乒乓球','羽毛球','排球','轮滑','滑雪','攀岩','划艇','网球','拳击','毽球'];
    return typeStr[num];
};


CommonReportDetail.prototype.setEchartsData = function(data){

    var y1 = data.y1Axis;
    var y2 = data.y2Axis;

    for(var j=0;j<y1.length;j++){
        if(y1[j]==0){
            y1[j] = y1[j-1];
        }
    }
    for(var k=0;k<y2.length;k++){
        if(y2[k]==0){
            y2[k] = y2[k-1];
        }
    }
    this.chartXData = data.xAxis;
    this.chartY1Data = y1;
    this.chartY2Data = y2;

    this.minSmo2 = Math.min.apply(null,y1);
    this.maxSmo2 = Math.max.apply(null,y1);
    this.minHr = Math.min.apply(null,y2);
    this.maxHr = Math.max.apply(null,y2);


    this.chartMarkData1 = data.notePoints;
    this.chartMarkData2 = data.riskPoints;
    this.chartMarkDataArr1 = [];
    this.chartMarkDataArr2 = [];

    this.rangeArr = [this.minSmo2*2,this.maxSmo2*2,this.minHr,this.maxHr];

    if(this.rangeArr[0]<this.rangeArr[2]){
        var y2start = this.rangeArr[0]-4;
        var y1start = ((this.rangeArr[0]-4)/2).toFixed(0);

    }else{
        var y2start = this.rangeArr[2]-4;
        var y1start = ((this.rangeArr[2]-4)/2).toFixed(0);
    }

    if(this.rangeArr[1]>this.rangeArr[3]){
        var y2end = this.rangeArr[1]+4;
        var y1end = ((this.rangeArr[1]+4)/2).toFixed(0);
    }else{
        var y2end = this.rangeArr[3]+4;
        var y1end = ((this.rangeArr[3]+4)/2).toFixed(0);
    }

    if (y1start <= 0) {
        y1start = 0;
    }
    if (y2start <= 0) {
        y2start = 0;
    }

    this.splitNumber1 = ((y1end - y1start)/5);
    this.splitNumber2 = ((y2end - y2start)/5);

    for(var i=0;i<this.chartMarkData1.length;i++){
        var markItem = [{coord:[this.chartMarkData1[i],y1start],symbol:'none'},{coord:[this.chartMarkData1[i],y1end],symbol:'none'}];
        this.chartMarkDataArr1.push(markItem);
    }
    for(var i=0;i<this.chartMarkData2.length;i++){
        var markItem = [{coord:[this.chartMarkData2[i],y2start],symbol:'none'},{coord:[this.chartMarkData2[i],y2end],symbol:'none'}];
        this.chartMarkDataArr2.push(markItem);
    }

    var hintItem = {
        yAxis:this.maxHrHint,
        lineStyle: {
            normal: {
                type: 'solid',
                color: 'red'
            }
        }
    };

    this.chartMarkDataArr2.push(hintItem);

    this.setEchartsOption(y1start,y1end,y2start,y2end);
};

CommonReportDetail.prototype.setEchartsOption = function(y1start,y1end,y2start,y2end){

    this.mixchart = echarts.init(document.getElementById('echarts_mix'));
    this.mixchart.setOption({
        tooltip: {
            trigger: 'axis',
        },
        xAxis: [
            {
                type: 'category',
                data: this.chartXData,
                axisLine:{
                    lineStyle: {
                        color: '#C5C5C5',
                        width:2
                    }
                },
                boundaryGap:false,
                axisLabel: {
                    formatter: '{value}',
                    textStyle:{
                        color:'#333'
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '肌氧(%)',
                min: y1start,
                max: y1end,
                axisLabel: {
                    formatter: function (value, index) {
                        return value.toFixed(0);
                    },
                    textStyle:{
                        color:'#333'
                    },
                    showMaxLabel:true,
                    showMinLabel:true,
                },
                interval:this.splitNumber1,
                splitLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                    lineStyle: {
                        color: '#C5C5C5',
                        width:2
                    }
                },
                nameTextStyle:{
                    color:'#009CAA',
                    fontSize:20
                }
            },
            {
                type: 'value',
                name: '(bpm)心率',
                min: y2start,
                max: y2end,
                axisLabel: {
                    formatter: function (value, index) {
                        return value.toFixed(0);
                    },
                    textStyle:{
                        color:'#333'
                    },
                    showMaxLabel:true,
                    showMinLabel:true,
                },
                interval:this.splitNumber2,
                axisLine:{
                    lineStyle: {
                        color: '#C5C5C5',
                        width:2
                    }
                },
                splitLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                nameTextStyle:{
                    color:'#F47D00',
                    fontSize:20
                }
            }
        ],
        series: [
            {
                name: '肌氧',
                type: 'line',
                symbol:'circle',
                symbolSize:[8,8],
                data: this.chartY1Data,
                itemStyle: {
                    normal: {
                        color: '#009CAA'
                    }
                },
                markLine: {
                    symbol:['none','none'],
                    silent:true,
                    label:{
                        normal:{
                            show:false
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#6D6D6D'
                        }
                    },
                    data: this.chartMarkDataArr1
                }
            },
            {
                name:'心率',
                type:'line',
                symbol:'diamond',
                symbolSize:[10,12],
                yAxisIndex: 1,
                data: this.chartY2Data,
                itemStyle: {
                    normal: {
                        color: '#F47D00'
                    }
                },
                markLine: {
                    symbol:['none','image://../../img/tuli3@3x.png'],
                    symbolSize: [20, 20],
                    silent:true,
                    label:{
                        normal:{
                            show:true
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#ff0000'
                        }
                    },
                    data: this.chartMarkDataArr2
                }
            }
        ],
        dataZoom: [
            {
                "show": true,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 30,
                start: 0,
                end: 100,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle:{
                    color:"#C5C5C5"
                },
                textStyle:{
                    color:"rgba(0,0,0,0)"
                },
                borderColor:"#C5C5C5"
            }
        ]
    });
};
new CommonReportDetail();