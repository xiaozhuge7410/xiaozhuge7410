import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

new Vue({
    el: '#app',
    data:{
        stats:{
            totalPeople: [],
            sex: [
                {
                    sex:0,
                    count:0
                },{
                    sex:1,
                    count:0
                }
            ],
            age: [],
            metDistribution: [],
            metChange:[],
            weightChange: [],
            bloodSugarChange: [],
            reportStats: [],
            joinFourMinTimes: [],
            testStage: []
        },
        sexPercent:[0,0],
        metDistributionPercent:[0,0,0],
        metChangePercent:[0,0,0],
        weightChangePercent:[0,0,0],
        bloodSugarChangePercent:[0,0,0],
        sexShow:true,
        metChangeShow:true,
        weightChangeShow:true,
        bloodSugarChangeShow:true
    },
    methods: {
        getData:function(){
            var _this = this;
            var uuid = window.localStorage.getItem('uidClinic');
            var token = window.localStorage.getItem('utClinic');
            var requestData = {
                userId:uuid
            };
            $.ajax({
                url:window.urlHandler('statistical/getData',uuid,token),
                method : 'post',
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify(requestData)
            }).done(function(res){
                if(res.status == 200){
                    _this.stats = res.data;
                    _this.handleCharts();
                }
                window.dataErrorHandler(res);
            }).fail(function(err){
                swal({
                    title:'提示',
                    text: '请求失败！',
                    type: 'info',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        },
        handleCharts:function(){
            this.createSexChart();
            this.createAgeChart();
            this.createAerobicDistributionChart();
            this.createMetChangeChart();
            this.createWeightChangeChart();
            this.createMbgChangeChart();
            this.createJoinInChart();
            this.createTestStageChart();
        },
        // 性别图表
        createSexChart:function(){
            var total = this.stats.sex[0].count+this.stats.sex[1].count;
            if(total>0){
                this.sexPercent[0] = ((this.stats.sex[0].count/total)*100).toFixed(1);
                this.sexPercent[1] = ((this.stats.sex[1].count/total)*100).toFixed(1);
                this.sexChart = new Highcharts.Chart({
                    chart: {
                        renderTo:'sex-chart',
                        spacing : 5
                    },
                    credits:{
                        enabled:false
                    },
                    title: {
                        floating:true,
                        text: '总数',
                        style:{
                            "fontSize": "16px"
                        }
                    },
                    subtitle:{
                        floating:true,
                        text: total+'人',
                        style:{
                            "fontSize": "16px",
                            "color":"#000"
                        }
                    },
                    tooltip: {
                        headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                        useHTML:true,
                        pointFormat: '<p style="margin:0;">比例: {point.percentage:.1f}%</p><p style="margin:0;">人数: {point.y}人</p>'
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '70%',
                        name: '性别',
                        borderWidth:0,
                        colors:['#5B99CF','#ED737B'],
                        data: [
                            {name:'男',y: this.stats.sex[1].count},
                            {name:'女',y: this.stats.sex[0].count},
                        ]
                    }]
                }, function(c) {
                    // 环形图圆心
                    var centerY = c.series[0].center[1],
                        titleHeight = parseInt(c.title.styles.fontSize);
                    c.setTitle({
                        y:centerY - titleHeight/2
                    },{
                        y:centerY + titleHeight/2 + 6
                    });
                    this.sexChart = c;
                });
            }else{
                this.sexShow = false;
            }
        },
        // 年龄图表
        createAgeChart:function(){
            var y = this.stats.age;
            var max = (Math.max.apply(null,y)/0.8).toFixed(0);
            if(max<10){
                max = 10;
            }
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            this.ageChart =new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo:'age-chart',
                    spacing:[5,0,0,0]
                },
                title: {
                    text: '人数',
                    align:'left',
                    style:{
                        "fontSize":"12px",
                        "fontWeight":"400"
                    }
                },
                credits:{
                    enabled:false
                },
                legend:{
                    enabled:false
                },
                xAxis: {
                    tickWidth:0,
                    lineColor:'#B6B6B6',
                    categories: ['20岁以下','20-29岁','30-39岁','40-49岁','50-59岁','60岁以上'],
                    labels:{
                        style:{
                            "color":"#4E4E4E",
                            "fontSize":"12px"
                        }
                    }
                },
                yAxis: {
                    lineWidth:1,
                    lineColor:'#B6B6B6',
                    min: 0,
                    max:max,
                    tickPositions: [0, Math.round(max/5), Math.round(max/5*2), Math.round(max/5*3), Math.round(max/5*4),Math.round(max)],
                    gridLineDashStyle:'dash',
                    gridLineColor:'#DEDEE0',
                    title: {
                        text: null
                    },
                    labels:{
                        style:{
                            "color":"#4E4E4E",
                            "fontSize":"12px",
                        }
                    }
                },
                tooltip: {
                    headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                    pointFormatter:function(){
                        var str = '<p style="margin:0;">人数:'+this.y+'人</p><p style="margin:0;">占比: '+(this.y/sum*100).toFixed(1)+'%</p>';
                        return str;
                    },
                    useHTML: true
                },
                series: [{
                    name: '人数',
                    color:'#89BAE4',
                    data: y
                }]
            });
        },
        // 有氧能力区间图表
        createAerobicDistributionChart:function(){
            var y = this.stats.metDistribution;
            var max = (Math.max.apply(null,y)/0.8).toFixed(0);
            if(max<10){
                max = 10;
            }
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            this.metDistributionPercent = [((this.stats.metDistribution[0]/sum)*100).toFixed(1),((this.stats.metDistribution[1]/sum)*100).toFixed(1),((this.stats.metDistribution[2]/sum)*100).toFixed(1)];
            this.aerobicDistributionChart =new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo:'aerobic-distribution-chart',
                    spacing:[5,0,0,0]
                },
                title: {
                    text: '人数',
                    align:'left',
                    style:{
                        "fontSize":"12px",
                        "fontWeight":"400"
                    }
                },
                credits:{
                    enabled:false
                },
                legend:{
                    enabled:false
                },
                xAxis: {
                    tickWidth:0,
                    lineColor:'#B6B6B6',
                    categories: ['9MET以下','9-12MET','12MET以上'],
                    labels:{
                        style:{
                            "color":"#4E4E4E",
                            "fontSize":"12px"
                        }
                    }
                },
                yAxis: {
                    lineWidth:1,
                    lineColor:'#B6B6B6',
                    min: 0,
                    max:max,
                    tickPositions: [0, Math.round(max/5), Math.round(max/5*2), Math.round(max/5*3), Math.round(max/5*4),Math.round(max)],
                    gridLineDashStyle:'dash',
                    gridLineColor:'#DEDEE0',
                    title: {
                        text: null
                    },
                    labels:{
                        style:{
                            "color":"#4E4E4E",
                            "fontSize":"12px",
                        }
                    }
                },
                tooltip: {
                    headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                    pointFormatter:function(){
                        var str = '<p style="margin:0;">人数:'+this.y+'人</p><p style="margin:0;">占比: '+(this.y/sum*100).toFixed(1)+'%</p>';
                        return str;
                    },
                    useHTML: true
                },
                series: [{
                    name: '人数',
                    color:'#44BEBA',
                    data: y
                }]
            });
        },
        // met值变化图表
        createMetChangeChart:function(){
            var y = this.stats.metChange;
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            if(sum>0){
                this.metChangePercent = [((this.stats.metChange[0]/sum)*100).toFixed(1),((this.stats.metChange[1]/sum)*100).toFixed(1),((this.stats.metChange[2]/sum)*100).toFixed(1)];

                this.metChangeChart = new Highcharts.Chart({
                    chart: {
                        renderTo:'met-change-chart',
                        spacing : 5
                    },
                    credits:{
                        enabled:false
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                        useHTML:true,
                        pointFormat: '<p style="margin:0;">比例: {point.percentage:.1f}%</p><p style="margin:0;">人数: {point.y}人</p>'
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            events: {
                                click: function (e) {
                                    window.location.href = e.point.url;
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '70%',
                        name: '有氧能力',
                        borderWidth:0,
                        colors:['#BBCFE1','#6893BB','#316AA0'],
                        data: [
                            {name:'有氧能力降低',y: y[0],url:'./info_statistics.html?metChange=1'},
                            {name:'有氧能力提高',y: y[1],url:'./info_statistics.html?metChange=2'},
                            {name:'有氧能力变化不明显',y: y[2],url:'./info_statistics.html?metChange=3'}
                        ]
                    }]
                });
            }else{
                this.metChangeShow = false;
            }

        },
        // 体重变化图表
        createWeightChangeChart:function(){
            var y = this.stats.weightChange;
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            if(sum>0){
                this.weightChangePercent = [((this.stats.weightChange[0]/sum)*100).toFixed(1),((this.stats.weightChange[1]/sum)*100).toFixed(1),((this.stats.weightChange[2]/sum)*100).toFixed(1)];

                this.weightChangeChart = new Highcharts.Chart({
                    chart: {
                        renderTo:'weight-change-chart',
                        spacing : 5
                    },
                    credits:{
                        enabled:false
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                        useHTML:true,
                        pointFormat: '<p style="margin:0;">比例: {point.percentage:.1f}%</p><p style="margin:0;">人数: {point.y}人</p>'
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            events: {
                                click: function (e) {
                                    window.location.href = e.point.url;
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '70%',
                        name: '体重',
                        borderWidth:0,
                        colors:['#AEDDE1','#63BDC4','#11929E'],
                        data: [
                            {name:'体重减少',y: y[0],url:'./info_statistics.html?weightChange=1'},
                            {name:'体重增加',y: y[1],url:'./info_statistics.html?weightChange=2'},
                            {name:'体重变化不明显',y: y[2],url:'./info_statistics.html?weightChange=3'}
                        ]
                    }]
                });
            }else{
                this.weightChangeShow = false;
            }

        },
        // 血糖变化图表
        createMbgChangeChart:function(){
            var y = this.stats.bloodSugarChange;
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            if(sum>0){
                this.bloodSugarChangePercent = [((this.stats.bloodSugarChange[0]/sum)*100).toFixed(1),((this.stats.bloodSugarChange[1]/sum)*100).toFixed(1),((this.stats.bloodSugarChange[2]/sum)*100).toFixed(1)];

                this.mbgChangeChart = new Highcharts.Chart({
                    chart: {
                        renderTo:'mbg-change-chart',
                        spacing : 5
                    },
                    credits:{
                        enabled:false
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                        useHTML:true,
                        pointFormat: '<p style="margin:0;">比例: {point.percentage:.1f}%</p><p style="margin:0;">人数: {point.y}人</p>'
                    },
                    plotOptions: {
                        pie: {
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: false
                            },
                            events: {
                                click: function (e) {
                                    window.location.href = e.point.url;
                                }
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        innerSize: '70%',
                        name: '血糖',
                        borderWidth:0,
                        colors:['#F5C1C1','#E77676','#DD4242'],
                        data: [
                            {name:'血糖降低',y: y[0],url:'./info_statistics.html?bloodSugarChange=1'},
                            {name:'血糖升高',y: y[1],url:'./info_statistics.html?bloodSugarChange=2'},
                            {name:'血糖变化不明显',y: y[2],url:'./info_statistics.html?bloodSugarChange=3'}
                        ]
                    }]
                });
            }else{
                this.bloodSugarChangeShow = false;
            }

        },
        // 参与人数图表
        createJoinInChart:function(){
            var y = this.stats.joinFourMinTimes;
            var max = (Math.max.apply(null,y)/0.8).toFixed(0);
            if(max<10){
                max = 10;
            }
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            this.joinInChart =new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo:'join-in-chart',
                    spacing:[5,0,0,18]
                },
                title: {
                    text: '人数',
                    align:'left',
                    style:{
                        "fontSize":"12px",
                        "fontWeight":"400"
                    }
                },
                credits:{
                    enabled:false
                },
                legend:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
                xAxis: {
                    tickWidth:0,
                    lineColor:'#B6B6B6',
                    categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','14以上'],
                    labels:{
                        style:{
                            "color":"#717171",
                            "fontSize":"12px"
                        }
                    }
                },
                yAxis: {
                    lineWidth:1,
                    lineColor:'#B6B6B6',
                    min: 0,
                    max:max,
                    tickPositions: [0, Math.round(max/5), Math.round(max/5*2), Math.round(max/5*3), Math.round(max/5*4),Math.round(max)],
                    gridLineDashStyle:'dash',
                    gridLineColor:'#DEDEE0',
                    title: {
                        text: null
                    },
                    labels:{
                        style:{
                            "color":"#717171",
                            "fontSize":"12px",
                        }
                    }
                },
                tooltip: {
                    headerFormat:'<p style="margin:0 0 10px 0;">{point.key}次</p>',
                    pointFormatter:function(){
                        var str = '<p style="margin:0;">人数:'+this.y+'人</p><p style="margin:0;">占比: '+(this.y/sum*100).toFixed(1)+'%</p>';
                        return str;
                    },
                    useHTML: true
                },
                series: [{
                    name: '人数',
                    color:'#56A3D2',
                    data: y
                }]
            });
        },
        // 测试阶段图表
        createTestStageChart:function(){
            var y = this.stats.testStage;
            var max = (Math.max.apply(null,y)/0.8).toFixed(0);
            if(max<10){
                max = 10;
            }
            var sum = 0;
            for(var i=0;i<y.length;i++){
                sum += y[i]
            }
            this.testStageChart =new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo:'test-stage-chart',
                    spacing:[10,0,5,18]
                },
                title: {
                    text: '人数',
                    align:'left',
                    style:{
                        "fontSize":"12px",
                        "fontWeight":"400"
                    }
                },
                credits:{
                    enabled:false
                },
                legend:{
                    enabled:false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}'
                        }
                    }
                },
                xAxis: {
                    tickWidth:0,
                    lineColor:'#B6B6B6',
                    categories: ['筛选测试阶段0周','筛选测试阶段2周','筛选测试阶段4周','试验测试阶段0周','试验测试阶段2周','试验测试阶段4周','试验测试阶段6周','试验测试阶段8周','试验测试阶段10周','试验测试阶段12周','试验测试阶段14周','试验测试阶段16周','试验测试阶段18周','试验测试阶段20周','试验测试阶段22周','试验测试阶段24周'],
                    labels:{
                        rotation:-50,
                        style:{
                            "color":"#717171",
                            "fontSize":"12px"
                        }
                    }
                },
                yAxis: {
                    lineWidth:1,
                    lineColor:'#B6B6B6',
                    min: 0,
                    max:max,
                    tickPositions: [0, Math.round(max/5), Math.round(max/5*2), Math.round(max/5*3), Math.round(max/5*4),Math.round(max)],
                    gridLineDashStyle:'dash',
                    gridLineColor:'#DEDEE0',
                    title: {
                        text: null
                    },
                    labels:{
                        style:{
                            "color":"#717171",
                            "fontSize":"12px",
                        }
                    }
                },
                tooltip: {
                    headerFormat:'<p style="margin:0 0 10px 0;">{point.key}</p>',
                    pointFormatter:function(){
                        var str = '<p style="margin:0;">人数:'+this.y+'人</p><p style="margin:0;">占比: '+(this.y/sum*100).toFixed(1)+'%</p>';
                        return str;
                    },
                    useHTML: true
                },
                series: [{
                    name: '人数',
                    color:'#67BFC6',
                    data: y
                }]
            });
        }

    },
    created:function(){
        this.getData();
    },
    mounted:function(){

    }
});
