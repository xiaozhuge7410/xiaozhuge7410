webpackJsonp([11],{0:function(e,t){function i(){this.init()}i.prototype={init:function(){this.domRender(),this.bindEvent()},domRender:function(){var e=window.localStorage.getItem("localSidebarDom"),t=window.localStorage.getItem("localheaderDom");null==e?(this.sidebarDomRender(),this.locationSetActive()):($(".page-sidebar-wrapper").html(""),$(e).appendTo(".page-sidebar-wrapper"),$(".page-sidebar").hasClass("closed")?$(".page-content").addClass("open"):$(".page-content").removeClass("open"),this.locationSetActive()),null==t?this.headerDomRender():($(".page-header").html(""),$(t).appendTo(".page-header")),this.footerDomRender()},headerDomRender:function(){$('<div class="page-header-inner "><div class="page-logo"><a href="../report/common.html"><img src="../../img/logo.png" alt="logo" class="logo-default"></a><div class="menu-toggler"><i class="fa fa-bars" style="color:#fff;font-size:2rem;"></i></div></div><div class="build-version">科研版</div><div class="welcome-func"><ul class="welcome-func-list"><li class="welcome-user"><img alt="" class="welcome-userimg img-circle" src="../../img/avatar_default.png"><span class="welcome-username"></span><ul class="welcome-user-menu"><li><i class="fa fa-question-circle"></i><a href="#">帮助</a></li><li class="logout-btn"><i class="fa fa-sign-out"></i><a href="../login.html">登出</a></li></ul></li></ul></div></div>').appendTo(".page-header"),this.getWelcomeInfo()},sidebarDomRender:function(){for(var e=[{icon:"icon-bar-chart",title:"运动报告管理",link:"#",permission:[1,2,3],childItem:[{link:"../report/common.html",title:"常规运动报告"},{link:"../report/aerobic.html",title:"515有氧能力测试报告"},{link:"../report/rockport.html",title:"Rockport测试报告"},{link:"../report/4min_walk.html",title:"跑步机四分钟走测试报告"}]},{icon:"icon-users",title:"客户管理",link:"#",permission:[1,2,3],childItem:[{link:"../customer/info.html",title:"客户信息"}]},{icon:"icon-pie-chart",title:"数据统计",link:"#",permission:[2],childItem:[{link:"../stats/stats.html",title:"数据统计报告"}]}],t=parseInt(window.localStorage.getItem("auClinic")),i=0;i<e.length;i++)if(-1!=e[i].permission.indexOf(t)){for(var a="",o=0;o<e[i].childItem.length;o++)a=a+'<li class="nav-item"><a href="'+e[i].childItem[o].link+'" class="nav-link "><span class="title">'+e[i].childItem[o].title+"</span></a></li>";if(0==e[i].childItem.length)var r='<li class="nav-item"><a href="'+e[i].link+'" class="nav-link nav-toggle"><i class="'+e[i].icon+'"></i><span class="title">'+e[i].title+"</span></a></li>";else var r='<li class="nav-item"><a href="'+e[i].link+'" class="nav-link nav-toggle"><i class="'+e[i].icon+'"></i><span class="title">'+e[i].title+'</span><span class="arrow"></span></a><ul class="sub-menu">'+a+"</ul></li>";$(r).appendTo(".page-sidebar-menu")}window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())},footerDomRender:function(){$('<div class="page-footer-inner">2016 &copy; 加动健康科技（深圳）有限公司</div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>').appendTo(".page-footer")},getWelcomeInfo:function(){var e=window.localStorage.getItem("userImgUrlClinic"),t=window.localStorage.getItem("userNickNameClinic");"undefined"==e||"null"==e?$(".welcome-userimg").attr("src","../../img/avatar_default.png"):$(".welcome-userimg").attr("src",e),"undefined"==t||"null"==t?$(".welcome-username").text("管理员"):$(".welcome-username").text(t)},bindEvent:function(){$(".page-sidebar-menu>li>a").on("click",function(e){e.preventDefault()}),$(".page-sidebar-menu>li").on("click",function(){$(this).hasClass("open")?$(this).removeClass("open"):($(".page-sidebar-menu>li").removeClass("open"),$(this).addClass("open")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-sidebar-menu>li .sub-menu>li").on("click",function(e){e.stopPropagation(),$(this).hasClass("active")||($(this).parents().find(".page-sidebar-menu>li>ul>li").removeClass("active"),$(this).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-logo .menu-toggler").on("click",function(){$(".page-sidebar").hasClass("closed")?($(".page-sidebar").removeClass("closed"),$(".page-content").removeClass("open"),$(".page-footer").removeClass("open"),$(".page-logo").removeClass("closed")):($(".page-sidebar").addClass("closed"),$(".page-content").addClass("open"),$(".page-footer").addClass("open"),$(".page-logo").addClass("closed")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html()),window.localStorage.setItem("localheaderDom",$(".page-header").html())}),$(".logout-btn").on("click",function(){window.localStorage.clear()})},locationSetActive:function(){-1!=window.location.href.indexOf("common")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("aerobic")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(1).addClass("active")),-1!=window.location.href.indexOf("rockport")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(2).addClass("active")),-1!=window.location.href.indexOf("4min_walk")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(3).addClass("active")),-1!=window.location.href.indexOf("info")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(1).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(1).find(".sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("stats")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(2).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(2).find(".sub-menu li").eq(0).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}},new i},28:function(e,t,i){e.exports=i(7)},7:function(e,t,i){"use strict";function a(){this.init()}Object.defineProperty(t,"__esModule",{value:!0});var o=i(0),r=(i.n(o),i(1)),n=(i.n(r),i(2));i.n(n);a.prototype.init=function(){null==window.localStorage.getItem("utClinic")?($("html,body").html(""),window.location.href="../login.html"):(this.requestCustomerData(),this.requestSportsData(),this.bind(),this.requestSportsDataDetail(),this.interpretation());window.localStorage.setItem("reportType1",2);var e=window.localStorage.getItem("data_recordId");"null"==e?$(".compile").show():null!=e&&$(".examine").show(),$(".unscramble").attr("disabled","disabled"),$(".page-compile").click(function(){$(".unscramble").removeAttr("disabled"),$(".page-off").show(),$(this).hide()}),$(".page-call").click(function(){$(".unscramble").attr("disabled","disabled"),$(".page-compile").show(),$(".page-off").hide(),window.history.go(0)})},a.prototype.interpretation=function(){var e=this;e.requestSportsData(),$(".page-save").click(function(){e.validator();var t=$(".unscramble").val(),i=window.localStorage.getItem("reportId"),a=window.localStorage.getItem("utClinic"),o=window.localStorage.getItem("uidClinic");$.ajax({url:window.urlHandler("motiondata/updateReportInterpretation",o,a),method:"post",data:{id:i,sportType:2,content:t},success:function(t){200==t.status&&(swal({title:"提示",text:"保存成功！",type:"success",showConfirmButton:!1,timer:2e3}),e.requestSportsData(),$(".unscramble").attr("disabled","disabled"),$(".page-off").hide(),$(".page-compile").show())}})})},a.prototype.validator=function(){return $(".unscramble").val().length>200?($(".verify-report").text("仅限200字以内"),!1):($(".verify-report").hide(),!0)},a.prototype.requestCustomerData=function(){var e=this,t=!1,i=window.localStorage.getItem("utClinic"),a=window.localStorage.getItem("uidClinic"),o=window.localStorage.getItem("customerUUID");t||(t=!0,$.ajax({url:window.urlHandler("customer/findByCustomerUuid",a,i),method:"post",data:{customerId:o}}).done(function(i){if(200==i.status){e.renderInfo(i.datas.userInfo);var a=i.datas.userInfo;a=JSON.stringify(a),window.localStorage.setItem("personage",a)}t=!1}).fail(function(e){t=!1}))},a.prototype.requestSportsData=function(){var e=this,t=!1,i=window.localStorage.getItem("utClinic"),a=window.localStorage.getItem("uidClinic"),o=window.localStorage.getItem("reportId"),r="aerobic/aerobicData/"+o;t||(t=!0,$.ajax({url:window.urlHandler(r,a,i),method:"post",data:{}}).done(function(i){if(200==i.status){e.renderData(i.datas);var a=i.datas;a=JSON.stringify(a),window.localStorage.setItem("aerobic",a);var o=i.datas.reportInterpretation;null!=o&&$(".unscramble").text(o),window.localStorage.setItem("report",o)}t=!1,window.dataErrorHandler(i)}).fail(function(e){t=!1}))},a.prototype.requestSportsDataDetail=function(){var e=this,t=!1,i=window.localStorage.getItem("utClinic"),a=window.localStorage.getItem("uidClinic"),o=window.localStorage.getItem("reportId"),r="aerobic/aerobicData/"+o+"/detail";t||(t=!0,$.ajax({url:window.urlHandler(r,a,i),method:"post",data:{}}).done(function(i){if(200==i.status){e.setEchartsData1(i.datas.muscleHeartRateInfo);var a=i.datas;a=JSON.stringify(a),window.localStorage.setItem("chart",a),e.setEcharts2(i.datas.sportSmo2Info),e.setEcharts3(i.datas.sportStageInfo);var o=i.datas.sportStageInfo;o=JSON.stringify(o),window.localStorage.setItem("sport",o),e.setEcharts4(i.datas.muscleHeartRateRecoverInfo);var r=i.datas.muscleHeartRateRecoverInfo;r=JSON.stringify(r),window.localStorage.setItem("muscle",r)}t=!1,window.dataErrorHandler(i)}).fail(function(e){t=!1}))},a.prototype.bind=function(){var e=this;$('a[data-toggle="tab"]').on("shown.bs.tab",function(t){"数据详情"==t.target.innerText&&e.requestSportsDataDetail()}),$(".change-y-btn").on("click",function(){var t=$(".smo2-start").val(),i=$(".smo2-end").val(),a=$(".hr-start").val(),o=$(".hr-end").val();""!=t&&""!=i&&""!=a&&""!=o||($(".type-error-alert").text("请输入正确完整的数值范围！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)),""==t&&""==i&&""==a&&""==o||(i==t||a==o?($(".type-error-alert").text("请输入正确完整的数值范围！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)):parseInt(i)<parseInt(t)||parseInt(o)<parseInt(a)?($(".type-error-alert").text("终止值不能小于起始值，请修改！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)):($("#myModal").modal("hide"),e.setEchartsOption1(t,i,a,o)))}),$(".reset-y-btn").on("click",function(){$(".smo2-start").val(""),$(".smo2-end").val(""),$(".hr-start").val(""),$(".hr-end").val(""),$("#myModal").modal("hide"),e.setEchartsOption1(0,100,0,200)}),$(".rewrite-report-remarks-btn").on("click",function(){var t=window.localStorage.getItem("utClinic"),i=window.localStorage.getItem("uidClinic"),a=window.localStorage.getItem("reportId"),o=$(".report-remarks").val();$.ajax({url:window.urlHandler("motiondata/addSportRemarks",i,t),method:"POST",data:{sportType:1,uuid:a,content:o}}).done(function(t){200==t.status?(e.requestSportsData(),$("#rewriteModal").modal("hide"),swal({title:"提示",text:"保存成功！",type:"success",showConfirmButton:!1,timer:2e3})):($(".rewrite-error-alert").text("服务器解析错误，请稍后再试！"),$(".rewrite-error-alert").fadeIn(),setTimeout(function(){$(".rewrite-error-alert").fadeOut()},2e3))}).fail(function(e){$("#rewriteModal").modal("hide"),swal({title:"提示",text:"请求失败！",type:"error",showConfirmButton:!1,timer:2e3})})}),$(".smo2-start,.smo2-end").on("keypress",function(e){return e.keyCode>=48&&e.keyCode<=57}),$(".hr-start,.hr-end").on("keypress",function(e){return e.keyCode>=48&&e.keyCode<=57}),$(".smo2-start,.smo2-end").on("keyup",function(){$(this).val()>100&&$(this).val("100"),$(this).val()<0&&this.val("0")}),$(".hr-start,.hr-end").on("keyup",function(){$(this).val()>200&&$(this).val("200"),$(this).val()<0&&this.val("0")}),window.onresize=function(){void 0!=e.mixchart&&(e.mixchart.resize(),e.mixchart2.resize(),e.mixchart3.resize(),e.pieChart.resize())}},a.prototype.renderInfo=function(e){$(".userinfo-detail-list li").eq(0).find("img").attr("src",e.icon_url),$(".userinfo-detail-list li").eq(1).find("p").text(e.id),$(".userinfo-detail-list li").eq(2).find("p").text(e.nick_name),$(".userinfo-detail-list li").eq(3).find("p").text(window.formatSex(e.sex)),$(".userinfo-detail-list li").eq(4).find("p").text(window.nullFormat(e.age)),$(".userinfo-detail-list li").eq(5).find("p").text(window.cityNullFormat(e.province)+window.cityNullFormat(e.city)),$(".userinfo-detail-list li").eq(6).find("p").text(window.nullFormat(e.height)+"cm"),$(".userinfo-detail-list li").eq(7).find("p").text(window.nullFormat(e.weight)+"kg"),$(".userinfo-detail-list li").eq(8).find("p").text(window.nullFormat(e.motion_number)+"次"),$(".userinfo-detail-list li").eq(9).find("p").text(window.cutTimeUntilSeconds(e.last_upload_time)),$(".userinfo-detail-list li").eq(10).find("p").text(window.nullFormat(e.register_time)),$(".userinfo-remark").find("p").text(window.nullFormat(e.remarks)),window.localStorage.setItem("customerUUID",e.uuid),window.localStorage.setItem("customerId",e.id)},a.prototype.renderData=function(e){$(".page-content>h3").text(window.cutTime(e.startDate)+"  515有氧能力测试报告");var t=e.startDate;window.localStorage.setItem("next_time",t),"1"==window.localStorage.getItem("auClinic")&&($(".origin-data-download").attr("href",e.originData),$(".origin-data-download-ct").show(),null==e.originData&&($(".origin-data-download").text("无原始数据"),$(".origin-data-download").addClass("no-data"))),null==e.bluetoothName?$(".device-number").text("--"):$(".device-number").text(e.bluetoothName),$(".reportinfo-remark").find("p").text(window.nullFormat(e.reportRemarks)),$(".report-remarks").val(e.reportRemarks),$(".smxo2-summary span:first").text(e.metValue),$(".smxo2-summary span.exdata-eva").text(e.metValueDescription),$(".exdata-summary-allin li").eq(0).find("h3").text(e.startTime),$(".exdata-summary-allin li").eq(1).find("h3").text(e.continuedTime),$(".exdata-summary-allin li").eq(2).find("h3").text(e.stopStage),$(".exdata-summary-allin li").eq(3).find("h3").text(e.benchmarkLevel),$(".ability-list>li").eq(0).find(".ability-bar").addClass(this.levelEvaluate(e.vo2MaxLevel)),$(".ability-list>li").eq(0).find(".ability-detail .ability-vo2max").text(e.vo2Max),$(".ability-list>li").eq(0).find(".ability-detail p").text(e.vo2MaxDescription),$(".ability-list>li").eq(1).find(".ability-bar").addClass(this.levelEvaluate(e.lacticLevel)),"00:00:00"==e.lacticThresholdTime?$(".ability-list>li").eq(1).find(".ability-detail h4").hide():$(".ability-list>li").eq(1).find(".ability-detail .ability-latic").text(e.lacticThresholdTime),$(".ability-list>li").eq(1).find(".ability-detail p").text(e.lacticLevelDescription),$(".body-function>li").eq(0).find(".ability-bar").addClass(this.levelEvaluate(e.oIntakeLevel)),$(".body-function>li").eq(1).find(".ability-bar").addClass(this.levelEvaluate(e.oUseLevel)),$(".body-function>li").eq(2).find(".ability-bar").addClass(this.levelEvaluate(e.oTransportationLevel)),$(".body-function>li").eq(3).find(".ability-bar").addClass(this.levelEvaluate(e.recoverLevel)),$(".body-function-summary li").eq(0).text(e.o2UseMessage),$(".body-function-summary li").eq(1).text(e.recoverLevMessage),$(".risk-bar").addClass(this.riskEvaluate(e.riskLevel)),e.sportRiskRate>=0?$(".risk-bar i").addClass("green"):$(".risk-bar i").addClass("red"),$(".risk-summary-detail .high-or-low").text(this.highOrLow(e.sportRiskRate)),0==e.sportRiskRate?$(".risk-percent").hide():($(".risk-summary-detail .risk-percent").css({background:this.riskPercentBGColor(e.sportRiskRate),color:this.riskPercentFontColor(e.sportRiskRate)}),$(".risk-summary-detail .risk-percent").html('<img src="'+this.riskImg(e.sportRiskRate)+'">'+this.riskText(e.sportRiskRate)+"%"))},a.prototype.levelEvaluate=function(e){for(var t=[-2,-1,0,1,2,3],i=["awful","bad","none","average","good","excellent"],a=0;a<t.length;a++)if(e==t[a])return i[a]},a.prototype.riskEvaluate=function(e){var t=[1,2,3],i=["high","normal","low"];if(0==e)return"none";for(var a=0;a<t.length;a++)if(e==t[a])return i[a]},a.prototype.highOrLow=function(e){return e<0?"比普通人高":0==e?"为正常人水平":e>0?"比普通人低":"-"},a.prototype.riskImg=function(e){return e<=0?"../../img/riskup@2x.png":e>0?"../../img/riskdown@2x.png":""},a.prototype.riskText=function(e){return null!=e||void 0!=e?(100*e).toFixed(0).toString().replace("-",""):"--"},a.prototype.riskPercentBGColor=function(e){return e<=0?"#ffc9c5":e>0?"#E4F6F6":"#ffc9c5"},a.prototype.riskPercentFontColor=function(e){return e<=0?"red":e>0?"#009caa":"red"},a.prototype.setEchartsData1=function(e){$(".chart-summary-list li").eq(0).find("span").eq(0).text(e.avgSmo2),$(".chart-summary-list li").eq(1).find("span").eq(0).text(e.minSmo2),$(".chart-summary-list li").eq(2).find("span").eq(0).text(e.avgHeart),$(".chart-summary-list li").eq(3).find("span").eq(0).text(e.maxHeart);for(var t=e.y1Axis,i=e.y2Axis,a=0;a<t.length;a++)0==t[a]&&(t[a]=t[a-1]);for(var o=0;o<i.length;o++)0==i[o]&&(i[o]=i[o-1]);this.chartXData=e.xAxis,this.chartY1Data=t,this.chartY2Data=i,this.maxHrHint=(.85*parseInt(e.limitHeart)).toFixed(0),this.hintArr=[];var r={xAxis:0,yAxis:this.maxHrHint};if(this.hintArr.push(r),this.minSmo2=Math.min.apply(null,t),this.maxSmo2=Math.max.apply(null,t),this.minHr=Math.min.apply(null,i),this.maxHr=Math.max.apply(null,i),this.rangeArr=[2*this.minSmo2,2*this.maxSmo2,this.minHr,this.maxHr],this.rangeArr[0]<this.rangeArr[2])var n=this.rangeArr[0]-4,s=((this.rangeArr[0]-4)/2).toFixed(0);else var n=this.rangeArr[2]-4,s=((this.rangeArr[2]-4)/2).toFixed(0);if(this.rangeArr[1]>this.rangeArr[3])var l=this.rangeArr[1]+4,d=((this.rangeArr[1]+4)/2).toFixed(0);else var l=this.rangeArr[3]+4,d=((this.rangeArr[3]+4)/2).toFixed(0);s<=0&&(s=0),n<=0&&(n=0),this.splitNumber1=(d-s)/5,this.splitNumber2=(l-n)/5,this.setEchartsOption1(s,d,n,l)},a.prototype.setEchartsOption1=function(e,t,i,a){this.mixchart=echarts.init(document.getElementById("echarts_mix1")),this.mixchart.setOption({tooltip:{trigger:"axis"},xAxis:[{type:"category",data:this.chartXData,axisLine:{lineStyle:{color:"#C5C5C5",width:2}},boundaryGap:!1,axisLabel:{formatter:"{value}",textStyle:{color:"#333"}}}],yAxis:[{type:"value",name:"肌氧(%)",min:e,max:t,axisLabel:{formatter:function(e,t){return e.toFixed(0)},textStyle:{color:"#333"},showMaxLabel:!0,showMinLabel:!0},interval:this.splitNumber1,splitLine:{show:!1},axisTick:{show:!1},axisLine:{lineStyle:{color:"#C5C5C5",width:2}},nameTextStyle:{color:"#009CAA",fontSize:20}},{type:"value",name:"(bpm)心率",min:i,max:a,axisLabel:{formatter:function(e,t){return e.toFixed(0)},textStyle:{color:"#333"},showMaxLabel:!0,showMinLabel:!0},interval:this.splitNumber2,axisLine:{lineStyle:{color:"#C5C5C5",width:2}},splitLine:{show:!1},axisTick:{show:!1},nameTextStyle:{color:"#F47D00",fontSize:20}}],series:[{name:"肌氧",type:"line",symbol:"circle",symbolSize:[8,8],data:this.chartY1Data,itemStyle:{normal:{color:"#009CAA"}}},{name:"心率",type:"line",yAxisIndex:1,symbol:"diamond",symbolSize:[10,10],data:this.chartY2Data,itemStyle:{normal:{color:"#F47D00"}},markLine:{data:this.hintArr,symbol:["none","image://../../img/tuli3@3x.png"],symbolSize:[20,20],lineStyle:{normal:{type:"solid",color:"red"}}}}],dataZoom:[{show:!0,height:30,xAxisIndex:[0],bottom:30,start:0,end:100,handleIcon:"path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",handleSize:"110%",handleStyle:{color:"#C5C5C5"},textStyle:{color:"rgba(0,0,0,0)"},borderColor:"#C5C5C5"}]})},a.prototype.setEcharts2=function(e){var t=e.x1Axis,i=e.x2Axis,a=e.yAxis;this.mixchart2=echarts.init(document.getElementById("echarts_mix2")),this.mixchart2.setOption({tooltip:{show:!1,trigger:"axis"},grid:{top:30},xAxis:{data:t},yAxis:{show:!1,splitLine:{show:!1}},color:i,legend:{show:!1},series:[{type:"bar",itemStyle:{normal:{color:function(e){return["#FF671F","#1894D5","#19CD40","#F02E1D"][i[e.dataIndex]]}}},data:a}]})},a.prototype.setEcharts3=function(e){var t=[window.timeToseconds(e.warmupPeriodTime),window.timeToseconds(e.platformPeriodTime),window.timeToseconds(e.limitPeriodTime),window.timeToseconds(e.recoverPeriodTime)],i=t[0]+t[1]+t[2]+t[3],a=[(100*t[0]/i).toFixed(0),(100*t[1]/i).toFixed(0),(100*t[2]/i).toFixed(0),(100*t[3]/i).toFixed(0)];$(".time-slot-item").eq(0).find("h3").text(a[0]+"%"),$(".time-slot-item").eq(1).find("h3").text(a[1]+"%"),$(".time-slot-item").eq(2).find("h3").text(a[2]+"%"),$(".time-slot-item").eq(3).find("h3").text(a[3]+"%"),$(".time-slot-item").eq(0).find(".time-slot").text(window.awfulTimeFormat(e.warmupPeriodTime)),$(".time-slot-item").eq(1).find(".time-slot").text(window.awfulTimeFormat(e.platformPeriodTime)),$(".time-slot-item").eq(2).find(".time-slot").text(window.awfulTimeFormat(e.limitPeriodTime)),$(".time-slot-item").eq(3).find(".time-slot").text(window.awfulTimeFormat(e.recoverPeriodTime)),$(".extime-item").eq(0).find(".time-bar").eq(0).find("span").eq(2).text(window.awfulTimeFormat(e.warmupPeriodMinTime)),$(".extime-item").eq(0).find(".time-bar").eq(1).find("span").eq(2).text(window.awfulTimeFormat(e.warmupPeriodMaxTime)),$(".extime-item").eq(0).find(".time-bar").eq(2).find("span").eq(2).text(window.awfulTimeFormat(e.warmupPeriodAvgTime)),$(".extime-item").eq(1).find(".time-bar").eq(0).find("span").eq(2).text(window.awfulTimeFormat(e.platformPeriodMinTime)),$(".extime-item").eq(1).find(".time-bar").eq(1).find("span").eq(2).text(window.awfulTimeFormat(e.platformPeriodMaxTime)),$(".extime-item").eq(1).find(".time-bar").eq(2).find("span").eq(2).text(window.awfulTimeFormat(e.platformPeriodAvgTime)),$(".extime-item").eq(2).find(".time-bar").eq(0).find("span").eq(2).text(window.awfulTimeFormat(e.limitPeriodMinTime)),$(".extime-item").eq(2).find(".time-bar").eq(1).find("span").eq(2).text(window.awfulTimeFormat(e.limitPeriodMaxTime)),$(".extime-item").eq(2).find(".time-bar").eq(2).find("span").eq(2).text(window.awfulTimeFormat(e.limitPeriodAvgTime)),$(".extime-item").eq(3).find(".time-bar").eq(0).find("span").eq(2).text(window.awfulTimeFormat(e.recoverPeriodMinTime)),$(".extime-item").eq(3).find(".time-bar").eq(1).find("span").eq(2).text(window.awfulTimeFormat(e.recoverPeriodMaxTime)),$(".extime-item").eq(3).find(".time-bar").eq(2).find("span").eq(2).text(window.awfulTimeFormat(e.recoverPeriodAvgTime));var o=window.timeToseconds(e.warmupPeriodMinTime),r=window.timeToseconds(e.warmupPeriodMaxTime),n=window.timeToseconds(e.warmupPeriodAvgTime),s=window.timeToseconds(e.platformPeriodMinTime),l=window.timeToseconds(e.platformPeriodMaxTime),d=window.timeToseconds(e.platformPeriodAvgTime),m=window.timeToseconds(e.limitPeriodMinTime),c=window.timeToseconds(e.limitPeriodMaxTime),p=window.timeToseconds(e.limitPeriodAvgTime),u=window.timeToseconds(e.recoverPeriodMinTime),w=window.timeToseconds(e.recoverPeriodMaxTime),h=window.timeToseconds(e.recoverPeriodAvgTime),f=[];f.push(o,r,n),f.push(s,l,d),f.push(m,c,p),f.push(u,w,h);for(var g=f[0],x=0;x<f.length;x++)f[x]>g&&(g=f[x]);$(".extime-item").eq(0).find(".time-bar").eq(0).find(".time-min i").css({width:(window.timeToseconds(e.warmupPeriodMinTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(0).find(".time-bar").eq(1).find(".time-max i").css({width:(window.timeToseconds(e.warmupPeriodMaxTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(0).find(".time-bar").eq(2).find(".time-ave i").css({width:(window.timeToseconds(e.warmupPeriodAvgTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(1).find(".time-bar").eq(0).find(".time-min i").css({width:(window.timeToseconds(e.platformPeriodMinTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(1).find(".time-bar").eq(1).find(".time-max i").css({width:(window.timeToseconds(e.platformPeriodMaxTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(1).find(".time-bar").eq(2).find(".time-ave i").css({width:(window.timeToseconds(e.platformPeriodAvgTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(2).find(".time-bar").eq(0).find(".time-min i").css({width:(window.timeToseconds(e.limitPeriodMinTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(2).find(".time-bar").eq(1).find(".time-max i").css({width:(window.timeToseconds(e.limitPeriodMaxTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(2).find(".time-bar").eq(2).find(".time-ave i").css({width:(window.timeToseconds(e.limitPeriodAvgTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(3).find(".time-bar").eq(0).find(".time-min i").css({width:(window.timeToseconds(e.recoverPeriodMinTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(3).find(".time-bar").eq(1).find(".time-max i").css({width:(window.timeToseconds(e.recoverPeriodMaxTime)/g*100).toFixed(0)+"%"}),$(".extime-item").eq(3).find(".time-bar").eq(2).find(".time-ave i").css({width:(window.timeToseconds(e.recoverPeriodAvgTime)/g*100).toFixed(0)+"%"});var b={normal:{color:"rgba(0,0,0,0)",borderColor:"#eee",borderWidth:1,borderType:"dashed",label:{show:!1},labelLine:{show:!1}},emphasis:{color:"rgba(0,0,0,0)"}};this.pieChart=echarts.init(document.getElementById("echarts_pie")),this.pieChart.setOption({title:{text:window.secondsToTime(t[0]+t[1]+t[2]+t[3]),subtext:"运动时间",x:"center",y:"center",textStyle:{fontWeight:"normal",fontSize:24},subtextStyle:{fontWeight:"normal",fontSize:16}},tooltip:{show:!1,trigger:"item",formatter:"{b} ({d}%)"},color:["#FF671F","#19CD40","#F02E1D","#1894D5"],series:[{name:"运动分析",type:"pie",radius:[130,140],hoverAnimation:!1,data:[{value:a[0],name:"热身区"},{value:100-a[0],name:"invisible",itemStyle:b}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"},normal:{label:{show:!1,formatter:"{b} ({d}%)"}},labelLine:{show:!0}}},{name:"运动分析",type:"pie",radius:[110,120],hoverAnimation:!1,data:[{value:a[1],name:"有效运动区"},{value:100-a[1],name:"invisible",itemStyle:b}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"},normal:{label:{show:!1,formatter:"{b} ({d}%)"}},labelLine:{show:!0}}},{name:"运动分析",type:"pie",radius:[90,100],hoverAnimation:!1,data:[{value:a[2],name:"高强度脱氧区"},{value:100-a[2],name:"invisible",itemStyle:b}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"},normal:{label:{show:!1,formatter:"{b} ({d}%)"}},labelLine:{show:!0}}},{name:"运动分析",type:"pie",radius:[70,80],hoverAnimation:!1,data:[{value:a[3],name:"主动恢复区"},{value:100-a[3],name:"invisible",itemStyle:b}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"},normal:{label:{show:!1,formatter:"{b} ({d}%)"}},labelLine:{show:!0}}}]},!0)},a.prototype.setEcharts4=function(e){var t=e.xAxis,i=e.y1Axis,a=e.y2Axis;this.mixchart3=echarts.init(document.getElementById("echarts_mix3")),this.mixchart3.setOption({tooltip:{trigger:"axis"},toolbox:{show:!1},xAxis:[{type:"category",data:t,boundaryGap:!1,splitLine:{show:!0},axisTick:{show:!1},axisLine:{lineStyle:{color:"#C5C5C5",width:2}},axisLabel:{formatter:"{value}",textStyle:{color:"#333"}}}],yAxis:[{type:"value",name:"肌氧(%)",min:0,max:100,axisLabel:{formatter:"{value}",textStyle:{color:"#333"}},splitLine:{show:!1},axisTick:{show:!1},axisLine:{lineStyle:{color:"#C5C5C5",width:2}},nameTextStyle:{color:"#009CAA",fontSize:20}},{type:"value",name:"(bpm)心率",min:0,max:250,axisLabel:{formatter:"{value}",textStyle:{color:"#333"}},splitLine:{show:!1},axisTick:{show:!1},axisLine:{lineStyle:{color:"#C5C5C5",width:2}},nameTextStyle:{color:"#6399E3",fontSize:20}}],series:[{name:"肌氧恢复",type:"line",data:i,symbolSize:[8,8],itemStyle:{normal:{color:"#009CAA"}}},{name:"心率恢复",type:"line",yAxisIndex:1,symbolSize:[8,8],data:a,itemStyle:{normal:{color:"#6399E3"}}}]})},new a}},[28]);