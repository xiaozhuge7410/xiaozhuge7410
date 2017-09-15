import './components/httpRequest';
import './components/dataFormat';
$(function(){
    var userInfo = window.localStorage.getItem("userInfo");
    var userInfo_data = JSON.parse(userInfo);
    $('.head-portrait').find('img').attr('src',userInfo_data.icon_url);
    $('.userinfo-detail-list li').eq(0).find('p').text(userInfo_data.id);
    $('.userinfo-detail-list li').eq(1).find('p').text(userInfo_data.nick_name);
    $('.userinfo-detail-list li').eq(2).find('p').text(window.formatSex(userInfo_data.sex));
    $('.userinfo-detail-list li').eq(3).find('p').text(window.nullFormat(userInfo_data.age));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.cityNullFormat(userInfo_data.province)+window.cityNullFormat(userInfo_data.city));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.nullFormat(userInfo_data.height)+'cm');
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(userInfo_data.weight)+'kg');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(userInfo_data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.cutTimeUntilSeconds(userInfo_data.last_upload_time));
    $('.userinfo-detail-list li').eq(9).find('p').text(window.nullFormat(userInfo_data.register_time));
    $('.userinfo-remark').find('p').text(window.nullFormat(userInfo_data.remarks));

    var aerobic = window.localStorage.getItem("aerobic");
    var aerobic_data = JSON.parse(aerobic);

    if(aerobic_data.bluetoothName===null){
        $('.device-number').text('硬件设备编号:--');
    }else{
        $('.device-number').text('硬件设备编号:'+aerobic_data.bluetoothName);
    }

    $('.head-data').text(window.cutTime(aerobic_data.startDate)); //时间
    //有氧能力部分
    $('.smxo2-summary span:first').text(aerobic_data.metValue);
    $('.smxo2-summary span.exdata-eva').text(aerobic_data.metValueDescription);
    $('.exdata-summary-allin li').eq(0).find('h3').text(aerobic_data.startTime);
    $('.exdata-summary-allin li').eq(1).find('h3').text(aerobic_data.benchmarkLevel);
    $('.exdata-summary-allin li').eq(2).find('h3').text(aerobic_data.continuedTime);
    $('.exdata-summary-allin li').eq(3).find('h3').text(aerobic_data.avgSpeed+'km/h');
    $('.exdata-summary-allin li').eq(4).find('h3').text(aerobic_data.finalHeart+'bpm');
    //测试评价部分
    $('.ability-list>li').eq(0).find('.ability-bar').addClass(levelEvaluate(aerobic_data.vo2MaxLevel));
    $('.ability-list>li').eq(0).find('.ability-detail .ability-vo2max').text(aerobic_data.vo2Max);
    $('.ability-list>li').eq(0).find('.ability-detail p').text(aerobic_data.vo2MaxDescription);

    //重大风险
    $('.risk-bar').addClass(riskEvaluate(aerobic_data.riskLevel));
    $('.risk-summary-detail .high-or-low').text(highOrLow(aerobic_data.sportRiskRate));

    if(aerobic_data.sportRiskRate>=0){
        $('.risk-bar i').addClass('green');
    }else{
        $('.risk-bar i').addClass('red');
    }

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
function levelEvaluate(num){
    var numArr = [-2,-1,0,1,2,3];
    var evaArr = ['awful','bad','none','average','good','excellent'];
    for(var i=0;i<numArr.length;i++){
        if(num == numArr[i]){
            return evaArr[i];
        }
    }
}
 function levelEvaluate(num){
    var numArr = [-2,-1,0,1,2,3];
    var evaArr = ['awful','bad','none','average','good','excellent'];
    for(var i=0;i<numArr.length;i++){
        if(num == numArr[i]){
            return evaArr[i];
        }
    }
};
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
};
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
    var muscle = window.localStorage.getItem("muscle");
    var muscle_data  = JSON.parse(muscle);
    var chartXData = muscle_data.xAxis;
    var chartY1Data = muscle_data.y1Axis;
    var chartY2Data = muscle_data.y2Axis;


    var maxHrHint = (parseInt(muscle_data.limitHeart)*0.85).toFixed(0);
    var hintArr = [];
    var hintItem = {xAxis:0,yAxis:maxHrHint};
    hintArr.push(hintItem);

    var minSmo2 = muscle_data.minSmo2;
    var maxSmo2 = muscle_data.maxSmo2;
    var minHr = muscle_data.minHeart;
    var maxHr = muscle_data.maxHeart;

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

    setEchartsOption1(y1start,y1end,y2start,y2end);
    function setEchartsOption1(y1start,y1end,y2start,y2end){
        var mixchart = echarts.init(document.getElementById('echarts_mix1'));
            mixchart.setOption({
            tooltip: {
                show:false,
                trigger: 'axis',
            },
            grid:{
                top:40,
                bottom:30,
                left:35,
                right:35
            },
            animation:false,
            xAxis: [
                {
                    type: 'category',
                    data:chartXData,
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
                        showMinLabel:true
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
       window.print();
    }
}
init();

