import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function AerobicReportDetail(){
    this.init();
}

AerobicReportDetail.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestCustomerData();
        this.requestSportsData();
        this.bind();
        this.requestSportsDataDetail();
        this.interpretation();
    }
    var reportType1 = 2;
    window.localStorage.setItem("reportType1",reportType1);

    var data_recordId = window.localStorage.getItem('data_recordId');
    if(data_recordId == 'null'){
        $('.compile').show();
    }else if((data_recordId)!= null){
        $('.examine').show();
    }
    $('.unscramble').attr('disabled','disabled');
    $('.page-compile').click(function(){
        $('.unscramble').removeAttr('disabled');
        $('.page-off').show();
        $(this).hide();
    })
    $('.page-call').click(function(){
        $('.unscramble').attr('disabled','disabled');
        $('.page-compile').show();
        $('.page-off').hide();
        window.history.go(0);
    })
};

AerobicReportDetail.prototype.interpretation = function(){
    var _this = this;
    _this.requestSportsData();
    $('.page-save').click(function(){
        _this.validator();
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
                sportType:2,
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
                    });
                    _this.requestSportsData();
                    $('.unscramble').attr('disabled','disabled');
                    $('.page-off').hide();
                    $('.page-compile').show();
                }
            }
        })
    })
}
AerobicReportDetail.prototype.validator = function(){
    var report_unscramble = $('.unscramble').val();
    if(report_unscramble.length>200){
        $('.verify-report').text("仅限200字以内");
        return false;
    }else{
        $('.verify-report').hide();
        return true;
    }
}

AerobicReportDetail.prototype.requestCustomerData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var customerId = window.localStorage.getItem('customerUUID');
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
                var personage_data = res.datas.userInfo;
                personage_data  = JSON.stringify(personage_data);
                window.localStorage.setItem('personage',personage_data);
            }
            ajaxLoading = false;
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

AerobicReportDetail.prototype.requestSportsData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var reportId = window.localStorage.getItem('reportId');
    var reqUrl = 'aerobic/aerobicData/'+reportId;
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
                var aerobic_data = res.datas;
                aerobic_data = JSON.stringify(aerobic_data);
                window.localStorage.setItem("aerobic",aerobic_data);

                var reportInterpretation = res.datas.reportInterpretation;
                if(reportInterpretation!=null) {
                    $('.unscramble').text(reportInterpretation);
                }
                window.localStorage.setItem('report',reportInterpretation);
            }
            ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

AerobicReportDetail.prototype.requestSportsDataDetail = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var reportId = window.localStorage.getItem('reportId');
    var reqUrl = 'aerobic/aerobicData/'+reportId+'/detail';
    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'post',
            data:{

            }
        }).done(function(res){
            if(res.status==200){
                _this.setEchartsData1(res.datas.muscleHeartRateInfo);
                var chart_data = res.datas;
                chart_data = JSON.stringify(chart_data);
                window.localStorage.setItem('chart',chart_data);

                _this.setEcharts2(res.datas.sportSmo2Info);
                _this.setEcharts3(res.datas.sportStageInfo);

                    var sport  = res.datas.sportStageInfo;
                    sport = JSON.stringify(sport);
                    window.localStorage.setItem('sport',sport);

                _this.setEcharts4(res.datas.muscleHeartRateRecoverInfo);
                var muscle = res.datas.muscleHeartRateRecoverInfo;
                muscle = JSON.stringify(muscle);

                window.localStorage.setItem('muscle',muscle);
            }
            ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

AerobicReportDetail.prototype.bind = function(){
    var _this = this;

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        if(e.target.innerText=='数据详情'){
            _this.requestSportsDataDetail();
        }
    })

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
                _this.setEchartsOption1(smo2Start,smo2End,hrStart,hrEnd);
            }
        }
    });

    $('.reset-y-btn').on('click',function(){
        $('.smo2-start').val('');
        $('.smo2-end').val('');
        $('.hr-start').val('');
        $('.hr-end').val('');

        $('#myModal').modal('hide');
        _this.setEchartsOption1(0,100,0,200);

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
                sportType:1,
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
        if(_this.mixchart!=undefined){
            _this.mixchart.resize();
            _this.mixchart2.resize();
            _this.mixchart3.resize();
            _this.pieChart.resize();
        }
    }
};

AerobicReportDetail.prototype.renderInfo = function(data){

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

AerobicReportDetail.prototype.renderData = function(data){
    $('.page-content>h3').text(window.cutTime(data.startDate) +'  515有氧能力测试报告');
    var next_time = data.startDate;
    window.localStorage.setItem('next_time',next_time);

    if(window.localStorage.getItem('auClinic') == '1'){
        $('.origin-data-download').attr('href',data.originData);
        $('.origin-data-download-ct').show();
        if(data.originData == null){
            $('.origin-data-download').text('无原始数据');
            $('.origin-data-download').addClass('no-data');
        }
    }
    //设备号
    if(data.bluetoothName==null){
        $('.device-number').text('--');
    }else{
        $('.device-number').text(data.bluetoothName);
    }

    $('.reportinfo-remark').find('p').text(window.nullFormat(data.reportRemarks));
    $('.report-remarks').val(data.reportRemarks);

    //有氧能力部分
    $('.smxo2-summary span:first').text(data.metValue);
    $('.smxo2-summary span.exdata-eva').text(data.metValueDescription);
    $('.exdata-summary-allin li').eq(0).find('h3').text(data.startTime);
    $('.exdata-summary-allin li').eq(1).find('h3').text(data.continuedTime);
    $('.exdata-summary-allin li').eq(2).find('h3').text(data.stopStage);
    $('.exdata-summary-allin li').eq(3).find('h3').text(data.benchmarkLevel);
    //运动能力部分
    $('.ability-list>li').eq(0).find('.ability-bar').addClass(this.levelEvaluate(data.vo2MaxLevel));
    $('.ability-list>li').eq(0).find('.ability-detail .ability-vo2max').text(data.vo2Max);
    $('.ability-list>li').eq(0).find('.ability-detail p').text(data.vo2MaxDescription);
    $('.ability-list>li').eq(1).find('.ability-bar').addClass(this.levelEvaluate(data.lacticLevel));

    if(data.lacticThresholdTime == '00:00:00'){
        $('.ability-list>li').eq(1).find('.ability-detail h4').hide();
    }else{
        $('.ability-list>li').eq(1).find('.ability-detail .ability-latic').text(data.lacticThresholdTime);
    }

    $('.ability-list>li').eq(1).find('.ability-detail p').text(data.lacticLevelDescription);
    //身体机能部分
    $('.body-function>li').eq(0).find('.ability-bar').addClass(this.levelEvaluate(data.oIntakeLevel));
    $('.body-function>li').eq(1).find('.ability-bar').addClass(this.levelEvaluate(data.oUseLevel));
    $('.body-function>li').eq(2).find('.ability-bar').addClass(this.levelEvaluate(data.oTransportationLevel));
    $('.body-function>li').eq(3).find('.ability-bar').addClass(this.levelEvaluate(data.recoverLevel));
    $('.body-function-summary li').eq(0).text(data.o2UseMessage);
    $('.body-function-summary li').eq(1).text(data.recoverLevMessage);
    //重大风险
    $('.risk-bar').addClass(this.riskEvaluate(data.riskLevel));

    if(data.sportRiskRate>=0){
        $('.risk-bar i').addClass('green');
    }else{
        $('.risk-bar i').addClass('red');
    }

    $('.risk-summary-detail .high-or-low').text(this.highOrLow(data.sportRiskRate));
    if(data.sportRiskRate == 0){
        $('.risk-percent').hide();
    }else{
        $('.risk-summary-detail .risk-percent').css({'background':this.riskPercentBGColor(data.sportRiskRate),'color':this.riskPercentFontColor(data.sportRiskRate)});
        $('.risk-summary-detail .risk-percent').html(
            '<img src="'+this.riskImg(data.sportRiskRate)+'">'+
            this.riskText(data.sportRiskRate)+'%'
        );
    }
};

AerobicReportDetail.prototype.levelEvaluate = function(num){
    var numArr = [-2,-1,0,1,2,3];
    var evaArr = ['awful','bad','none','average','good','excellent']
    for(var i=0;i<numArr.length;i++){
        if(num == numArr[i]){
            return evaArr[i];
        }
    }
}

AerobicReportDetail.prototype.riskEvaluate = function(num){
    var numArr = [1,2,3];
    var evaArr = ['high','normal','low'];

    if(num == 0){
        return 'none';
    }else{
        for(var i=0;i<numArr.length;i++){
            if(num == numArr[i]){
                return evaArr[i];
            }
        }
    }
};

AerobicReportDetail.prototype.highOrLow = function(num){
    if(num<0){
        return '比普通人高';
    }else if(num == 0){
        return '为正常人水平';
    }else if(num>0){
        return '比普通人低';
    }else{
        return '-';
    }
};

AerobicReportDetail.prototype.riskImg = function(num){
    if(num<=0){
        return '../../img/riskup@2x.png';
    }
    if(num>0){
        return '../../img/riskdown@2x.png';
    }else{
        return '';
    }
};

AerobicReportDetail.prototype.riskText = function(text){
    if(text !=null || text!= undefined){
        return (text*100).toFixed(0).toString().replace('-','');
    }else{
        return '--'
    }
}

AerobicReportDetail.prototype.riskPercentBGColor = function(num){
    if(num<=0){
        return '#ffc9c5';
    }
    if(num>0){
        return '#E4F6F6';
    }else{
        return '#ffc9c5';
    }
};

AerobicReportDetail.prototype.riskPercentFontColor = function(num){
    if(num<=0){
        return 'red';
    }
    if(num>0){
        return '#009caa';
    }else{
        return 'red';
    }
};

AerobicReportDetail.prototype.setEchartsData1 = function(data){
    $('.chart-summary-list li').eq(0).find('span').eq(0).text(data.avgSmo2);
    $('.chart-summary-list li').eq(1).find('span').eq(0).text(data.minSmo2);
    $('.chart-summary-list li').eq(2).find('span').eq(0).text(data.avgHeart);
    $('.chart-summary-list li').eq(3).find('span').eq(0).text(data.maxHeart);

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

    this.maxHrHint = (parseInt(data.limitHeart) * 0.85).toFixed(0);
    this.hintArr = [];
    var hintItem = { xAxis: 0, yAxis: this.maxHrHint };
    this.hintArr.push(hintItem);

    this.minSmo2 = Math.min.apply(null,y1);
    this.maxSmo2 = Math.max.apply(null,y1);
    this.minHr = Math.min.apply(null,y2);
    this.maxHr = Math.max.apply(null,y2);

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

    this.setEchartsOption1(y1start,y1end,y2start,y2end);
};

AerobicReportDetail.prototype.setEchartsOption1 = function(y1start,y1end,y2start,y2end){
    this.mixchart = echarts.init(document.getElementById('echarts_mix1'));
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
            },
            {
                name:'心率',
                type:'line',
                yAxisIndex: 1,
                symbol:'diamond',
                symbolSize:[10,10],
                data: this.chartY2Data,
                itemStyle: {
                    normal: {
                        color: '#F47D00'
                    }
                },
                markLine : {
                    data :this.hintArr,
                    symbol:['none','image://../../img/tuli3@3x.png'],
                    symbolSize:[20,20],
                    lineStyle:{
                        normal:{
                            type:'solid',
                            color:'red'
                        }
                    },
                },
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
}
AerobicReportDetail.prototype.setEcharts2 = function(data){
    var chartX1Data = data.x1Axis;
    var chartX2Data = data.x2Axis;
    var chartYData = data.yAxis;



    this.mixchart2 = echarts.init(document.getElementById('echarts_mix2'));
    this.mixchart2.setOption({
        tooltip: {
            show:false,
            trigger: 'axis'
        },
        grid:{
          top:30
        },
        xAxis: {
            data: chartX1Data,
        },
        yAxis: {
            show:false,
            splitLine: {
                show: false
            }
        },
        color:chartX2Data,
        legend:{
            show:false
        },
        series: [
            {
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function (params){
                            var colorList = ["#FF671F","#1894D5","#19CD40","#F02E1D"]
                            return colorList[chartX2Data[params.dataIndex]];
                        }
                    }
                },
                data:chartYData
            }
        ]
    });
}

AerobicReportDetail.prototype.setEcharts3 = function(data){

    var secondArr = [window.timeToseconds(data.warmupPeriodTime),window.timeToseconds(data.platformPeriodTime),window.timeToseconds(data.limitPeriodTime),window.timeToseconds(data.recoverPeriodTime)];
    var secondTotal = secondArr[0]+secondArr[1]+secondArr[2]+secondArr[3];
    var percentArr = [(secondArr[0]*100/secondTotal).toFixed(0),(secondArr[1]*100/secondTotal).toFixed(0),(secondArr[2]*100/secondTotal).toFixed(0),(secondArr[3]*100/secondTotal).toFixed(0)];

    $('.time-slot-item').eq(0).find('h3').text(percentArr[0]+'%');
    $('.time-slot-item').eq(1).find('h3').text(percentArr[1]+'%');
    $('.time-slot-item').eq(2).find('h3').text(percentArr[2]+'%');
    $('.time-slot-item').eq(3).find('h3').text(percentArr[3]+'%');

    $('.time-slot-item').eq(0).find('.time-slot').text(window.awfulTimeFormat(data.warmupPeriodTime));
    $('.time-slot-item').eq(1).find('.time-slot').text(window.awfulTimeFormat(data.platformPeriodTime));
    $('.time-slot-item').eq(2).find('.time-slot').text(window.awfulTimeFormat(data.limitPeriodTime));
    $('.time-slot-item').eq(3).find('.time-slot').text(window.awfulTimeFormat(data.recoverPeriodTime));

    $('.extime-item').eq(0).find('.time-bar').eq(0).find('span').eq(2).text(window.awfulTimeFormat(data.warmupPeriodMinTime));
    $('.extime-item').eq(0).find('.time-bar').eq(1).find('span').eq(2).text(window.awfulTimeFormat(data.warmupPeriodMaxTime));
    $('.extime-item').eq(0).find('.time-bar').eq(2).find('span').eq(2).text(window.awfulTimeFormat(data.warmupPeriodAvgTime));

    $('.extime-item').eq(1).find('.time-bar').eq(0).find('span').eq(2).text(window.awfulTimeFormat(data.platformPeriodMinTime));
    $('.extime-item').eq(1).find('.time-bar').eq(1).find('span').eq(2).text(window.awfulTimeFormat(data.platformPeriodMaxTime));
    $('.extime-item').eq(1).find('.time-bar').eq(2).find('span').eq(2).text(window.awfulTimeFormat(data.platformPeriodAvgTime));

    $('.extime-item').eq(2).find('.time-bar').eq(0).find('span').eq(2).text(window.awfulTimeFormat(data.limitPeriodMinTime));
    $('.extime-item').eq(2).find('.time-bar').eq(1).find('span').eq(2).text(window.awfulTimeFormat(data.limitPeriodMaxTime));
    $('.extime-item').eq(2).find('.time-bar').eq(2).find('span').eq(2).text(window.awfulTimeFormat(data.limitPeriodAvgTime));

    $('.extime-item').eq(3).find('.time-bar').eq(0).find('span').eq(2).text(window.awfulTimeFormat(data.recoverPeriodMinTime));
    $('.extime-item').eq(3).find('.time-bar').eq(1).find('span').eq(2).text(window.awfulTimeFormat(data.recoverPeriodMaxTime));
    $('.extime-item').eq(3).find('.time-bar').eq(2).find('span').eq(2).text(window.awfulTimeFormat(data.recoverPeriodAvgTime));

    var warmupPeriodMinTime = window.timeToseconds(data.warmupPeriodMinTime);
    var warmupPeriodMaxTime = window.timeToseconds(data.warmupPeriodMaxTime);
    var warmupPeriodAvgTime = window.timeToseconds(data.warmupPeriodAvgTime);

    var platformPeriodMinTime = window.timeToseconds(data.platformPeriodMinTime);
    var platformPeriodMaxTime = window.timeToseconds(data.platformPeriodMaxTime);
    var platformPeriodAvgTime = window.timeToseconds(data.platformPeriodAvgTime);

    var limitPeriodMinTime = window.timeToseconds(data.limitPeriodMinTime);
    var limitPeriodMaxTime = window.timeToseconds(data.limitPeriodMaxTime);
    var limitPeriodAvgTime = window.timeToseconds(data.limitPeriodAvgTime);

    var recoverPeriodMinTime = window.timeToseconds(data.recoverPeriodMinTime);
    var recoverPeriodMaxTime = window.timeToseconds(data.recoverPeriodMaxTime);
    var recoverPeriodAvgTime = window.timeToseconds(data.recoverPeriodAvgTime);

    var timeArr = [];
    timeArr.push(warmupPeriodMinTime,warmupPeriodMaxTime,warmupPeriodAvgTime);
    timeArr.push(platformPeriodMinTime,platformPeriodMaxTime,platformPeriodAvgTime);
    timeArr.push(limitPeriodMinTime,limitPeriodMaxTime,limitPeriodAvgTime);
    timeArr.push(recoverPeriodMinTime,recoverPeriodMaxTime,recoverPeriodAvgTime);

    var maxSeconds = timeArr[0];
    for(var i=0;i<timeArr.length;i++){
        if(timeArr[i]>maxSeconds){
            maxSeconds = timeArr[i];
        }
    }

    $('.extime-item').eq(0).find('.time-bar').eq(0).find('.time-min i').css({'width':(((window.timeToseconds(data.warmupPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(0).find('.time-bar').eq(1).find('.time-max i').css({'width':(((window.timeToseconds(data.warmupPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(0).find('.time-bar').eq(2).find('.time-ave i').css({'width':(((window.timeToseconds(data.warmupPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.extime-item').eq(1).find('.time-bar').eq(0).find('.time-min i').css({'width':(((window.timeToseconds(data.platformPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(1).find('.time-bar').eq(1).find('.time-max i').css({'width':(((window.timeToseconds(data.platformPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(1).find('.time-bar').eq(2).find('.time-ave i').css({'width':(((window.timeToseconds(data.platformPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.extime-item').eq(2).find('.time-bar').eq(0).find('.time-min i').css({'width':(((window.timeToseconds(data.limitPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(2).find('.time-bar').eq(1).find('.time-max i').css({'width':(((window.timeToseconds(data.limitPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(2).find('.time-bar').eq(2).find('.time-ave i').css({'width':(((window.timeToseconds(data.limitPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.extime-item').eq(3).find('.time-bar').eq(0).find('.time-min i').css({'width':(((window.timeToseconds(data.recoverPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(3).find('.time-bar').eq(1).find('.time-max i').css({'width':(((window.timeToseconds(data.recoverPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.extime-item').eq(3).find('.time-bar').eq(2).find('.time-ave i').css({'width':(((window.timeToseconds(data.recoverPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});


    var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false},
            shadowBlur: 40,
            shadowColor: 'rgba(40, 40, 40, 0.5)'
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            borderColor:'#eee',
            borderWidth:1,
            borderType:'dashed',
            label: {show: false},
            labelLine: {
                show: false
            }
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };

    this.pieChart = echarts.init(document.getElementById('echarts_pie'));
    this.pieChart.setOption({
        title: {
            text: window.secondsToTime(secondArr[0]+secondArr[1]+secondArr[2]+secondArr[3]),
            subtext: '运动时间',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 24
            },
            subtextStyle:{
                fontWeight: 'normal',
                fontSize: 16
            }
        },
        tooltip : {
            show:false,
            trigger: 'item',
            formatter: '{b} ({d}%)'
        },
        color:['#FF671F','#19CD40','#F02E1D','#1894D5'],
        series : [
            {
                name: '运动分析',
                type: 'pie',
                radius: [130, 140],
                hoverAnimation: false,
                data:[
                    {
                        value:percentArr[0], name:'热身区'
                    },
                    {
                        value:100-percentArr[0],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: false,
                            formatter: '{b} ({d}%)'
                        }
                    },
                    labelLine :{show:true}
                }
            },
            {
                name: '运动分析',
                type: 'pie',
                radius: [110, 120],
                hoverAnimation: false,
                data:[
                    {
                        value:percentArr[1], name:'有效运动区'
                    },
                    {
                        value:100-percentArr[1],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: false,
                            formatter: '{b} ({d}%)'
                        }
                    },
                    labelLine :{show:true}
                }
            },
            {
                name: '运动分析',
                type: 'pie',
                radius: [90, 100],
                hoverAnimation: false,
                data:[
                    {
                        value:percentArr[2], name:'高强度脱氧区'
                    },
                    {
                        value:100-percentArr[2],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: false,
                            formatter: '{b} ({d}%)'
                        }
                    },
                    labelLine :{show:true}
                }
            },
            {
                name: '运动分析',
                type: 'pie',
                radius: [70, 80],
                hoverAnimation: false,
                data:[
                    {
                        value:percentArr[3], name:'主动恢复区'
                    },
                    {
                        value:100-percentArr[3],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    normal: {
                        label:{
                            show: false,
                            formatter: '{b} ({d}%)'
                        }
                    },
                    labelLine :{show:true}
                }
            }
        ]
    },true);
}

AerobicReportDetail.prototype.setEcharts4 = function(data){
    var chartX1Data = data.xAxis;
    var chartY1Data = data.y1Axis;
    var chartY2Data = data.y2Axis;

    this.mixchart3 = echarts.init(document.getElementById('echarts_mix3'));
    this.mixchart3.setOption({
        tooltip: {
            trigger: 'axis',
        },
        toolbox: {
            show:false
        },
        xAxis: [
            {
                type: 'category',
                data: chartX1Data,
                boundaryGap: false,
                splitLine:{
                    show:true
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
                min: 0,
                max: 100,
                axisLabel: {
                    formatter: '{value}',
                    textStyle:{
                        color:'#333'
                    }
                },
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
                min: 0,
                max: 250,
                axisLabel: {
                    formatter: '{value}',
                    textStyle:{
                        color:'#333'
                    }
                },
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
                    color:'#6399E3',
                    fontSize:20
                }
            }
        ],
        series: [
            {
                name: '肌氧恢复',
                type: 'line',
                data: chartY1Data,
                symbolSize:[8,8],
                itemStyle: {
                    normal: {
                        color: '#009CAA'
                    }
                },
            },
            {
                name:'心率恢复',
                type:'line',
                yAxisIndex: 1,
                symbolSize:[8,8],
                data: chartY2Data,
                itemStyle: {
                    normal: {
                        color: '#6399E3'
                    }
                },
            }
        ]
    });
}
new AerobicReportDetail();



