webpackJsonp([5],{0:function(e,a){function t(){this.init()}t.prototype={init:function(){this.domRender(),this.bindEvent()},domRender:function(){var e=window.localStorage.getItem("localSidebarDom"),a=window.localStorage.getItem("localheaderDom");null==e?(this.sidebarDomRender(),this.locationSetActive()):($(".page-sidebar-wrapper").html(""),$(e).appendTo(".page-sidebar-wrapper"),$(".page-sidebar").hasClass("closed")?$(".page-content").addClass("open"):$(".page-content").removeClass("open"),this.locationSetActive()),null==a?this.headerDomRender():($(".page-header").html(""),$(a).appendTo(".page-header")),this.footerDomRender()},headerDomRender:function(){$('<div class="page-header-inner "><div class="page-logo"><a href="../report/common.html"><img src="../../img/logo.png" alt="logo" class="logo-default"></a><div class="menu-toggler"><i class="fa fa-bars" style="color:#fff;font-size:2rem;"></i></div></div><div class="build-version">科研版</div><div class="welcome-func"><ul class="welcome-func-list"><li class="welcome-user"><img alt="" class="welcome-userimg img-circle" src="../../img/avatar_default.png"><span class="welcome-username"></span><ul class="welcome-user-menu"><li><i class="fa fa-question-circle"></i><a href="#">帮助</a></li><li class="logout-btn"><i class="fa fa-sign-out"></i><a href="../login.html">登出</a></li></ul></li></ul></div></div>').appendTo(".page-header"),this.getWelcomeInfo()},sidebarDomRender:function(){for(var e=[{icon:"icon-bar-chart",title:"运动报告管理",link:"#",permission:[1,2,3],childItem:[{link:"../report/common.html",title:"常规运动报告"},{link:"../report/aerobic.html",title:"515有氧能力测试报告"},{link:"../report/rockport.html",title:"Rockport测试报告"},{link:"../report/4min_walk.html",title:"跑步机四分钟走测试报告"}]},{icon:"icon-users",title:"客户管理",link:"#",permission:[1,2,3],childItem:[{link:"../customer/info.html",title:"客户信息"}]},{icon:"icon-pie-chart",title:"数据统计",link:"#",permission:[2],childItem:[{link:"../stats/stats.html",title:"数据统计报告"}]}],a=parseInt(window.localStorage.getItem("auClinic")),t=0;t<e.length;t++)if(-1!=e[t].permission.indexOf(a)){for(var i="",n=0;n<e[t].childItem.length;n++)i=i+'<li class="nav-item"><a href="'+e[t].childItem[n].link+'" class="nav-link "><span class="title">'+e[t].childItem[n].title+"</span></a></li>";if(0==e[t].childItem.length)var o='<li class="nav-item"><a href="'+e[t].link+'" class="nav-link nav-toggle"><i class="'+e[t].icon+'"></i><span class="title">'+e[t].title+"</span></a></li>";else var o='<li class="nav-item"><a href="'+e[t].link+'" class="nav-link nav-toggle"><i class="'+e[t].icon+'"></i><span class="title">'+e[t].title+'</span><span class="arrow"></span></a><ul class="sub-menu">'+i+"</ul></li>";$(o).appendTo(".page-sidebar-menu")}window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())},footerDomRender:function(){$('<div class="page-footer-inner">2016 &copy; 加动健康科技（深圳）有限公司</div><div class="scroll-to-top"><i class="icon-arrow-up"></i></div>').appendTo(".page-footer")},getWelcomeInfo:function(){var e=window.localStorage.getItem("userImgUrlClinic"),a=window.localStorage.getItem("userNickNameClinic");"undefined"==e||"null"==e?$(".welcome-userimg").attr("src","../../img/avatar_default.png"):$(".welcome-userimg").attr("src",e),"undefined"==a||"null"==a?$(".welcome-username").text("管理员"):$(".welcome-username").text(a)},bindEvent:function(){$(".page-sidebar-menu>li>a").on("click",function(e){e.preventDefault()}),$(".page-sidebar-menu>li").on("click",function(){$(this).hasClass("open")?$(this).removeClass("open"):($(".page-sidebar-menu>li").removeClass("open"),$(this).addClass("open")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-sidebar-menu>li .sub-menu>li").on("click",function(e){e.stopPropagation(),$(this).hasClass("active")||($(this).parents().find(".page-sidebar-menu>li>ul>li").removeClass("active"),$(this).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}),$(".page-logo .menu-toggler").on("click",function(){$(".page-sidebar").hasClass("closed")?($(".page-sidebar").removeClass("closed"),$(".page-content").removeClass("open"),$(".page-footer").removeClass("open"),$(".page-logo").removeClass("closed")):($(".page-sidebar").addClass("closed"),$(".page-content").addClass("open"),$(".page-footer").addClass("open"),$(".page-logo").addClass("closed")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html()),window.localStorage.setItem("localheaderDom",$(".page-header").html())}),$(".logout-btn").on("click",function(){window.localStorage.clear()})},locationSetActive:function(){-1!=window.location.href.indexOf("common")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("aerobic")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(1).addClass("active")),-1!=window.location.href.indexOf("rockport")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(2).addClass("active")),-1!=window.location.href.indexOf("4min_walk")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li:first").addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li:first .sub-menu li").eq(3).addClass("active")),-1!=window.location.href.indexOf("info")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(1).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(1).find(".sub-menu li").eq(0).addClass("active")),-1!=window.location.href.indexOf("stats")&&($(".page-sidebar-menu>li").removeClass("open"),$(".page-sidebar-menu>li").eq(2).addClass("open"),$(".page-sidebar-menu>li .sub-menu li").removeClass("active"),$(".page-sidebar-menu>li").eq(2).find(".sub-menu li").eq(0).addClass("active")),window.localStorage.setItem("localSidebarDom",$(".page-sidebar-wrapper").html())}},new t},13:function(e,a,t){"use strict";function i(){this.ajaxLoading=!1,this.init()}Object.defineProperty(a,"__esModule",{value:!0});var n=t(0),o=(t.n(n),t(1)),l=(t.n(o),t(2));t.n(l);i.prototype.init=function(){null==window.localStorage.getItem("utClinic")?($("html,body").html(""),window.location.href="../login.html"):(this.requestPage(),this.theadSortEvent())},i.prototype.requestPage=function(e,a,t){var i=this,n=window.location.search,o=n.indexOf("?"),l=n.substr(o+1).split("="),s=l[0],r=l[1],d="";"metChange"==s?(d=1,1==r?$(".filter-title").text("客户信息(有氧能力降低)"):2==r?$(".filter-title").text("客户信息(有氧能力提高)"):3==r&&$(".filter-title").text("客户信息(有氧能力变化不明显)")):"weightChange"==s?(d=2,1==r?$(".filter-title").text("客户信息(体重减少)"):2==r?$(".filter-title").text("客户信息(体重增加)"):3==r&&$(".filter-title").text("客户信息(体重变化不明显)")):(d=3,1==r?$(".filter-title").text("客户信息(血糖降低)"):2==r?$(".filter-title").text("客户信息(血糖升高)"):3==r&&$(".filter-title").text("客户信息(血糖变化不明显)"));var c=window.localStorage.getItem("utClinic"),p=window.localStorage.getItem("uidClinic");if(!this.ajaxLoading){this.ajaxLoading=!0;var g={pageNo:e,pageSize:t,userId:p,username:a,key:d,value:r,sort:window.localStorage.getItem("sortType")};$.ajax({url:window.urlHandler("statistical/getMembers",p,c),method:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(g)}).done(function(e){200==e.status&&($(".table-manager").find("tbody").html(""),$(".pagination").html(""),$(".table-mask-box").show(),i.renderTable(e.data),i.initPagination(e.data.pages)),window.dataErrorHandler(e),i.ajaxLoading=!1}).fail(function(e){i.ajaxLoading=!1})}},i.prototype.resetSortType=function(){window.localStorage.removeItem("sortType")},i.prototype.theadSortEvent=function(){var e=this;window.onbeforeunload=function(){e.resetSortType()};for(var a=["","","1@1","","2@1","3@1","4@1","5@1"],t=["","","1@2","","2@2","3@2","4@2","5@2"],i=0;i<a.length;i++)!function(i){$(".table-manager thead tr th").eq(i).off("click").on("click",function(){null==window.localStorage.getItem("sortType")?(window.localStorage.setItem("sortType",a[i]),e.requestPage("",$(".search-input").val(),e.pageSize,e.coachId),$(this).find("i").removeClass(),$(this).find("i").addClass("fa fa-sort-desc")):window.localStorage.getItem("sortType")==t[i]?(e.resetSortType(),e.requestPage("",$(".search-input").val(),e.pageSize,e.coachId),$(this).find("i").removeClass(),$(this).find("i").addClass("fa fa-sort")):window.localStorage.getItem("sortType")==a[i]?(window.localStorage.setItem("sortType",t[i]),e.requestPage("",$(".search-input").val(),e.pageSize,e.coachId),$(this).find("i").removeClass(),$(this).find("i").addClass("fa fa-sort-asc"),$(this).addClass("down")):(window.localStorage.setItem("sortType",a[i]),e.requestPage("",$(".search-input").val(),e.pageSize,e.coachId),$(".table-manager thead tr th").find("i").removeClass().addClass("fa fa-sort"),$(this).find("i").addClass("fa fa-sort-desc"))})}(i)},i.prototype.renderTable=function(e){$(".table-mask-box").hide();var a=$(".table-manager").find("tbody"),t=e.list;if(0==t.length){var i="<tr><td>无相关记录</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td><td>--</td></tr>";$(i).appendTo(a),$(".pagination-block").hide()}else{for(var n=0;n<t.length;n++){var i="<tr><td>"+t[n].username+"</td><td>"+window.formatSex(t[n].sex)+"</td><td>"+window.nullFormat(t[n].age)+"</td><td>"+window.nullFormat(t[n].phone)+"</td><td>"+window.nullFormat(t[n].height)+"cm</td><td>"+window.nullFormat(t[n].weight)+"kg</td><td>"+window.nullFormat(t[n].commitDate)+"</td><td>"+window.nullFormat(t[n].commitTimes)+'次</td><td><a class="info-history" href="../customer/info_history.html" data-uuid="'+t[n].memberId+'" data-customerid="'+t[n].id+'">查看</a>';$(i).appendTo(a)}$(".pagination-block").show();var o=e.pageNum;window.localStorage.setItem("pageNow",o)}this.bindEvent()},i.prototype.bindEvent=function(){var e=this;$(".info-history").on("click",function(){var e=$(this).attr("data-uuid"),a=$(this).attr("data-customerid");window.localStorage.setItem("customerUUID",e),window.localStorage.setItem("customerId",a)}),$(".search-input").on("keyup",function(a){13==a.keyCode&&e.requestPage("",$(".search-input").val(),"")})},i.prototype.initPagination=function(e){$('<li class="pagination-prev"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>').appendTo($(".pagination")),this.pageLength=e;var a=parseInt(window.localStorage.getItem("pageNow"));if(e>5&&6!=e){if(a>=5&&a<=e-4){var t='<li><a href="#">1</a></li><li class="paitem-dot"><a href="#">...</a></li>';$(t).appendTo($(".pagination"));for(var i=a;i<a+3;i++){var n='<li><a href="#">'+i+"</a></li>";$(n).appendTo($(".pagination"))}var o='<li class="paitem-dot"><a href="#">...</a></li><li><a href="#">'+e+"</a></li>";$(o).appendTo($(".pagination"))}if(a<5){for(var i=1;i<=5;i++){var n='<li><a href="#">'+i+"</a></li>";$(n).appendTo($(".pagination"))}var o='<li class="paitem-dot"><a href="#">...</a></li><li><a href="#">'+e+"</a></li>";$(o).appendTo($(".pagination"))}if(a>=5&&a>e-4){var t='<li><a href="#">1</a></li><li class="paitem-dot"><a href="#">...</a></li>';$(t).appendTo($(".pagination"));for(var i=e-4;i<=e;i++){var n='<li><a href="#">'+i+"</a></li>";$(n).appendTo($(".pagination"))}}}else if(6==e)for(var i=1;i<=e;i++){var n='<li><a href="#">'+i+"</a></li>";$(n).appendTo($(".pagination"))}else for(var i=1;i<=e;i++){var n='<li><a href="#">'+i+"</a></li>";$(n).appendTo($(".pagination"))}$('<li class="pagination-next"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>').appendTo($(".pagination")),this.paBind()},i.prototype.paBind=function(){var e=this;$(".pagination li").on("click",function(a){e.requestPage($(this).find("a").text(),$(".search-input").val(),e.pageSize,e.coachId),a.preventDefault()}),$(".pagination li:first").off("click"),$(".pagination li:last").off("click"),$(".paitem-dot").off("click"),$(".pagination-prev").on("click",function(a){a.preventDefault();var t=window.localStorage.getItem("pageNow");1!=t?e.requestPage(parseInt(t)-1,$(".search-input").val(),e.pageSize,e.coachId):swal({title:"提示",text:"已经是第一页了！",type:"info",showConfirmButton:!0,confirmButtonText:"确定",timer:2e3,confirmButtonColor:"#009CAA"})}),$(".pagination-next").on("click",function(a){a.preventDefault();var t=window.localStorage.getItem("pageNow");t!=e.pageLength?e.requestPage(parseInt(t)+1,$(".search-input").val(),e.pageSize,e.coachId):swal({title:"提示",text:"已经是最后一页了！",type:"info",showConfirmButton:!0,confirmButtonText:"确定",timer:2e3,confirmButtonColor:"#009CAA"})}),$(".search-input").on("blur",function(){""==$(".search-input").val()&&e.requestPage()}),$(".paitem-dot").on("click",function(e){e.preventDefault()}),$(".pagination li").each(function(){$(this).text()==window.localStorage.getItem("pageNow")&&$(this).addClass("active")}),$(".page-index").on("keyup",function(a){13==a.keyCode&&e.requestPage($(".page-index-input").val(),$(".search-input").val(),e.pageSize,e.coachId),$(".page-index-input").val()>e.pageLength&&$(".page-index-input").val(e.pageLength)}),$(".page-index span").on("click",function(a){e.requestPage($(".page-index-input").val(),$(".search-input").val(),e.pageSize,e.coachId),$(".page-index-input").val()>e.pageLength&&$(".page-index-input").val(e.pageLength)}),$(".pagesize-selector").on("change",function(a){e.pageSize=$(this).val(),e.requestPage($(".page-index-input").val(),$(".search-input").val(),e.pageSize,e.coachId)})},new i},34:function(e,a,t){e.exports=t(13)}},[34]);