webpackJsonp([0],{0:function(e,t){function a(){this.init()}a.prototype={init:function(){this.domRender(),this.bindEvent()},domRender:function(){var e=window.localStorage.getItem("localSidebarDom"),t=window.localStorage.getItem("localheaderDom");null==e?(this.sidebarDomRender(),this.locationSetActive()):($(".page-sidebar-wrapper").html(""),$(e).appendTo(".page-sidebar-wrapper"),$(".page-sidebar").hasClass("closed")?$(".page-content").addClass("open"):$(".page-content").removeClass("open"),this.locationSetActive()),null==t?this.headerDomRender():($(".page-header").html(""),$(t).appendTo(".page-header")),this.footerDomRender()},headerDomRender:function(){$('<div class="page-header-inner "><div class="page-logo"><a href="../report/common.html"><img src="../../img/logo.png" alt="logo" class="logo-default"></a><div class="menu-toggler"><i class="fa fa-bars" style="color:#fff;font-size:2rem;"></i></div></div><div class="build-version">科研版</div><div class="welcome-func"><ul class="welcome-func-list"><li class="welcome-user"><img alt="" class="welcome-userimg img-circle" src="../../img/avatar_default.png"><span class="welcome-username"></span><ul class="welcome-user-menu"><li><i class="fa fa-question-circle"></i><a href="#">帮助</a></li><li class="logout-btn"><i class="fa fa-sign-out"></i><a href="../login.html">登出</a></li></ul></li></ul></div></div>').appendTo(".page-header"),this.getWelcomeInfo()},sidebarDomRender:function(){for(var e=[{icon:"icon-bar-chart",title:"运动报告管理",link:"#",permission:[1,2,3],childItem:[{link:"../report/common.html",title:"常规运动报告"},{link:"../report/aerobic.html",title:"515有氧能力测试报告"},{link:"../report/rockport.html",title:"Rockport测试报告"},{link:"../report/4min_walk.html",title:"跑步机四分钟走测试报告"}]},{icon:"icon-users",title:"客户管理",link:"#",permission:[1,2,3],childItem:[{link:"../customer/info.html",title:"客户信息"}]},{icon:"icon-pie-chart",title:"数据统计",link:"#",permission:[2],childItem:[{link:"../stats/stats.html",title:"数据统计报告"}]}],t=parseInt(window.localStorage.getItem("auClinic")),a=0;a<e.length;a++)if(-1!=e[a].permission.indexOf(t)){for(var i="",l=0;l<e[a].childItem.length;l++)i=i+'<li class="nav-item"><a href="'+e[a].childItem[l].link+'" class="nav-link "><span class="title">'+e[a].childItem[l].title+"</span></a></li>";if(0==e[a].childItem.length)var o='<li class="nav-item"><a href="'+e[a].link+'" class="nav-link nav-toggle"><i class="'+e[a].icon+'"></i><span class="title">'+e[a].title+"</span></a></li>";else var o='<li class="nav-item"><a href="'+e[a].link+'" class="nav-link nav-toggle"><i class="'+e[a].icon+'"></i><span class="title">'+e[a].title+'</span><span class="arrow"></span></a><ul class="sub-menu">'+i+"</ul></li>";$(o).appendTo(".page-sidebar-menu")}window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())},footerDomRender:function(){$('<div class="page-footer-inner">2016 &copy; 加动健康科技（深圳）有限公司</div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>').appendTo(".page-footer")},getWelcomeInfo:function(){var e=window.localStorage.getItem("userImgUrlClinic"),t=window.localStorage.getItem("userNickNameClinic");"undefined"==e||"null"==e?$(".welcome-userimg").attr("src","../../img/avatar_default.png"):$(".welcome-userimg").attr("src",e),"undefined"==t||"null"==t?$(".welcome-username").text("管理员"):$(".welcome-username").text(t)},bindEvent:function(){$(".page-sidebar-menu>li>a").on("click",function(e){e.preventDefault()}),$(".page-sidebar-menu>li").on("click",function(){$(this).hasClass("open")?$(this).removeClass("open"):($(".page-sidebar-menu>li").removeClass("open"),$(this).addClass("open")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-sidebar-menu>li .sub-menu>li").on("click",function(e){e.stopPropagation(),$(this).hasClass("active")||($(this).parents().find(".page-sidebar-menu>li>ul>li").removeClass("active"),$(this).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-logo .menu-toggler").on("click",function(){$(".page-sidebar").hasClass("closed")?($(".page-sidebar").removeClass("closed"),$(".page-content").removeClass("open"),$(".page-footer").removeClass("open"),$(".page-logo").removeClass("closed")):($(".page-sidebar").addClass("closed"),$(".page-content").addClass("open"),$(".page-footer").addClass("open"),$(".page-logo").addClass("closed")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html()),window.localStorage.setItem("localheaderDom",$(".page-header").html())}),$(".logout-btn").on("click",function(){window.localStorage.clear()})},locationSetActive:function(){-1!=window.location.href.indexOf("common")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("aerobic")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(1).addClass("active")),-1!=window.location.href.indexOf("rockport")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(2).addClass("active")),-1!=window.location.href.indexOf("4min_walk")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(3).addClass("active")),-1!=window.location.href.indexOf("info")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(1).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(1).find(".sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("stats")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(2).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(2).find(".sub-menu li").eq(0).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}},new a},23:function(e,t,a){"use strict";function i(){this.dataArr1=[],this.dataArr2=[],this.dataArr4=[],this.dataArr5=[],this.dataArr6=[],this.dataArr7=[],this.bind()}function l(e){var t=(e.height/100).toFixed(2),a=e.weight,i=(a/t/t).toFixed(1);$(".bmi").text(i)}function o(){$(".page-off").hide(),$(".page-compile").show(),$("input").attr("disabled",!0),$("select").attr("disabled","disabled"),$("textarea").attr("disabled",!0)}function n(){var e=$(".names").val();""==e?$(".hint-14").show().text("信息不能为空"):/^([A-Za-z]|[\u4E00-\u9FA5])+$/.test(e)?e.length>10?$(".hint-14").show().text("长度不能大于10位"):$(".hint-14").hide():$(".hint-14").show().text("请输入汉字或字母")}function s(){var e=$(".phone").val();return""==e?($(".hint-2").hide(),!0):/^1[34578]\d{9}$/.test(e)?($(".hint-2").hide(),!0):($(".hint-2").show().text("请输入正确格式"),!1)}function r(){var e=$(".phone1").val();if(""==e)$(".hint-3").show().text("信息不能为空");else{if(/^1[34578]\d{9}$/.test(e))return $(".hint-3").hide(),!0;$(".hint-3").show().text("请输入正确格式")}}function c(){var e=$(".ages").val();if(""==e)$(".hint-4").show().text("信息不能为空");else if(/^[0-9]+$/.test(e)){if(!(e<18||e>70))return $(".hint-4").hide(),!0;$(".hint-4").show().text("请输入18~70范围内")}else $(".hint-4").show().text("请输入正确格式")}function d(){var e=$(".resting").val();""==e?$(".hint-5").show().text("信息不能为空"):/^[0-9]+$/.test(e)?e<0||e>999?$(".hint-5").show().text("请输入0~999范围内"):$(".hint-5").hide():$(".hint-5").show().text("请输入正确格式")}function h(){var e=$(".weight").val();if(""==e)$(".hint-6").show().text("信息不能为空");else if(/^[0-9]+$/.test(e)){if(!(e<35||e>125))return $(".hint-6").hide(),!0;$(".hint-6").show().text("请输入35~125范围内")}else $(".hint-6").show().text("输入的格式不对")}function g(){var e=$(".blood-glucose").val();""==e?$(".hint-7").show().text("信息不能为空"):/^\d+(\.\d{1,2})?$/.test(e)?e>=100?$(".hint-7").show().text("请输入100以内范围"):$(".hint-7").hide():$(".hint-7").show().text("输入的格式不对")}function m(){var e=$(".blood_glucose_queen").val();""==e?$(".hint-77").show().text("信息不能为空"):/^\d+(\.\d{1,2})?$/.test(e)?e>=100?$(".hint-77").show().text("请输入100以内范围"):$(".hint-77").hide():$(".hint-77").show().text("输入的格式不对")}function u(){var e=$(".height").val();""==e?$(".hint-8").show().text("信息不能为空"):/^[1-2]\d{2}$/.test(e)?$(".hint-8").hide():$(".hint-8").show().text("请输入正确的格式")}function p(){var e=$(".compression").val();""==e?$(".hint-9").show().text("信息不能为空"):/^[0-9]+$/.test(e)?e<0||e>999?$(".hint-9").show().text("请输入0~999范围内"):$(".hint-9").hide():$(".hint-9").show().text("请输入正确的格式")}function v(){var e=$(".shrinkage").val();if(""==e)$(".hint-11").show().text("信息不能为空");else{if(!/^[0-9]+$/.test(e))return $(".hint-11").show().text("请输入正确的格式"),!1;if(!(e<0||e>999))return $(".hint-11").hide(),!0;$(".hint-11").show(),$(".hint-11").show().text("请输入0~999范围内")}}function f(){var e=$(".capacity").val();if(""==e)$(".hint-12").show().text("信息不能为空");else{if(!/^[1-9]\d*([.][1-9])?$/.test(e))return $(".hint-12").show().text("请输入正确的格式"),!1;if(!(e>100))return $(".hint-12").hide(),!0;$(".hint-12").show().text("请输入100范围内数值")}}function w(){var e=$(".comment").val();return""==e?($(".hint-13").hide(),!0):e.length>200?void $(".hint-13").show().text("仅限200字以内"):($(".hint-13").hide(),!0)}Object.defineProperty(t,"__esModule",{value:!0});var b=a(0),C=(a.n(b),a(1)),x=(a.n(C),a(2));a.n(x);$(function(){$("input").attr("disabled",!0),$("select").attr("disabled","disabled"),$("textarea").attr("disabled",!0)}),function(){var e=window.localStorage.getItem("utClinic"),t=window.localStorage.getItem("uidClinic"),a=window.localStorage.getItem("data_recordId"),i="questionnaire/"+a;$.ajax({type:"POST",url:window.urlHandler(i,t,e),dataType:"json",contentType:"application/json",success:function(e){var e=e.datas;$(".a-hospital").text(e.mechanism),$(".bmi").text(e.bmiIndex),$(".registrationNum").text(e.registrationNum),$(".a-data").text(e.testDate),$(".blood_glucose_queen").val(e.afterSportGlu),1==e.sex?$("#male").attr("checked",!0):2==e.sex&&$("#female").attr("checked",!0),1==e.signConsent?$("#yes").attr("checked",!0):2==e.signConsent&&$("#no").attr("checked",!0),1==e.isInjectingInsulin?$("#male2").attr("checked",!0):2==e.isInjectingInsulin&&$("#female2").attr("checked",!0),$(".ages").val(e.age),l(e),$(".phone1").val(e.contactInfo1),$(".phone").val(e.contactInfo2);var t=e.uuid;window.localStorage.setItem("data_recordId",t),$(".select6").select2({});var a=e.diabeticComplication.split(",");$(".select6").val(a).trigger("change"),$(".diabetes-history").val(e.diabeticHistory).trigger("change"),$(".shrinkage").val(e.diastolicPressure).trigger("change"),$(".dietSituation").val(e.dietSituation).trigger("change"),$(".prescription").val(e.exercisePrescription).trigger("change"),$(".select3").select2({});var i=e.familyHistory.split(",");$(".select3").val(i).trigger("change"),$(".blood-glucose").val(e.glu),$(".laboratory1").val(e.hba1c).trigger("change"),$(".laboratory4").val(e.hdlcLevel).trigger("change"),$(".height").val(e.height),1==e.isInjectingInsulin?$(".magic1").attr("checked",!0):2==e.isInjectingInsulin&&$(".magic2").attr("checked",!0),$(".hospital").val(e.mechanism).trigger("change"),$(".diseases").select2({});var o=e.medicalHistory.split(",");$(".diseases").val(o).trigger("change"),$(".capacity").val(e.metValue),$(".movementSituation").val(e.movementSituation).trigger("change"),$(".select5").select2({});var n=e.oralMedicine.split(",");$(".select5").val(n).trigger("change"),$(".select1").select2({});var s=e.parqResult.split(",");$(".select1").val(s).trigger("change"),$(".names").val(e.patientName),$(".form-control4").val(e.profession).trigger("change"),$(".comment").val(e.remark),$(".resting").val(e.restingHeartRate),$(".form-control3").val(e.sectionType).trigger("change"),$(".sleepQuality").val(e.sleepQuality).trigger("change"),$(".smokingHistory").val(e.smokingHistory).trigger("change"),$(".select4").select2({});var r=e.symptomSign.split(",");$(".select4").val(r).trigger("change"),$(".compression").val(e.systolicPressure),$(".testDate").val(e.testDate),$(".questionnaire-data").find("p").text(e.testDate),$(".form-control2").val(e.testPhase).trigger("change"),$(".test_scheme").val(e.testPlan).trigger("change"),$(".laboratory3").val(e.totalCholesterolLevel).trigger("change"),$(".laboratory2").val(e.triglyceride).trigger("change"),$(".weight").val(e.weight)}}),$(".page-compile").on("click",function(){$(this).hide(),$(".page-off").show(),$("input").attr("disabled",!1),$("select").removeAttr("disabled"),$("textarea").removeAttr("disabled")}),$(".page-call").on("click",function(){$(".page-off").hide(),$(".page-compile").show(),window.history.go(0)}),$(".form-control1").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control2").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control3").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control4").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control5").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control6").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control7").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control8").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control9").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control10").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control11").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control12").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control13").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control14").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control15").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control16").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control17").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control18").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control19").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control20").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control21").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"}),$(".form-control22").select2({placeholder:"点击选择",allowClear:!0,minimumResultsForSearch:-1,language:"zh-CN"})}(),i.prototype={bind:function(){var e=this;$(".select1").on("change",function(){e.dataArr1=[];var t=$(".select1").select2("data");0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".select1").val(t).trigger("change"));for(var a in t)e.dataArr1.push(parseInt(t[a].id))}),$(".select3").on("change",function(){var t=$(".select3").select2("data");e.dataArr2=[],0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".select3").val(t).trigger("change"));for(var a in t)e.dataArr2.push(parseInt(t[a].id))}),$(".select4").on("change",function(){var t=$(".select4").select2("data");e.dataArr4=[],0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".select4").val(t).trigger("change"));for(var a in t)e.dataArr4.push(parseInt(t[a].id))}),$(".select5").on("change",function(){var t=$(".select5").select2("data");e.dataArr5=[],0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".select5").val(t).trigger("change"));for(var a in t)e.dataArr5.push(parseInt(t[a].id))}),$(".select6").on("change",function(){var t=$(".select6").select2("data");e.dataArr6=[],0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".select6").val(t).trigger("change"));for(var a in t)e.dataArr6.push(parseInt(t[a].id))}),$(".diseases").on("change",function(){var t=$(".diseases").select2("data");e.dataArr7=[],0!=t.length&&1==t[0].id&&t.length>1&&(t.shift(),$(".diseases").val(t).trigger("change"));for(var a in t)e.dataArr7.push(parseInt(t[a].id))}),$(".page-save").on("click",function(){e.submitResult(),s(),r(),c(),h(),d(),g(),u(),p(),v(),f(),w()})},submitResult:function(){var e=$(".a-hospital").val(),t=$(".a-data").text(),a=$(".registrationNum").text(),i=$(".form-control2 option:selected").val(),n=$(".form-control3 option:selected").val(),s=$(".names").val(),r=$("input[name='sex']:checked").val(),c=$("input[name='agree']:checked").val(),d=$(".select2-selection option:selected").val(),h=$(".phone1").val(),g=$(".ages").val(),m=$(".phone").val(),u=$(".resting").val(),p=$(".weight").val(),v=$(".blood-glucose").val(),f=$(".blood_glucose_queen").val(),w=$(".height").val();l({weight:p,height:w});var b=$(".compression").val(),C=$(".shrinkage").val(),x=$(".bmi").text(),S=$(".laboratory1 option:selected").val(),I=$(".laboratory2 option:selected").val(),y=$(".laboratory3 option:selected").val(),k=$(".laboratory4 option:selected").val(),A=this.dataArr1,R=A.join(","),N=this.dataArr7,F=N.join(","),z=$(".test_scheme option:selected").val(),q=$(".capacity").val(),D=$(".diabetes-history option:selected").val(),_=$(".prescription option:selected").val(),j=this.dataArr2,T=j.join(","),H=this.dataArr4,P=H.join(","),O=$(".smokingHistory option:selected").val(),B=$(".movementSituation option:selected").val(),L=$(".sleepQuality option:selected").val(),Q=$(".dietSituation option:selected").val(),E=this.dataArr5,M=E.join(","),G=$("input[name='insulin']:checked").val(),J=this.dataArr6,V=J.join(","),W=$(".comment").val(),U=window.localStorage.getItem("reportType1"),Z=window.localStorage.getItem("utClinic"),K=window.localStorage.getItem("uidClinic"),X=window.localStorage.getItem("data_recordId"),Y={uuid:X,reportId:window.localStorage.getItem("reportId"),reportType:U,mechanism:e,testDate:t,registrationNum:a,testPhase:i,sectionType:n,patientName:s,contactInfo1:h,contactInfo2:m,profession:d,sex:r,age:g,height:w,weight:p,bmiIndex:x,restingHeartRate:u,systolicPressure:b,diastolicPressure:C,glu:v,afterSportGlu:f,hba1c:S,triglyceride:I,totalCholesterolLevel:y,hdlcLevel:k,parqResult:R,testPlan:z,metValue:q,exercisePrescription:_,diabeticHistory:D,familyHistory:T,medicalHistory:F,symptomSign:P,smokingHistory:O,sleepQuality:L,movementSituation:B,dietSituation:Q,isInjectingInsulin:G,oralMedicine:M,diabeticComplication:V,remark:W,signConsent:c};""==s||""==h||""==g||""==u||""==p||""==v||""==w||""==b||""==C||""==A||""==q||""==j||""==H||""==E||""==J||""==f||""==Q||""==L||""==B||""==O||""==P||""==T||""==F||""==R||""==n||""==c||""==r||""==G?swal({title:"带星是必填的！",type:"info",showConfirmButton:!0,confirmButtonText:"确定",timer:2e3,confirmButtonColor:"#009CAA"}):$.ajax({type:"POST",url:window.urlHandler("questionnaire/edit",K,Z),dataType:"json",data:JSON.stringify(Y),contentType:"application/json",success:function(e){200==e.status?(swal({title:"保存成功！",type:"success",showConfirmButton:!0,confirmButtonText:"确定",timer:2e3,confirmButtonColor:"#009CAA"}),o()):swal({title:"保存失败，请核查填入内容！",type:"info",showConfirmButton:!0,confirmButtonText:"确定",timer:2e3,confirmButtonColor:"#009CAA"})}})}},new i,$(".names").blur(n),$(".phone").blur(s),$(".phone1").blur(r),$(".ages").blur(c),$(".resting").blur(d),$(".weight").blur(h),$(".blood-glucose").blur(g),$(".blood_glucose_queen").blur(m),$(".height").blur(u),$(".compression").blur(p),$(".shrinkage").blur(v),$(".capacity").blur(f),$(".comment").blur(w)},44:function(e,t,a){e.exports=a(23)}},[44]);