webpackJsonp([8],{0:function(e,t){function a(){this.init()}a.prototype={init:function(){this.domRender(),this.bindEvent()},domRender:function(){var e=window.localStorage.getItem("localSidebarDom"),t=window.localStorage.getItem("localheaderDom");null==e?(this.sidebarDomRender(),this.locationSetActive()):($(".page-sidebar-wrapper").html(""),$(e).appendTo(".page-sidebar-wrapper"),$(".page-sidebar").hasClass("closed")?$(".page-content").addClass("open"):$(".page-content").removeClass("open"),this.locationSetActive()),null==t?this.headerDomRender():($(".page-header").html(""),$(t).appendTo(".page-header")),this.footerDomRender()},headerDomRender:function(){$('<div class="page-header-inner "><div class="page-logo"><a href="../report/common.html"><img src="../../img/logo.png" alt="logo" class="logo-default"></a><div class="menu-toggler"><i class="fa fa-bars" style="color:#fff;font-size:2rem;"></i></div></div><div class="build-version">科研版</div><div class="welcome-func"><ul class="welcome-func-list"><li class="welcome-user"><img alt="" class="welcome-userimg img-circle" src="../../img/avatar_default.png"><span class="welcome-username"></span><ul class="welcome-user-menu"><li><i class="fa fa-question-circle"></i><a href="#">帮助</a></li><li class="logout-btn"><i class="fa fa-sign-out"></i><a href="../login.html">登出</a></li></ul></li></ul></div></div>').appendTo(".page-header"),this.getWelcomeInfo()},sidebarDomRender:function(){for(var e=[{icon:"icon-bar-chart",title:"运动报告管理",link:"#",permission:[1,2,3],childItem:[{link:"../report/common.html",title:"常规运动报告"},{link:"../report/aerobic.html",title:"515有氧能力测试报告"},{link:"../report/rockport.html",title:"Rockport测试报告"},{link:"../report/4min_walk.html",title:"跑步机四分钟走测试报告"}]},{icon:"icon-users",title:"客户管理",link:"#",permission:[1,2,3],childItem:[{link:"../customer/info.html",title:"客户信息"}]},{icon:"icon-pie-chart",title:"数据统计",link:"#",permission:[2],childItem:[{link:"../stats/stats.html",title:"数据统计报告"}]}],t=parseInt(window.localStorage.getItem("auClinic")),a=0;a<e.length;a++)if(-1!=e[a].permission.indexOf(t)){for(var i="",o=0;o<e[a].childItem.length;o++)i=i+'<li class="nav-item"><a href="'+e[a].childItem[o].link+'" class="nav-link "><span class="title">'+e[a].childItem[o].title+"</span></a></li>";if(0==e[a].childItem.length)var r='<li class="nav-item"><a href="'+e[a].link+'" class="nav-link nav-toggle"><i class="'+e[a].icon+'"></i><span class="title">'+e[a].title+"</span></a></li>";else var r='<li class="nav-item"><a href="'+e[a].link+'" class="nav-link nav-toggle"><i class="'+e[a].icon+'"></i><span class="title">'+e[a].title+'</span><span class="arrow"></span></a><ul class="sub-menu">'+i+"</ul></li>";$(r).appendTo(".page-sidebar-menu")}window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())},footerDomRender:function(){$('<div class="page-footer-inner">2016 &copy; 加动健康科技（深圳）有限公司</div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>').appendTo(".page-footer")},getWelcomeInfo:function(){var e=window.localStorage.getItem("userImgUrlClinic"),t=window.localStorage.getItem("userNickNameClinic");"undefined"==e||"null"==e?$(".welcome-userimg").attr("src","../../img/avatar_default.png"):$(".welcome-userimg").attr("src",e),"undefined"==t||"null"==t?$(".welcome-username").text("管理员"):$(".welcome-username").text(t)},bindEvent:function(){$(".page-sidebar-menu>li>a").on("click",function(e){e.preventDefault()}),$(".page-sidebar-menu>li").on("click",function(){$(this).hasClass("open")?$(this).removeClass("open"):($(".page-sidebar-menu>li").removeClass("open"),$(this).addClass("open")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-sidebar-menu>li .sub-menu>li").on("click",function(e){e.stopPropagation(),$(this).hasClass("active")||($(this).parents().find(".page-sidebar-menu>li>ul>li").removeClass("active"),$(this).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-logo .menu-toggler").on("click",function(){$(".page-sidebar").hasClass("closed")?($(".page-sidebar").removeClass("closed"),$(".page-content").removeClass("open"),$(".page-footer").removeClass("open"),$(".page-logo").removeClass("closed")):($(".page-sidebar").addClass("closed"),$(".page-content").addClass("open"),$(".page-footer").addClass("open"),$(".page-logo").addClass("closed")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html()),window.localStorage.setItem("localheaderDom",$(".page-header").html())}),$(".logout-btn").on("click",function(){window.localStorage.clear()})},locationSetActive:function(){-1!=window.location.href.indexOf("common")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("aerobic")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(1).addClass("active")),-1!=window.location.href.indexOf("rockport")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(2).addClass("active")),-1!=window.location.href.indexOf("4min_walk")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(3).addClass("active")),-1!=window.location.href.indexOf("info")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(1).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(1).find(".sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("stats")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(2).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(2).find(".sub-menu li").eq(0).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}},new a},10:function(e,t,a){"use strict";function i(){this.init()}Object.defineProperty(t,"__esModule",{value:!0});var o=a(0),r=(a.n(o),a(1)),n=(a.n(r),a(2));a.n(n);i.prototype.init=function(){null==window.localStorage.getItem("utClinic")?($("html,body").html(""),window.location.href="../login.html"):(this.requestCustomerData(),this.requestSportsData(),this.bindEvent(),this.interpretation());window.localStorage.setItem("reportType1",1),"null"==window.localStorage.getItem("data_recordId")?$(".compile").show():$(".examine").show(),$(".unscramble").attr("disabled","disabled"),$(".page-compile").click(function(){$(".unscramble").removeAttr("disabled"),$(".page-off").show(),$(this).hide()}),$(".page-call").click(function(){$(".report-unscramble").attr("disabled","disabled"),$(".page-compile").show(),$(".page-off").hide(),window.history.go(0)})},i.prototype.interpretation=function(){var e=this;$(".report_unscramble").blur(function(){e.validator()}),$(".page-save").click(function(){e.validator(),e.requestSportsData();var t=$(".unscramble").val(),a=window.localStorage.getItem("reportId"),i=window.localStorage.getItem("utClinic"),o=window.localStorage.getItem("uidClinic");$.ajax({url:window.urlHandler("motiondata/updateReportInterpretation",o,i),method:"post",data:{id:a,sportType:1,content:t},success:function(t){200==t.status&&(swal({title:"提示",text:"保存成功！",type:"success",showConfirmButton:!1,timer:2e3}),e.requestSportsData(),$(".unscramble").attr("disabled","disabled"),$(".page-off").hide(),$(".page-compile").show())}})})},i.prototype.validator=function(){return $(".unscramble").val().length>200?($(".verify-report").text("仅限200字以内"),!1):($(".verify-report").hide(),!0)},i.prototype.requestCustomerData=function(){var e=this,t=!1,a=window.localStorage.getItem("utClinic"),i=window.localStorage.getItem("uidClinic"),o=window.localStorage.getItem("customerUUID");t||(t=!0,$.ajax({url:window.urlHandler("customer/findByCustomerUuid",i,a),method:"post",data:{customerId:o}}).done(function(a){if(200==a.status){e.renderInfo(a.datas.userInfo);var i=a.datas.userInfo;i=JSON.stringify(i),window.localStorage.setItem("usery",i)}t=!1}).fail(function(e){t=!1}))},i.prototype.requestSportsData=function(){var e=this,t=!1,a=window.localStorage.getItem("utClinic"),i=window.localStorage.getItem("uidClinic"),o=window.localStorage.getItem("reportId"),r="customer/motionData/"+o+"/detail";t||(t=!0,$.ajax({url:window.urlHandler(r,i,a),method:"post",data:{}}).done(function(a){if(200==a.status){e.renderData(a.datas);var i=a.datas.motionInfo.reportInterpretation;null!=i&&$(".unscramble").text(i),window.localStorage.setItem("report",i);var o=a.datas.motionInfo;o=JSON.stringify(o),window.localStorage.setItem("datay",o),e.setEchartsData(a.datas.muscleHeartRateInfo);var r=a.datas.muscleHeartRateInfo;r=JSON.stringify(r),window.localStorage.setItem("cartogram",r);var n=a.datas.riskNoteInfos;n=JSON.stringify(n),window.localStorage.setItem("riskNote",n)}t=!1,window.dataErrorHandler(a)}).fail(function(e){t=!1}))},i.prototype.bindEvent=function(){var e=this;$(".change-y-btn").on("click",function(){var t=$(".smo2-start").val(),a=$(".smo2-end").val(),i=$(".hr-start").val(),o=$(".hr-end").val();""!=t&&""!=a&&""!=i&&""!=o||($(".type-error-alert").text("请输入正确完整的数值范围！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)),""==t&&""==a&&""==i&&""==o||(a==t||i==o?($(".type-error-alert").text("请输入正确完整的数值范围！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)):parseInt(a)<parseInt(t)||parseInt(o)<parseInt(i)?($(".type-error-alert").text("终止值不能小于起始值，请修改！"),$(".type-error-alert").fadeIn(),setTimeout(function(){$(".type-error-alert").fadeOut()},2e3)):($("#myModal").modal("hide"),e.setEchartsOption(t,a,i,o)))}),$(".reset-y-btn").on("click",function(){$(".smo2-start").val(""),$(".smo2-end").val(""),$(".hr-start").val(""),$(".hr-end").val(""),$("#myModal").modal("hide"),e.setEchartsOption(0,100,0,200)}),$(".rewrite-report-remarks-btn").on("click",function(){var t=window.localStorage.getItem("utClinic"),a=window.localStorage.getItem("uidClinic"),i=window.localStorage.getItem("reportId"),o=$(".report-remarks").val();$.ajax({url:window.urlHandler("motiondata/addSportRemarks",a,t),method:"POST",data:{sportType:0,uuid:i,content:o}}).done(function(t){200==t.status?(e.requestSportsData(),$("#rewriteModal").modal("hide"),swal({title:"提示",text:"保存成功！",type:"success",showConfirmButton:!1,timer:2e3})):($(".rewrite-error-alert").text("服务器解析错误，请稍后再试！"),$(".rewrite-error-alert").fadeIn(),setTimeout(function(){$(".rewrite-error-alert").fadeOut()},2e3))}).fail(function(e){$("#rewriteModal").modal("hide"),swal({title:"提示",text:"请求失败！",type:"error",showConfirmButton:!1,timer:2e3})})}),$(".smo2-start,.smo2-end").on("keypress",function(e){return e.keyCode>=48&&e.keyCode<=57}),$(".hr-start,.hr-end").on("keypress",function(e){return e.keyCode>=48&&e.keyCode<=57}),$(".smo2-start,.smo2-end").on("keyup",function(){$(this).val()>100&&$(this).val("100"),$(this).val()<0&&this.val("0")}),$(".hr-start,.hr-end").on("keyup",function(){$(this).val()>200&&$(this).val("200"),$(this).val()<0&&this.val("0")}),window.onresize=function(){e.mixchart.resize()}},i.prototype.renderInfo=function(e){$(".userinfo-detail-list li").eq(0).find("img").attr("src",e.icon_url),$(".userinfo-detail-list li").eq(1).find("p").text(e.id),$(".userinfo-detail-list li").eq(2).find("p").text(e.nick_name),$(".userinfo-detail-list li").eq(3).find("p").text(window.formatSex(e.sex)),$(".userinfo-detail-list li").eq(4).find("p").text(window.nullFormat(e.age)),$(".userinfo-detail-list li").eq(5).find("p").text(window.cityNullFormat(e.province)+window.cityNullFormat(e.city)),$(".userinfo-detail-list li").eq(6).find("p").text(window.nullFormat(e.height)+"cm"),$(".userinfo-detail-list li").eq(7).find("p").text(window.nullFormat(e.weight)+"kg"),$(".userinfo-detail-list li").eq(8).find("p").text(window.nullFormat(e.motion_number)+"次"),$(".userinfo-detail-list li").eq(9).find("p").text(window.cutTimeUntilSeconds(e.last_upload_time)),$(".userinfo-detail-list li").eq(10).find("p").text(window.nullFormat(e.register_time)),$(".userinfo-remark").find("p").text(window.nullFormat(e.remarks)),window.localStorage.setItem("customerUUID",e.uuid),window.localStorage.setItem("customerId",e.id)},i.prototype.renderData=function(e){$(".page-content>h3").text(window.cutTime(e.motionInfo.startDate)+" "+this.sportTypeFormat(e.motionInfo.type));var t=e.motionInfo.startDate;e.motionInfo.type;if(window.localStorage.setItem("next_time",t),"1"==window.localStorage.getItem("auClinic")&&($(".origin-data-download").attr("href",e.motionInfo.originData),$(".origin-data-download-ct").show(),null==e.motionInfo.originData&&($(".origin-data-download").text("无原始数据"),$(".origin-data-download").addClass("no-data"))),null==e.motionInfo.bluetoothName?$(".device-number").text("--"):$(".device-number").text(e.motionInfo.bluetoothName),$(".reportinfo-remark").find("p").text(window.nullFormat(e.motionInfo.reportRemarks)),$(".report-remarks").val(e.motionInfo.reportRemarks),$(".start-time-summary span:first").text(e.motionInfo.startTime),$(".last-time-summary span:first").text(e.motionInfo.continuedTime),$(".maxo2-summary span:first").text(e.motionInfo.maxVo2),$(".maxo2-summary span.exdata-eva").text(e.motionInfo.vo2Conclusion),$(".smo2-summary span:first").text(e.motionInfo.metValue),$(".smo2-summary span.exdata-eva").text(e.motionInfo.metConclusion),$(".chart-summary-list li").eq(0).find("span").eq(0).text(e.muscleHeartRateInfo.avgHr),$(".chart-summary-list li").eq(1).find("span").eq(0).text(e.muscleHeartRateInfo.maxHr),this.maxHrHint=(.85*parseInt(e.muscleHeartRateInfo.limitHr)).toFixed(0),this.minSmo2=e.muscleHeartRateInfo.minSmo2,this.maxSmo2=e.muscleHeartRateInfo.maxSmo2,this.minHr=e.muscleHeartRateInfo.minHr,this.maxHr=e.muscleHeartRateInfo.maxHr,0==e.riskNoteInfos.length)$(".risk-remark-list").text("无");else for(var a=0;a<e.riskNoteInfos.length;a++){if(1==e.riskNoteInfos[a].type)var i='<li class="lose-water"><span>'+this.nullTimeFormat(e.riskNoteInfos[a].time)+'</span><span class="risk-mark"></span><span>'+e.riskNoteInfos[a].hint+"</span></li>";else var i='<li class="overhb"><span>'+this.nullTimeFormat(e.riskNoteInfos[a].time)+'</span><span class="risk-mark"></span><span>'+e.riskNoteInfos[a].hint+"</span></li>";$(i).appendTo(".risk-remark-list")}},i.prototype.nullTimeFormat=function(e){return null==e||""==e?"00:00:00":e},i.prototype.sportTypeFormat=function(e){return["其他","跑步","骑行","步行","健身房","篮球","足球","乒乓球","羽毛球","排球","轮滑","滑雪","攀岩","划艇","网球","拳击","毽球"][e]},i.prototype.setEchartsData=function(e){for(var t=e.y1Axis,a=e.y2Axis,i=0;i<t.length;i++)0==t[i]&&(t[i]=t[i-1]);for(var o=0;o<a.length;o++)0==a[o]&&(a[o]=a[o-1]);if(this.chartXData=e.xAxis,this.chartY1Data=t,this.chartY2Data=a,this.minSmo2=Math.min.apply(null,t),this.maxSmo2=Math.max.apply(null,t),this.minHr=Math.min.apply(null,a),this.maxHr=Math.max.apply(null,a),this.chartMarkData1=e.notePoints,this.chartMarkData2=e.riskPoints,this.chartMarkDataArr1=[],this.chartMarkDataArr2=[],this.rangeArr=[2*this.minSmo2,2*this.maxSmo2,this.minHr,this.maxHr],this.rangeArr[0]<this.rangeArr[2])var r=this.rangeArr[0]-4,n=((this.rangeArr[0]-4)/2).toFixed(0);else var r=this.rangeArr[2]-4,n=((this.rangeArr[2]-4)/2).toFixed(0);if(this.rangeArr[1]>this.rangeArr[3])var s=this.rangeArr[1]+4,l=((this.rangeArr[1]+4)/2).toFixed(0);else var s=this.rangeArr[3]+4,l=((this.rangeArr[3]+4)/2).toFixed(0);n<=0&&(n=0),r<=0&&(r=0),this.splitNumber1=(l-n)/5,this.splitNumber2=(s-r)/5;for(var m=0;m<this.chartMarkData1.length;m++){var d=[{coord:[this.chartMarkData1[m],n],symbol:"none"},{coord:[this.chartMarkData1[m],l],symbol:"none"}];this.chartMarkDataArr1.push(d)}for(var m=0;m<this.chartMarkData2.length;m++){var d=[{coord:[this.chartMarkData2[m],r],symbol:"none"},{coord:[this.chartMarkData2[m],s],symbol:"none"}];this.chartMarkDataArr2.push(d)}var c={yAxis:this.maxHrHint,lineStyle:{normal:{type:"solid",color:"red"}}};this.chartMarkDataArr2.push(c),this.setEchartsOption(n,l,r,s)},i.prototype.setEchartsOption=function(e,t,a,i){this.mixchart=echarts.init(document.getElementById("echarts_mix")),this.mixchart.setOption({tooltip:{trigger:"axis"},xAxis:[{type:"category",data:this.chartXData,axisLine:{lineStyle:{color:"#C5C5C5",width:2}},boundaryGap:!1,axisLabel:{formatter:"{value}",textStyle:{color:"#333"}}}],yAxis:[{type:"value",name:"肌氧(%)",min:e,max:t,axisLabel:{formatter:function(e,t){return e.toFixed(0)},textStyle:{color:"#333"},showMaxLabel:!0,showMinLabel:!0},interval:this.splitNumber1,splitLine:{show:!1},axisTick:{show:!1},axisLine:{lineStyle:{color:"#C5C5C5",width:2}},nameTextStyle:{color:"#009CAA",fontSize:20}},{type:"value",name:"(bpm)心率",min:a,max:i,axisLabel:{formatter:function(e,t){return e.toFixed(0)},textStyle:{color:"#333"},showMaxLabel:!0,showMinLabel:!0},interval:this.splitNumber2,axisLine:{lineStyle:{color:"#C5C5C5",width:2}},splitLine:{show:!1},axisTick:{show:!1},nameTextStyle:{color:"#F47D00",fontSize:20}}],series:[{name:"肌氧",type:"line",symbol:"circle",symbolSize:[8,8],data:this.chartY1Data,itemStyle:{normal:{color:"#009CAA"}},markLine:{symbol:["none","none"],silent:!0,label:{normal:{show:!1}},itemStyle:{normal:{color:"#6D6D6D"}},data:this.chartMarkDataArr1}},{name:"心率",type:"line",symbol:"diamond",symbolSize:[10,12],yAxisIndex:1,data:this.chartY2Data,itemStyle:{normal:{color:"#F47D00"}},markLine:{symbol:["none","image://../../img/tuli3@3x.png"],symbolSize:[20,20],silent:!0,label:{normal:{show:!0}},itemStyle:{normal:{color:"#ff0000"}},data:this.chartMarkDataArr2}}],dataZoom:[{show:!0,height:30,xAxisIndex:[0],bottom:30,start:0,end:100,handleIcon:"path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",handleSize:"110%",handleStyle:{color:"#C5C5C5"},textStyle:{color:"rgba(0,0,0,0)"},borderColor:"#C5C5C5"}]})},new i},31:function(e,t,a){e.exports=a(10)}},[31]);