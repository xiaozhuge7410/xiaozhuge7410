import './components/httpRequest';
import './components/dataFormat';
$(function(){
    var personage_gather = window.localStorage.getItem('personage');
    var personage_data = JSON.parse(personage_gather);

    $('.head-portrait').find('img').attr('src',personage_data.icon_url);
    $('.userinfo-detail-list li').eq(0).find('p').text(personage_data.id);
    $('.userinfo-detail-list li').eq(1).find('p').text(personage_data.nick_name);
    $('.userinfo-detail-list li').eq(2).find('p').text(window.formatSex(personage_data.sex));
    $('.userinfo-detail-list li').eq(3).find('p').text(window.nullFormat(personage_data.age));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.cityNullFormat(personage_data.province)+window.cityNullFormat(personage_data.city));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.nullFormat(personage_data.height)+'cm');
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(personage_data.weight)+'kg');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(personage_data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.cutTimeUntilSeconds(personage_data.last_upload_time));
    $('.userinfo-detail-list li').eq(9).find('p').text(window.nullFormat(personage_data.register_time));
    $('.userinfo-remark').find('p').text(window.nullFormat(personage_data.remarks));

    var aerobic = window.localStorage.getItem('aerobic');
    var aerobic_data = JSON.parse(aerobic);

    if(aerobic_data.bluetoothName===null){
        $('.device-number').text('硬件设备编号:--');
    }else{
        $('.device-number').text('硬件设备编号:'+aerobic_data.bluetoothName);
    }

    $('.head-data').text(window.cutTime(aerobic_data.startDate));  //时间

    //有氧能力部分
    $('.aerobic-ability p').find('span').text(aerobic_data.metValue);
    $('.aerobic-ability p').find('i').text(aerobic_data.metValueDescription);
    $('.aerobic-data ul li').eq(0).find('p').text(aerobic_data.startTime);
    $('.aerobic-data ul li').eq(1).find('p').text(aerobic_data.continuedTime);
    $('.aerobic-data ul li').eq(2).find('p').text(aerobic_data.stopStage);
    $('.aerobic-data ul li').eq(3).find('p').text(aerobic_data.benchmarkLevel);

    //运动能力部分
    $('.ability-list>li').eq(0).find('.ability-bar').addClass(levelEvaluate(aerobic_data.vo2MaxLevel));
    $('.ability-list>li').eq(0).find('.ability-detail span').text(aerobic_data.vo2Max);
    $('.ability-list>li').eq(0).find('.ability-detail p').text(aerobic_data.vo2MaxDescription);
    $('.ability-list>li').eq(1).find('.ability-bar').addClass(levelEvaluate(aerobic_data.lacticLevel));

    // 不晓得是哪一段
    if(aerobic_data.lacticThresholdTime == '00:00:00'){
        $('.ability-list>li').eq(1).find('.ability-detail h4').hide();
    }else{
        $('.ability-list>li').eq(1).find('.ability-detail span').text(aerobic_data.lacticThresholdTime);
    }

    $('.ability-list>li').eq(1).find('.ability-detail p').text(aerobic_data.lacticLevelDescription);

    //身体机能部分
    $('.body-function-list>li').eq(0).find('.ability-bar').addClass(levelEvaluate(aerobic_data.oIntakeLevel));
    $('.body-function-list>li').eq(1).find('.ability-bar').addClass(levelEvaluate(aerobic_data.oUseLevel));
    $('.body-function-list>li').eq(2).find('.ability-bar').addClass(levelEvaluate(aerobic_data.oTransportationLevel));
    $('.body-function-list>li').eq(3).find('.ability-bar').addClass(levelEvaluate(aerobic_data.recoverLevel));
    $('.body-function-summary li').eq(0).text(aerobic_data.o2UseMessage);
    $('.body-function-summary li').eq(1).text(aerobic_data.recoverLevMessage);
    $('.min_box p').eq(0).find("span").text(aerobic_data.o2UseMessage);
    $('.min_box p').eq(1).find("span").text(aerobic_data.recoverLevMessage);

    //重大风险
    $('.risk-bar').addClass(riskEvaluate(aerobic_data.riskLevel));
    if(aerobic_data.sportRiskRate>=0){
        $('.risk-bar i').addClass('green');
    }else{
        $('.risk-bar i').addClass('red');
    }

    $('.risk-summary-detail .high-or-low').text(highOrLow(aerobic_data.sportRiskRate));

    if(aerobic_data.sportRiskRate == 0){
        $('.risk-percent').hide();
    }else {
        $('.risk-summary-detail .risk-percent').css({
            'background': riskPercentBGColor(aerobic_data.sportRiskRate),
            'color': riskPercentFontColor(aerobic_data.sportRiskRate)
        });
        $('.risk-summary-detail .risk-percent').html(
            '<img src="' + riskImg(aerobic_data.sportRiskRate) + '">' +
            riskText(aerobic_data.sportRiskRate) + '%'
        );
    }

    var chart= window.localStorage.getItem("chart");
    var chart_data = JSON.parse(chart);

    var muscleDate = chart_data.muscleHeartRateInfo;
    setEchartsData1(muscleDate);

    var sport = window.localStorage.getItem('sport');
    var sport_data = JSON.parse(sport);

    var secondArr = [window.timeToseconds(sport_data.warmupPeriodTime),window.timeToseconds(sport_data.platformPeriodTime),window.timeToseconds(sport_data.limitPeriodTime),window.timeToseconds(sport_data.recoverPeriodTime)];
    var secondTotal = secondArr[0]+secondArr[1]+secondArr[2]+secondArr[3];
    var percentArr = [(secondArr[0]*100/secondTotal).toFixed(0),(secondArr[1]*100/secondTotal).toFixed(0),(secondArr[2]*100/secondTotal).toFixed(0),(secondArr[3]*100/secondTotal).toFixed(0)];

    $('.exercise-analyze .continue-data span').text(window.secondsToTime(secondTotal));
    $('.exercise-analyze .list-left li').eq(0).find('p i').text(window.awfulTimeFormat(sport_data.warmupPeriodTime))
    $('.exercise-analyze .list-left li').eq(1).find('p i').text(window.awfulTimeFormat(sport_data.platformPeriodTime))
    $('.exercise-analyze .list-left li').eq(2).find('p i').text(window.awfulTimeFormat(sport_data.limitPeriodTime))
    $('.exercise-analyze .list-left li').eq(3).find('p i').text(window.awfulTimeFormat(sport_data.recoverPeriodTime))

    $('.exercise-analyze .list-left li').eq(0).find('h4').text(percentArr[0]+'%');
    $('.exercise-analyze .list-left li').eq(1).find('h4').text(percentArr[1]+'%');
    $('.exercise-analyze .list-left li').eq(2).find('h4').text(percentArr[2]+'%');
    $('.exercise-analyze .list-left li').eq(3).find('h4').text(percentArr[3]+'%');

    $('.exercise-analyze .list-left li').eq(0).find('.time-bar i').css({'width':(percentArr[0]+'%')});
    $('.exercise-analyze .list-left li').eq(1).find('.time-bar i').css({'width':(percentArr[1]+'%')});
    $('.exercise-analyze .list-left li').eq(2).find('.time-bar i').css({'width':(percentArr[2]+'%')});
    $('.exercise-analyze .list-left li').eq(3).find('.time-bar i').css({'width':(percentArr[3]+'%')});

    $('.exercise-analyze .list-right li').eq(0).find('.min-container p span').text(window.awfulTimeFormat(sport_data.warmupPeriodMinTime));
    $('.exercise-analyze .list-right li').eq(0).find('.max-container p span').text(window.awfulTimeFormat(sport_data.warmupPeriodMaxTime));
    $('.exercise-analyze .list-right li').eq(0).find('.avg-container p span').text(window.awfulTimeFormat(sport_data.warmupPeriodAvgTime));

    $('.exercise-analyze .list-right li').eq(1).find('.min-container p span').text(window.awfulTimeFormat(sport_data.platformPeriodMinTime));
    $('.exercise-analyze .list-right li').eq(1).find('.max-container p span').text(window.awfulTimeFormat(sport_data.platformPeriodMaxTime));
    $('.exercise-analyze .list-right li').eq(1).find('.avg-container p span').text(window.awfulTimeFormat(sport_data.platformPeriodAvgTime));

    $('.exercise-analyze .list-right li').eq(2).find('.min-container p span').text(window.awfulTimeFormat(sport_data.limitPeriodMinTime));
    $('.exercise-analyze .list-right li').eq(2).find('.max-container p span').text(window.awfulTimeFormat(sport_data.limitPeriodMaxTime));
    $('.exercise-analyze .list-right li').eq(2).find('.avg-container p span').text(window.awfulTimeFormat(sport_data.limitPeriodAvgTime));

    $('.exercise-analyze .list-right li').eq(3).find('.min-container p span').text(window.awfulTimeFormat(sport_data.recoverPeriodMinTime));
    $('.exercise-analyze .list-right li').eq(3).find('.max-container p span').text(window.awfulTimeFormat(sport_data.recoverPeriodMaxTime));
    $('.exercise-analyze .list-right li').eq(3).find('.avg-container p span').text(window.awfulTimeFormat(sport_data.recoverPeriodAvgTime));



    var warmupPeriodMinTime = window.timeToseconds(sport_data.warmupPeriodMinTime);
    var warmupPeriodMaxTime = window.timeToseconds(sport_data.warmupPeriodMaxTime);
    var warmupPeriodAvgTime = window.timeToseconds(sport_data.warmupPeriodAvgTime);

    var platformPeriodMinTime = window.timeToseconds(sport_data.platformPeriodMinTime);
    var platformPeriodMaxTime = window.timeToseconds(sport_data.platformPeriodMaxTime);
    var platformPeriodAvgTime = window.timeToseconds(sport_data.platformPeriodAvgTime);

    var limitPeriodMinTime = window.timeToseconds(sport_data.limitPeriodMinTime);
    var limitPeriodMaxTime = window.timeToseconds(sport_data.limitPeriodMaxTime);
    var limitPeriodAvgTime = window.timeToseconds(sport_data.limitPeriodAvgTime);

    var recoverPeriodMinTime = window.timeToseconds(sport_data.recoverPeriodMinTime);
    var recoverPeriodMaxTime = window.timeToseconds(sport_data.recoverPeriodMaxTime);
    var recoverPeriodAvgTime = window.timeToseconds(sport_data.recoverPeriodAvgTime);

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

    $('.exercise-analyze .list-right li').eq(0).find('.min-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.warmupPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(0).find('.max-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.warmupPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(0).find('.avg-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.warmupPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.exercise-analyze .list-right li').eq(1).find('.min-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.platformPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(1).find('.max-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.platformPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(1).find('.avg-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.platformPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.exercise-analyze .list-right li').eq(2).find('.min-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.limitPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(2).find('.max-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.limitPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(2).find('.avg-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.limitPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    $('.exercise-analyze .list-right li').eq(3).find('.min-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.recoverPeriodMinTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(3).find('.max-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.recoverPeriodMaxTime))/maxSeconds)*100).toFixed(0)+'%'});
    $('.exercise-analyze .list-right li').eq(3).find('.avg-container .time-compare-bar i').css({'width':(((window.timeToseconds(sport_data.recoverPeriodAvgTime))/maxSeconds)*100).toFixed(0)+'%'});

    var muscle = window.localStorage.getItem('muscle');
    var muscle_data = JSON.parse(muscle);
    setEcharts4(muscle_data);

    var reportInterpretation = window.localStorage.getItem('report');
    if(reportInterpretation!='null'){
        $('.report-content').text(reportInterpretation);
    }
});
 function levelEvaluate(num){
    var numArr = [-2,-1,0,1,2,3];
    var evaArr = ['awful','bad','none','average','good','excellent'];
    for(var i=0;i<numArr.length;i++){
        if(num == numArr[i]){
            return evaArr[i];
        }
    }
}
 function riskEvaluate(num){
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
}
 function highOrLow(num){
     if(num<0){
         return '比普通人高';
     }else if(num == 0){
         return '为正常人水平';
     }else if(num>0){
         return '比普通人低';
     }else{
         return '-';
     }
}
 function riskPercentBGColor(num){
    if(num<=0){
        return '#ffc9c5';
    }
    if(num>0){
        return '#E4F6F6';
    }else{
        return '#ffc9c5';
    }
}
  function riskPercentFontColor(num){
    if(num<=0){
        return 'red';
    }
    if(num>0){
        return '#009caa';
    }else{
        return 'red';
    }
}
 function riskImg(num){
    if(num<=0){
        return '../../img/riskup@2x.png';
    }
    if(num>0){
        return '../../img/riskdown@2x.png';
    }else{
        return '';
    }
}
 function riskText(text){
    if(text !=null || text!= undefined){
        return (text*100).toFixed(0).toString().replace('-','');
    }else{
        return '--'
    }
}
function setEchartsData1(muscleDate){
    var chartXData = muscleDate.xAxis;
    var chartY1Data = muscleDate.y1Axis;
    var chartY2Data = muscleDate.y2Axis;

    $('.smo2-data ul li').eq(0).find('b').text(muscleDate.avgSmo2);
    $('.smo2-data ul li').eq(1).find('b').text(muscleDate.minSmo2);
    $('.smo2-data ul li').eq(2).find('b').text(muscleDate.avgHeart);
    $('.smo2-data ul li').eq(3).find('b').text(muscleDate.maxHeart);


    var maxHrHint = (parseInt(muscleDate.limitHeart)*0.85).toFixed(0);
    var hintArr = [];
    var hintItem = {xAxis:0,yAxis:maxHrHint};
    hintArr.push(hintItem);

    var minSmo2 = muscleDate.minSmo2;
    var maxSmo2 = muscleDate.maxSmo2;
    var minHr = muscleDate.minHeart;
    var maxHr = muscleDate.maxHeart;

    var rangeArr = [minSmo2*2,maxSmo2*2,minHr,maxHr];

    if(rangeArr[0]<rangeArr[2]){
        var y2start = rangeArr[0]-4;
        var y1start = ((rangeArr[0]-4)/2).toFixed(0);
    }else{
        var y2start = rangeArr[2]-4;
        var y1start = ((rangeArr[2]-4)/2).toFixed(0);
    }

    if(rangeArr[1]>rangeArr[3]){
        var y2end = rangeArr[1]+4;
        var y1end = ((rangeArr[1]+4)/2).toFixed(0);
    }else{
        var y2end = rangeArr[3]+4;
        var y1end = ((rangeArr[3]+4)/2).toFixed(0);
    }

    if (y1start <= 0) {
        y1start = 0;
    }
    if (y2start <= 0) {
        y2start = 0;
    }

    var splitNumber1 = ((y1end - y1start)/5);
    var splitNumber2 = ((y2end - y2start)/5);

    setEchartsOption1(y1start,y1end,y2start,y2end,hintArr);

     function setEchartsOption1(y1start,y1end,y2start,y2end,hintArr){
        var mixchart = echarts.init(document.getElementById('echarts_mix1'));
        mixchart.setOption({
            tooltip: {
                show:false,
                trigger: 'axis',
            },
            animation:false,
            grid:{
                top:40,
                bottom:30,
                left:28,
                right:35
            },
            xAxis: [
                {
                    type: 'category',
                    data: chartXData,
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
                    interval:splitNumber1,
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
                        show:true,
                        lineStyle:{
                            type: 'dashed'
                        }
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
                        fontSize:14
                    }
                },
                {
                    type: 'value',
                    name: '(bpm)心率',
                    min: y2start,
                    max: y2end,
                    interval:splitNumber2,
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
                        fontSize:14
                    }
                }
            ],
            series: [
                {
                    name: '肌氧',
                    type: 'line',
                    data: chartY1Data,
                    symbol:'circle',
                    symbolSize:[8,8],
                    itemStyle: {
                        normal: {
                            color: '#009CAA'
                        }
                    }
                },
                {
                    name:'心率',
                    type:'line',
                    yAxisIndex: 1,
                    symbol:'diamond',
                    symbolSize:[10,10],
                    data: chartY2Data,
                    itemStyle: {
                        normal: {
                            color: '#F47D00'
                        }
                    },
                    markLine : {
                        data :hintArr,
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
            ]
        });
    }
}
function setEcharts4(data){
    var chartX1Data = data.xAxis;
    var chartY1Data = data.y1Axis;
    var chartY2Data = data.y2Axis;

    var mixchart3 = echarts.init(document.getElementById('echarts_mix3'));
        mixchart3.setOption({
        tooltip: {
            trigger: 'axis',
            show:false
        },
        toolbox: {
            show:false
        },
        animation:false,
        grid:{
            top:40,
            bottom:30,
            left:28,
            right:35
        },
        xAxis: [
            {
                type: 'category',
                data: chartX1Data,
                boundaryGap: false,
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
                    show:false,
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
                    fontSize:14
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
                    show:true,
                    lineStyle:{
                        type:'dashed'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine:{
                    lineStyle: {
                        color: '#C5C5C5',
                        width:2,
                    }
                },
                nameTextStyle:{
                    color:'#F47D00',
                    fontSize:14
                }
            }
        ],
        series: [
            {
                name: '肌氧恢复',
                type: 'line',
                data: chartY1Data,
                symbol:'circle',
                symbolSize:[8,8],
                itemStyle: {
                    normal: {
                        color: '#009CAA',
                    }
                }
            },
            {
                name:'心率恢复',
                type:'line',
                yAxisIndex: 1,
                data: chartY2Data,
                itemStyle: {
                    normal: {
                        color: '#F47D00'
                    }
                },
                lineStyle:{
                    normal:{
                        type:'dashed'
                    }
                }
            }
        ]
    });
   window.print();
}
