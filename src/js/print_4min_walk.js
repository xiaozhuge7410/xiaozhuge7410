import './components/httpRequest';
import './components/dataFormat';

$(function(){
    var user = window.localStorage.getItem('user');
    var user_data = JSON.parse(user);
    $('.head-portrait').find('img').attr('src',user_data.icon_url);
    $('.userinfo-detail-list li').eq(0).find('p').text(user_data.id);
    $('.userinfo-detail-list li').eq(1).find('p').text(user_data.nick_name);
    $('.userinfo-detail-list li').eq(2).find('p').text(window.formatSex(user_data.sex));
    $('.userinfo-detail-list li').eq(3).find('p').text(window.nullFormat(user_data.age));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.cityNullFormat(user_data.province)+window.cityNullFormat(user_data.city));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.nullFormat(user_data.height)+'cm');
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(user_data.weight)+'kg');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(user_data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.cutTimeUntilSeconds(user_data.last_upload_time));
    $('.userinfo-detail-list li').eq(9).find('p').text(window.nullFormat(user_data.register_time));
    $('.userinfo-remark').find('p').text(window.nullFormat(user_data.remarks));

    var aerobic = window.localStorage.getItem('aerobic');
    var aerobic_data = JSON.parse(aerobic);

    if(aerobic_data.bluetoothName===null){
        $('.device-number').text('硬件设备编号:--');
    }else{
        $('.device-number').text('硬件设备编号:'+aerobic_data.bluetoothName);
    }


    $('.head-data').text(window.cutTime(aerobic_data.startDate));
    $('.reportinfo-remark').find('p').text(window.nullFormat(aerobic_data.reportRemarks));
    $('.report-remarks').val(aerobic_data.reportRemarks);

    //有氧能力部分
    $('.smxo2-summary span:first').text(aerobic_data.metValue);
    $('.smxo2-summary span.exdata-eva').text(aerobic_data.metValueDescription);

    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(0).find('h3').text(aerobic_data.startTime);
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(1).find('h3').text(aerobic_data.benchmarkLevel);
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(2).find('h3').text(window.nullFormat(aerobic_data.warmupDuration));
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(3).find('h3').text(aerobic_data.continuedTime);
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(4).find('h3').text(aerobic_data.finalHeart+'bpm');

    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(5).find('h3').text(aerobic_data.firstStageSpeed+'km/h');
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(6).find('h3').text(zeroFormat(aerobic_data.secondStageSpeed)+'km/h');
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(7).find('h3').text(zeroFormat(aerobic_data.thirdStageSpeed)+'km/h');
    $('.exdata-summary>li').eq(1).find('.exdata-summary-allin li').eq(8).find('h3').text(zeroFormat(aerobic_data.fourthStageSpeed)+'km/h');

    $('.four-speed li').eq(0).find('b').text(aerobic_data.firstStageSpeed+'km/h');
    $('.four-speed li').eq(1).find('b').text(zeroFormat(aerobic_data.secondStageSpeed)+'km/h');
    $('.four-speed li').eq(2).find('b').text(zeroFormat(aerobic_data.thirdStageSpeed)+'km/h');
    $('.four-speed li').eq(3).find('b').text(zeroFormat(aerobic_data.fourthStageSpeed)+'km/h');

    //测试评价部分
    $('.ability-list>li').eq(0).find('.ability-bar').addClass(levelEvaluate(aerobic_data.vo2MaxLevel));
    $('.ability-list>li').eq(0).find('.ability-detail .ability-vo2max').text(aerobic_data.vo2Max);
    $('.ability-list>li').eq(0).find('.ability-detail p').text(aerobic_data.vo2MaxDescription);
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

    var reportInterpretation = window.localStorage.getItem('report');
    if(reportInterpretation!='null'){
        $('.report-content').text(reportInterpretation);
    }

});
function zeroFormat(num){
    if(num===0){
        return '--';
    }else{
        return num
    }
};
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
};
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
};
function riskImg(num){
    if(num<=0){
        return '../../img/riskup@2x.png';
    }
    if(num>0){
        return '../../img/riskdown@2x.png';
    }else{
        return '';
    }
};
function riskText(text){
    if(text !=null || text!= undefined){
        return (text*100).toFixed(0).toString().replace('-','');
    }else{
        return '--'
    }
};
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
};
function init(){
        var muscle = window.localStorage.getItem('muscle');
        var muscle_date = JSON.parse(muscle);
        $('.smo2-stats ul li').eq(0).find('.stat').text(muscle_date.avgSmo2);
        $('.smo2-stats ul li').eq(1).find('.stat').text(muscle_date.minSmo2);


        $('.stats-ct ul li').eq(2).find('.stat').text(muscle_date.avgHeart);
        $('.stats-ct ul li').eq(3).find('.stat').text(muscle_date.maxHeart);


        var chartXData = muscle_date.xAxis;
        var chartY1Data = muscle_date.y1Axis;
        var chartY2Data = muscle_date.y2Axis;

    var maxHrHint = (parseInt(muscle_date.limitHeart)*0.85).toFixed(0);
    var hintArr = [];
    var hintItem = {xAxis:0,yAxis:maxHrHint};
    hintArr.push(hintItem);

    var minSmo2 = Math.min.apply(null,chartY1Data);
    var maxSmo2 = Math.max.apply(null,chartY1Data);
    var minHr = Math.min.apply(null,chartY2Data);
    var maxHr = Math.max.apply(null,chartY2Data);

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

    var stage1Arr = [];
    var stage2Arr = [];
    var stage3Arr = [];
    var stage4Arr = [];

    for(var i=0;i<chartY1Data.length;i++){
        if(window.timeToseconds(chartXData[i])<=240){
            stage1Arr.push(chartXData[i]);
        }else if(window.timeToseconds(chartXData[i])>240&&window.timeToseconds(chartXData[i])<=480){
            stage2Arr.push(chartXData[i]);
        }else if(window.timeToseconds(chartXData[i])>480&&window.timeToseconds(chartXData[i])<=720){
            stage3Arr.push(chartXData[i]);
        }else if(window.timeToseconds(chartXData[i])>720&&window.timeToseconds(chartXData[i])<=960){
            stage4Arr.push(chartXData[i]);
        }
    }

    // var endTime = window.timeToseconds(chartXData[chartXData.length-1]);

    var stage1Percent = ((stage1Arr.length/chartXData.length)*100).toFixed(0);
    var stage2Percent = ((stage2Arr.length/chartXData.length)*100).toFixed(0);
    var stage3Percent = ((stage3Arr.length/chartXData.length)*100).toFixed(0);
    var stage4Percent = ((stage4Arr.length/chartXData.length)*100).toFixed(0);



    $('.stage-line ul li').eq(0).css({'width':stage1Percent+'%'}).show();
    if(stage2Percent>0){
        $('.stage-line ul li').eq(1).css({'width':stage2Percent+'%'}).show();
    }
    if(stage3Percent>0){
        $('.stage-line ul li').eq(2).css({'width':stage3Percent+'%'}).show();
    }
    if(stage4Percent>0){
        $('.stage-line ul li').eq(3).css({'width':stage4Percent+'%'}).show();
    }


    setEchartsOption1(y1start,y1end,y2start,y2end);


    function setEchartsOption1(y1start,y1end,y2start,y2end){
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
                left:35,
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
                    interval:splitNumber1,
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
                    interval:splitNumber2,
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
                        fontSize:10
                    }
                },
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
       window.print();
    }
}
init();
