import './components/httpRequest';
import './components/dataFormat';

$(function(){
    var user=window.localStorage.getItem("usery");
    var data = JSON.parse(user);

    $('.head-portrait').find('img').attr('src',data.icon_url);
    $('.userinfo-detail-list li').eq(0).find('p').text(data.id);
    $('.userinfo-detail-list li').eq(1).find('p').text(data.nick_name);
    $('.userinfo-detail-list li').eq(2).find('p').text(window.formatSex(data.sex));
    $('.userinfo-detail-list li').eq(3).find('p').text(window.nullFormat(data.age));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.cityNullFormat(data.province)+window.cityNullFormat(data.city));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.nullFormat(data.height)+'cm');
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(data.weight)+'kg');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.cutTimeUntilSeconds(data.last_upload_time));
    $('.userinfo-detail-list li').eq(9).find('p').text(window.nullFormat(data.register_time));
    var datas = window.localStorage.getItem("datay");
    var exercise_data = JSON.parse(datas);

    if(exercise_data.bluetoothName===null){
        $('.device-number').text('硬件设备编号:--');
    }else{
        $('.device-number').text('硬件设备编号:'+exercise_data.bluetoothName);
    }

    $('.head-data').text(window.cutTime(exercise_data.startDate)+' '+ sportTypeFormat(exercise_data.type));
    $(".start-Date").text(exercise_data.startTime);
    $(".continue-dada").text(exercise_data.continuedTime);
    $(".max-oxygen").text(exercise_data.maxVo2);
    $(".aerobic-capacity p").eq(0).find('i').text(exercise_data.vo2Conclusion);
    $(".aerobic-power").text(exercise_data.metValue);
    $(".aerobic-capacity p").eq(1).find('i').text(exercise_data.metConclusion);
    var cartogram = window.localStorage.getItem("cartogram");
    var cartogram_data = JSON.parse(cartogram);
    $(".average-value").text(cartogram_data.avgHr+'\n '+ "bpm");
    $('.max-value').text(cartogram_data.maxHr +'\n'+ 'bpm');

    window.maxHrHint = (parseInt(cartogram_data.limitHeart)*0.85).toFixed(0);

    window.minSmo2 = cartogram_data.minSmo2;
    window.maxSmo2 = cartogram_data.maxSmo2;
    window.minHr = cartogram_data.minHr;
    window.maxHr = cartogram_data.maxHr;

    var riskNote = window.localStorage.getItem("riskNote");
    var riskNote_data = JSON.parse(riskNote);

    if(riskNote_data.length ==0){
        $('.risk-hint-list').text('无');
    }else{
        for(var i=0;i<riskNote_data.length;i++){
            if(riskNote_data[i].type==0){
                var item = '<li><span>'+ riskNote_data[i].time +'</span>'+
                        '<i class="red">' + riskNote_data[i].hint +'</i></li>';
                $('.risk-hint-list').append(item);
            }else{
                var item = '<li><span>'+ riskNote_data[i].time +'</span>'+
                        '<i>'+riskNote_data[i].hint+'</i></li>';
                $('.risk-hint-list').append(item);
            }
        }
    }
    var reportInterpretation = window.localStorage.getItem('report');
    if(reportInterpretation!='null'){
        $('.report-content').text(reportInterpretation);
    }
    setEchartsData(cartogram_data);
});
function sportTypeFormat(num){
    var typeStr = ['其他','跑步','骑行','步行','健身房','篮球','足球','乒乓球','羽毛球','排球','轮滑','滑雪','攀岩','划艇','网球','拳击','毽球'];
    return typeStr[num];
};



function setEchartsData(data){
    var chartXData = data.xAxis;
    var chartY1Data = data.y1Axis;
    var chartY2Data = data.y2Axis;
    var chartMarkData1 = data.notePoints;
    var chartMarkData2 = data.riskPoints;
    var chartMarkDataArr1 = [];
    var chartMarkDataArr2 = [];

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

    for(var i=0;i<chartMarkData1.length;i++){
        var markItem = [{coord:[chartMarkData1[i],y1start],symbol:'none'},{coord:[chartMarkData1[i],y1end],symbol:'none'}];
        chartMarkDataArr1.push(markItem);
    }
    for(var j=0;j<chartMarkData2.length;j++){
        var markItem2 = [{coord:[chartMarkData2[j],y2start],symbol:'none'},{coord:[chartMarkData2[j],y2end],symbol:'none'}];
        chartMarkDataArr2.push(markItem2);
    }

    var hintItem = {
        yAxis:maxHrHint,
        lineStyle: {
            normal: {
                type: 'solid',
                color: 'red'
            }
        }
    };

    chartMarkDataArr2.push(hintItem);


    setEchartsOption1(chartXData,chartY1Data,chartY2Data,chartMarkDataArr1,chartMarkDataArr2,y1start,y1end,y2start,y2end,splitNumber1,splitNumber2);
}

function setEchartsOption1(chartXData,chartY1Data,chartY2Data,chartMarkDataArr1,chartMarkDataArr2,y1start,y1end,y2start,y2end,splitNumber1,splitNumber2){

    var mixchart = echarts.init(document.getElementById('echarts_mix1'));
    mixchart.setOption({
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
            left:40,
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
                min: y1start, //0
                max: y1end,  //200
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
                    fontSize:14
                }
            }
        ],
        series: [
            {
                name: '肌氧',
                type: 'line',
                symbol:'circle',
                symbolSize:[8,8],
                data: chartY1Data,
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
                    data: chartMarkDataArr1
                }
            },
            {
                name:'心率',
                type:'line',
                symbol:'diamond',
                symbolSize:[10,12],
                yAxisIndex: 1,
                data: chartY2Data,
                itemStyle: {
                    normal: {
                        color: '#F47D00'
                    }
                },
                markLine: {
                    symbol:['none','image://../../img/tuli3@3x.png'],
                    symbolSize: [15, 15],
                    silent:true,
                    label:{
                        normal:{
                            show:false
                        }
                    },
                    itemStyle:{
                        normal:{
                            color:'#ff0000'
                        }
                    },
                    data: chartMarkDataArr2
                }
            }
        ]
    });
   window.print();
}
