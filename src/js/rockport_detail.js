import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function RockportDetail(){
    this.init();
}

RockportDetail.prototype.init = function(){
    if(window.localStorage.getItem('utClinic') == null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestCustomerData();
        this.requestSportsData();
        this.bind();
        this.interpretation();
    }
    var reportType1 = 3;
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
    })
};
RockportDetail.prototype.interpretation = function(){
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
                sportType:3,
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
RockportDetail.prototype.validator = function(){
    var report_unscramble = $('.unscramble').val();
    if(report_unscramble.length>200){
        $('.verify-report').text("仅限200字以内");
        return false;
    }else{
        $('.verify-report').hide();
        return true;
    }
}

RockportDetail.prototype.requestCustomerData = function(){
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
                var userInfo_data = res.datas.userInfo;
                userInfo_data = JSON.stringify(userInfo_data);
                window.localStorage.setItem('userInfo',userInfo_data);
            }
            ajaxLoading = false;
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};

RockportDetail.prototype.requestSportsData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var reportId = window.localStorage.getItem('reportId');
    var reqUrl = 'aerobic/rockportOrTreadmill/'+reportId;
    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'post',
            data:{

            }
        }).done(function(res){
            if(res.status==200){
                _this.renderData(res.datas.aerobicDataVO);

                var reportInterpretation = res.datas.aerobicDataVO.reportInterpretation;
                if(reportInterpretation!=null) {
                    $('.unscramble').text(reportInterpretation);
                }
                window.localStorage.setItem('report',reportInterpretation);

                var aerobic = res.datas.aerobicDataVO;
                aerobic = JSON.stringify(aerobic);
                window.localStorage.setItem('aerobic',aerobic);

                _this.setEchartsData1(res.datas.muscleHeartRateInfo);
                var muscle = res.datas.muscleHeartRateInfo;
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

RockportDetail.prototype.bind = function(){
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
        _this.mixchart.resize();
    }
};

RockportDetail.prototype.renderInfo = function(data){

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

RockportDetail.prototype.renderData = function(data){
    $('.page-content>h3').text(window.cutTime(data.startDate) +'  Rockport测试报告');
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
    $('.exdata-summary-allin li').eq(1).find('h3').text(data.benchmarkLevel);
    $('.exdata-summary-allin li').eq(2).find('h3').text(data.continuedTime);
    $('.exdata-summary-allin li').eq(3).find('h3').text(data.avgSpeed+'km/h');
    $('.exdata-summary-allin li').eq(4).find('h3').text(data.finalHeart+'bpm');

    //测试评价部分
    $('.ability-list>li').eq(0).find('.ability-bar').addClass(this.levelEvaluate(data.vo2MaxLevel));
    $('.ability-list>li').eq(0).find('.ability-detail .ability-vo2max').text(data.vo2Max);
    $('.ability-list>li').eq(0).find('.ability-detail p').text(data.vo2MaxDescription);

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
    }else {
        $('.risk-summary-detail .risk-percent').css({
            'background': this.riskPercentBGColor(data.sportRiskRate),
            'color': this.riskPercentFontColor(data.sportRiskRate)
        });
        $('.risk-summary-detail .risk-percent').html(
            '<img src="' + this.riskImg(data.sportRiskRate) + '">' +
            this.riskText(data.sportRiskRate) + '%'
        );
    }
};

RockportDetail.prototype.levelEvaluate = function(num){
    var numArr = [-2,-1,0,1,2,3];
    var evaArr = ['awful','bad','none','average','good','excellent'];
    for(var i=0;i<numArr.length;i++){
        if(num == numArr[i]){
            return evaArr[i];
        }
    }
};

RockportDetail.prototype.riskEvaluate = function(num){
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

RockportDetail.prototype.highOrLow = function(num){
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

RockportDetail.prototype.riskImg = function(num){
    if(num<=0){
        return '../../img/riskup@2x.png';
    }
    if(num>0){
        return '../../img/riskdown@2x.png';
    }else{
        return '';
    }
};

RockportDetail.prototype.riskText = function(text){
    if(text !=null || text!= undefined){
        return (text*100).toFixed(0).toString().replace('-','');
    }else{
        return '--'
    }
};

RockportDetail.prototype.riskPercentBGColor = function(num){
    if(num<=0){
        return '#ffc9c5';
    }
    if(num>0){
        return '#E4F6F6';
    }else{
        return '#ffc9c5';
    }
};

RockportDetail.prototype.riskPercentFontColor = function(num){
    if(num<=0){
        return 'red';
    }
    if(num>0){
        return '#009caa';
    }else{
        return 'red';
    }
};

RockportDetail.prototype.setEchartsData1 = function(data){
    this.chartXData = data.xAxis;
    this.chartY1Data = data.y1Axis;
    this.chartY2Data = data.y2Axis;

    this.maxHrHint = (parseInt(data.limitHeart)*0.85).toFixed(0);
    this.hintArr = [];
    var hintItem = {xAxis:0,yAxis:this.maxHrHint};
    this.hintArr.push(hintItem);

    this.minSmo2 = data.minSmo2;
    this.maxSmo2 = data.maxSmo2;
    this.minHr = data.minHeart;
    this.maxHr = data.maxHeart;

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
RockportDetail.prototype.setEchartsOption1 = function(y1start,y1end,y2start,y2end){
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
                splitLine:{
                    show:false
                },
                axisTick: {
                    show: false
                },
                interval:this.splitNumber1,
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
};


new RockportDetail();




