function BarDom() {
    this.init();
}

BarDom.prototype = {
    init:function(){
        this.domRender();
        this.bindEvent();
        // this.setMinHeight();
    },
    domRender:function(){
        var localSidebarDom = window.localStorage.getItem('localSidebarDom');
        var localheaderDom = window.localStorage.getItem('localheaderDom');
        if(localSidebarDom==null){
            this.sidebarDomRender();
            this.locationSetActive();
        }else{
            $('.page-sidebar-wrapper').html('');
            $(localSidebarDom).appendTo('.page-sidebar-wrapper');
            if($('.page-sidebar').hasClass('closed')){
                $('.page-content').addClass('open');
            }else{
                $('.page-content').removeClass('open');
            }
            this.locationSetActive();
        }

        if(localheaderDom == null){
            this.headerDomRender();
        }else{
            $('.page-header').html('');
            $(localheaderDom).appendTo('.page-header');
        }

        this.footerDomRender();
    },
    headerDomRender: function() {
        var headerDom = '<div class="page-header-inner ">' +
                            '<div class="page-logo">' +
                                '<a href="../report/common.html">' +
                                '<img src="../../img/logo.png" alt="logo" class="logo-default">' +
                                '</a>' +
                            '<div class="menu-toggler">' +
                            '<i class="fa fa-bars" style="color:#fff;font-size:2rem;"></i>' +
                            '</div>' +
                            '</div>' +
                            '<div class="build-version">科研版' +

                            '</div>' +
                            '<div class="welcome-func">' +
                            '<ul class="welcome-func-list">' +
                            '<li class="welcome-user">' +
                            '<img alt="" class="welcome-userimg img-circle" src="../../img/avatar_default.png">' +
                            '<span class="welcome-username"></span>' +
                            '<ul class="welcome-user-menu">' +
                            '<li>' +
                            '<i class="fa fa-question-circle"></i>'+
                            '<a href="#">帮助</a>' +
                            '</li>' +
                            '<li class="logout-btn">' +
                            '<i class="fa fa-sign-out"></i>'+
                            '<a href="../login.html">登出</a>' +
                            '</li>' +
                            '</ul>' +
                            '</li>' +
                            '</ul>' +
                            '</div>' +

                        '</div>';

        $(headerDom).appendTo(".page-header");
        this.getWelcomeInfo();
    },
    sidebarDomRender:function(){
        var sidebarList = [
            {
                icon:'icon-bar-chart',
                title:'运动报告管理',
                link:'#',
                permission:[1,2,3],
                childItem:[
                    {
                        link:'../report/common.html',
                        title:'常规运动报告'
                    },
                    {
                        link:'../report/aerobic.html',
                        title:'515有氧能力测试报告'
                    },
                    {
                        link:'../report/rockport.html',
                        title:'Rockport测试报告'
                    },
                    {
                        link:'../report/4min_walk.html',
                        title:'跑步机四分钟走测试报告'
                    }
                ]
            },
            {
                icon:'icon-users',
                title:'客户管理',
                link:'#',
                permission:[1,2,3],
                childItem:[
                    {
                        link:'../customer/info.html',
                        title:'客户信息'
                    }
                ]
            },
            {
                icon:'icon-pie-chart',
                title:'数据统计',
                link:'#',
                permission:[2],
                childItem:[
                    {
                        link:'../stats/stats.html',
                        title:'数据统计报告'
                    }
                ]
            }
        ];


        var permission = parseInt(window.localStorage.getItem('auClinic'));
        for(var i=0;i<sidebarList.length;i++){
            if(sidebarList[i].permission.indexOf(permission)!=-1){
                var childItemHtml = '';
                for(var j=0;j<sidebarList[i].childItem.length;j++){
                    childItemHtml = childItemHtml +'<li class="nav-item">' +
                        '<a href="'+ sidebarList[i].childItem[j].link +'" class="nav-link ">' +
                        '<span class="title">'+ sidebarList[i].childItem[j].title +'</span>' +
                        '</a>' +
                        '</li>';
                }
                if(sidebarList[i].childItem.length==0){
                    var itemHtml = '<li class="nav-item">'+
                        '<a href="'+ sidebarList[i].link +'" class="nav-link nav-toggle">' +
                        '<i class="'+ sidebarList[i].icon +'"></i>' +
                        '<span class="title">'+ sidebarList[i].title +'</span>' +
                        '</a>' +
                        '</li>';
                }else{
                    var itemHtml = '<li class="nav-item">'+
                        '<a href="'+ sidebarList[i].link +'" class="nav-link nav-toggle">' +
                        '<i class="'+ sidebarList[i].icon +'"></i>' +
                        '<span class="title">'+ sidebarList[i].title +'</span>' +
                        '<span class="arrow"></span>' +
                        '</a>' +
                        '<ul class="sub-menu">' +
                        childItemHtml +
                        '</ul>' +
                        '</li>';
                }

                $(itemHtml).appendTo('.page-sidebar-menu');
            }
        }
        window.localStorage.setItem('localSidebarDom',$('.page-sidebar-wrapper').html());
    },
    footerDomRender:function(){
        var footerDom = '<div class="page-footer-inner">' +
            '2016 &copy; 加动健康科技（深圳）有限公司' +
            '</div>' +
            '<div class="scroll-to-top">' +
            '<i class="icon-arrow-up"></i>' +
            '</div>';

        $(footerDom).appendTo(".page-footer");
    },
    getWelcomeInfo:function(){
        var userImgUrl = window.localStorage.getItem('userImgUrlClinic');
        var userNickName = window.localStorage.getItem('userNickNameClinic');
        if(userImgUrl == 'undefined'|| userImgUrl == 'null'){
            $('.welcome-userimg').attr('src','../../img/avatar_default.png');
        }else{
            $('.welcome-userimg').attr('src',userImgUrl);
        }
        if(userNickName == 'undefined'|| userNickName == 'null'){
            $('.welcome-username').text('管理员');
        }else{
            $('.welcome-username').text(userNickName);
        }
    },
    bindEvent:function(){

        $('.page-sidebar-menu>li>a').on('click',function(e){
            e.preventDefault();
        });

        $('.page-sidebar-menu>li').on('click',function(){
            if(!$(this).hasClass('open')){
                $('.page-sidebar-menu>li').removeClass('open');
                $(this).addClass('open');
            }else{
                $(this).removeClass('open');
            }
            window.localStorage.setItem('localSidebarDom',$('.page-sidebar-wrapper').html());
        });

        $('.page-sidebar-menu>li .sub-menu>li').on('click',function(e){
            e.stopPropagation();
            if(!$(this).hasClass('active')){
                $(this).parents().find('.page-sidebar-menu>li>ul>li').removeClass('active');
                $(this).addClass('active');
            }
            window.localStorage.setItem('localSidebarDom',$('.page-sidebar-wrapper').html());
        });

        $('.page-logo .menu-toggler').on('click',function(){
            if(!$('.page-sidebar').hasClass('closed')){
                $('.page-sidebar').addClass('closed');
                $('.page-content').addClass('open');
                $('.page-footer').addClass('open');
                $('.page-logo').addClass('closed');
            }else{
                $('.page-sidebar').removeClass('closed');
                $('.page-content').removeClass('open');
                $('.page-footer').removeClass('open');
                $('.page-logo').removeClass('closed');
            }
            window.localStorage.setItem('localSidebarDom',$('.page-sidebar-wrapper').html());
            window.localStorage.setItem('localheaderDom',$('.page-header').html());
        });

        $('.logout-btn').on('click',function(){
            window.localStorage.clear();
        });

    },
    // setMinHeight:function(){
    //     if($('.page-content').height()>$('.page-sidebar-wrapper').height()){
    //         $('.page-content').css({'min-height':$('.page-content').height()+30});
    //     }else{
    //         $('.page-content').css({'min-height':$('.page-sidebar-wrapper').height()-50});
    //     }
    // },
    locationSetActive:function(){
        if(window.location.href.indexOf('common')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li:first').addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li:first .sub-menu li').eq(0).addClass('active');
        }
        if(window.location.href.indexOf('aerobic')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li:first').addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li:first .sub-menu li').eq(1).addClass('active');
        }
        if(window.location.href.indexOf('rockport')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li:first').addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li:first .sub-menu li').eq(2).addClass('active');
        }
        if(window.location.href.indexOf('4min_walk')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li:first').addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li:first .sub-menu li').eq(3).addClass('active');
        }
        if(window.location.href.indexOf('info')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li').eq(1).addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li').eq(1).find('.sub-menu li').eq(0).addClass('active');
        }
        if(window.location.href.indexOf('stats')!= -1){
            $('.page-sidebar-menu>li').removeClass('open');
            $('.page-sidebar-menu>li').eq(2).addClass('open');
            $('.page-sidebar-menu>li .sub-menu li').removeClass('active');
            $('.page-sidebar-menu>li').eq(2).find('.sub-menu li').eq(0).addClass('active');
        }
        window.localStorage.setItem('localSidebarDom',$('.page-sidebar-wrapper').html());
    }
};

new BarDom();