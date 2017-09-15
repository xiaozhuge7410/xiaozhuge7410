import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function InfoHistory(){
    this.init();
}

InfoHistory.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        window.localStorage.setItem('reportType','4');
        this.requestCustomerData();
        this.requestTable();
        this.bind();
    }
};

InfoHistory.prototype.requestCustomerData = function(){
    var _this = this;
    var ajaxLoading = false;
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var customerId = window.localStorage.getItem('customerUUID');
    var reqUrl = 'customer/findByCustomerUuid';
    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'post',
            data:{
                customerId:customerId
            }
        }).done(function(res){
            if(res.status==200){
                _this.renderInfo(res.datas.userInfo);
            }
            ajaxLoading = false;
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};


InfoHistory.prototype.renderInfo = function(data){
    $('.userinfo-detail-list li').eq(0).find('img').attr('src',data.icon_url);
    $('.userinfo-detail-list li').eq(1).find('p').text(window.nullFormat(data.id));
    $('.userinfo-detail-list li').eq(2).find('p').text(window.nullFormat(data.nick_name));
    $('.userinfo-detail-list li').eq(3).find('p').text(window.formatSex(data.sex));
    $('.userinfo-detail-list li').eq(4).find('p').text(window.nullFormat(data.age));
    $('.userinfo-detail-list li').eq(5).find('p').text(window.cityNullFormat(data.province)+window.cityNullFormat(data.city));
    $('.userinfo-detail-list li').eq(6).find('p').text(window.nullFormat(data.height)+'cm');
    $('.userinfo-detail-list li').eq(7).find('p').text(window.nullFormat(data.weight)+'kg');
    $('.userinfo-detail-list li').eq(8).find('p').text(window.zeroFormat(data.motion_number)+'次');
    $('.userinfo-detail-list li').eq(9).find('p').text(window.cutTimeUntilSeconds(data.last_upload_time));
    $('.userinfo-detail-list li').eq(10).find('p').text(window.nullFormat(data.register_time));

    $('.userinfo-remark').find('p').text(window.nullFormat(data.remarks));

    if(window.localStorage.getItem('auClinic') == '1'){
       $('.unbind-customer').hide();
    }
    //设置输入框和选择框内文字

    $('.info-input-group-ct ul li').eq(0).find('input').val(data.nick_name);

    if(data.sex == '1'){
        $('.info-input-group-ct ul li').eq(1).find('input').eq(0).attr("checked",true);
    }else if(data.sex == '0'){
        $('.info-input-group-ct ul li').eq(1).find('input').eq(1).attr("checked",true);
    }

    if(data.birthday != null){
        this.birthDivider(data.birthday);
        $('.sel_year').attr('rel',this.birthArr[0]);
        $('.sel_month').attr('rel',this.birthArr[1]);
        $('.sel_day').attr('rel',this.birthArr[2]);
    }


    $.ms_DatePicker({
        YearSelector: ".sel_year",
        MonthSelector: ".sel_month",
        DaySelector: ".sel_day",
        FirstText: null,
        FirstValue: null
    });


    $(".sel_year").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $(".sel_month").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $(".sel_day").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $('.info-input-group-ct ul li').eq(3).find('input').val(data.height);
    $('.info-input-group-ct ul li').eq(4).find('input').val(data.weight);

    $('#city-selector').citys({province:data.province,city:data.city});

    $(".province-select").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $(".city-select").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $('.info-input-group-ct ul li').eq(6).find('textarea').val(data.remarks);



};

InfoHistory.prototype.birthDivider = function(str){
    this.birthArr = [];
    this.birthArr = str.split('/');
};

InfoHistory.prototype.birthJoiner = function(){
    var birthYear = $('.sel_year').val();
    var birthMonth = $('.sel_month').val();
    var birthDay = $('.sel_day').val();
    return birthYear+'/'+ window.getZeroFormat(birthMonth) +'/'+ window.getZeroFormat(birthDay);
};

InfoHistory.prototype.bind = function(){
    var _this = this;
    var writingStatus = false;

    $('.start-date-form').daterangepicker({
        autoUpdateInput: false,
        singleDatePicker:true,
        maxDate:new Date(),
        locale : {
            applyLabel : '确定',
            cancelLabel : '清空',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            customRangeLabel : '自定义',
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                '七月', '八月', '九月', '十月', '十一月', '十二月' ],
            firstDay : 1
        }
    });

    $('.start-date-form').on('apply.daterangepicker', function(ev, picker) {
        _this.stDate = picker.startDate;
        $(this).find('input').val(picker.startDate.format('YYYY-MM-DD'));
        window.localStorage.setItem('startTime',$(this).find('input').val()+' 00:00:00');
        $(this).find('.fa-close').show();
        $('.end-date-form').daterangepicker({
            autoUpdateInput: false,
            singleDatePicker:true,
            minDate:picker.startDate._d,
            maxDate:new Date(),
            locale : {
                applyLabel : '确定',
                cancelLabel : '清空',
                fromLabel : '起始时间',
                toLabel : '结束时间',
                customRangeLabel : '自定义',
                daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                firstDay : 1
            }
        });
        $('.end-date-form').on('apply.daterangepicker', function(ev, picker) {
            $(this).find('input').val(picker.endDate.format('YYYY-MM-DD'));
            window.localStorage.setItem('endTime',$(this).find('input').val()+' 23:59:59');
            $(this).find('.fa-close').show();
        });

        $('.end-date-form i.fa-close').on('click',function(){
            $(this).parent().find('input').val('');
            window.localStorage.removeItem('endTime');
            $(this).hide();
        })
    });

    $('.start-date-form i.fa-close').on('click',function(){
        $(this).parent().find('input').val('');
        window.localStorage.removeItem('startTime');
        $(this).hide();
    });

    $('.search-commit-btn').on('click',function(){
        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),'');
    });

    $(".report-select").select2({
        minimumResultsForSearch: -1,
        language: 'zh-CN'
    });

    $('.report-select').on('change',function(e){
        var selectedReportType = $(this).find('option:selected').attr('data-type');
        window.localStorage.setItem('reportType',selectedReportType);
        _this.requestTable();
        $('.start-date-form').find('input').val('');
        $('.end-date-form').find('input').val('');
        window.localStorage.removeItem('startTime');
        window.localStorage.removeItem('endTime');
    });

    $('.name-input').on('keyup',function(e){
        var IllegalString = "[`~!#$^&*()=|%{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
        var textboxvalue = $(this).val();
        var index = textboxvalue.length - 1;

        var s = $(this).val().charAt(index);

        if (IllegalString.indexOf(s) >= 0) {
            s = textboxvalue.substring(0, index);
            $(this).val(s);
        }
    })

    $('.height-input').on('keypress',function(e){
        return event.keyCode>=48&&event.keyCode<=57;
    })

    $('.weight-input').on('keypress',function(e){
        return event.keyCode>=48&&event.keyCode<=57;
    })

    $('.save-info-input').on('click',function(){
        var reqUrl = 'customer/updateCustomerInfo';
        var token = window.localStorage.getItem('utClinic');
        var uuid = window.localStorage.getItem('uidClinic');
        var customerId = window.localStorage.getItem('customerUUID');

        var nameVal = $('.name-input').val();
        var sexVal = $('input:radio[name=sex]:checked').val();
        var birthVal = _this.birthJoiner();

        var heightVal = $('.height-input').val();
        var weightVal = $('.weight-input').val();
        var provinceVal = $('#city-selector select').eq(0).find('option:selected').text();
        var cityVal = $('#city-selector select').eq(1).find('option:selected').text();
        var remarksVal = $('.info-input-group-ct ul li').eq(6).find('textarea').val();
        if(nameVal==''||sexVal==''||birthVal==''||heightVal==''||weightVal==''||provinceVal==''||cityVal==''){
            $('.type-error-alert').text('以上信息除备注外均不能为空！');
            $('.type-error-alert').fadeIn();
            setTimeout(function(){
                $('.type-error-alert').fadeOut();
            },2000);
        }else{
            $.ajax({
                url:window.urlHandler(reqUrl,uuid,token),
                method : 'POST',
                data:{
                    uuid:customerId,
                    nick_name:nameVal,
                    sex:sexVal,
                    birthday:birthVal,
                    height:heightVal,
                    weight:weightVal,
                    province:provinceVal,
                    city:cityVal,
                    remarks:remarksVal
                }
            }).done(function(res){
                if(res.status==200){
                    _this.requestCustomerData();
                    $('#rewriteModal').modal('hide');
                    swal({
                        title:'提示',
                        text: '保存成功！',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
                if(res.status==501){
                    $('.type-error-alert').text('以上信息除备注外均不能为空！');
                    $('.type-error-alert').fadeIn();
                    setTimeout(function(){
                        $('.type-error-alert').fadeOut();
                    },2000);
                }
            }).fail(function(err){
                $('#rewriteModal').modal('hide');
                swal({
                    title:'提示',
                    text: '保存失败！',
                    type: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
        }
    })

    $('.unbind-customer-confirm').on('click',function(){
        var reqUrl = 'customer/deleteByUserCoachId';
        var token = window.localStorage.getItem('utClinic');
        var uuid = window.localStorage.getItem('uidClinic');
        var customerId = window.localStorage.getItem('customerUUID');
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            data:{
                customerId:customerId
            }
        }).done(function(res){
            if(res.status==200){
                $('#unbindModal').modal('hide');
                swal({
                    title:'提示',
                    text: '解绑成功！',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            window.dataErrorHandler(res);
        }).fail(function(err){
            $('#unbindModal').modal('hide');
            swal({
                title:'提示',
                text: '解绑失败！',
                type: 'error',
                showConfirmButton: false,
                timer: 2000
            })
        })
    });

    window.onbeforeunload = function(){
        window.localStorage.removeItem('startTime');
        window.localStorage.removeItem('endTime');
        window.localStorage.removeItem('reportType');
        _this.resetSortType();
    }
};

InfoHistory.prototype.requestTable = function(page,beginTime,endTime,pageSize){
    var _this = this;
    var ajaxLoading = false;
    var reqUrl = 'customer/queryByUserIdHistory';
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    var customerId = window.localStorage.getItem('customerUUID');

    var selectedReportType = $('.report-select option:selected').attr('data-type');
    window.localStorage.setItem('reportType',selectedReportType);

    if(!ajaxLoading){
        ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            data:{
                customerId:customerId,
                page:page,
                pageSize:pageSize,
                beginTime:beginTime,
                endTime:endTime,
                type:window.localStorage.getItem('reportType'),
                sortType:window.localStorage.getItem('sortType')
            }
        }).done(function(res){
            if(res.status==200){
                $('.table-manager').find('tbody').html('');
                $('.pagination').html('');
                $('.table-mask-box').show();
                _this.renderTable(res);
                if(window.localStorage.getItem('reportType')=='1'){
                    _this.initPagination(res.datas.motionList.pages);
                }else{
                    _this.initPagination(res.datas.aerobicDataList.pages);
                }
                //请求到列表后清空排序类型
                if(window.localStorage.getItem('sortType')!=null){
                    window.localStorage.removeItem('sortType');
                }
            }
            ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            ajaxLoading = false;
        })
    }
};
InfoHistory.prototype.renderTable = function(data){
    $('.table-mask-box').hide();

    var $thead = $('.table-manager').find('thead');
    var $tbody = $('.table-manager').find('tbody');

    if(window.localStorage.getItem('reportType')=='1'){
        $('.report-header').text('常规运动报告');

        var dataList = data.datas.motionList.list;
        $('.common-tr').show();
        $('.aerobic-tr').hide();
        if(dataList.length==0){
            var tableItem = '<tr>'
                +'<td>无相关记录</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'</tr>';
            $(tableItem).appendTo($tbody);
            $('.pagination-block').hide();
        }else{
            for(var i=0;i<dataList.length;i++){
                var tableItem = '<tr>'
                    +'<td>'+ window.formatTime(dataList[i].create_time)+'</td>'
                    +'<td>'+ dataList[i].motion_sum_time+'</td>'
                    +'<td>'+ dataList[i].met_value+'MET</td>'
                    +'<td>'+ dataList[i].max_vo2+'ml/kg·min</td>'
                    +'<td>'+ dataList[i].avg_hr+'bpm</td>'
                    +'<td>'+ dataList[i].max_hr+'bpm</td>'
                    +'<td>'+ this.ifHasRisk(dataList[i].exercise_risk)+'</td>';
                if(dataList[i].questionnaireRecordId!=null){
                    tableItem +='<td><a class="report-detail" href="../report/common_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].id+'">报告</a>'+
                        '<a class="recordid-detail" href="../customer/Survey_report_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'"></a></td>'
                }else{
                    tableItem += '<td><a class="report-detail" href="../report/common_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].id+'">报告</a></td>'
                }
                tableItem += '</tr>';
                $(tableItem).appendTo($tbody);
            }
            $('.pagination-block').show();
            var pagenow = data.datas.motionList.pageNum;
            window.localStorage.setItem('pageNow',pagenow);
        }

    }else{
        var dataList = data.datas.aerobicDataList.list;
        $('.common-tr').hide();
        $('.aerobic-tr').show();
        if(dataList.length==0){
            var tableItem = '<tr>'
                +'<td>无相关记录</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'<td>--</td>'
                +'</tr>';
            $(tableItem).appendTo($tbody);
            $('.pagination-block').hide();
            if(window.localStorage.getItem('reportType')=='2'){
                $('.report-header').text('515有氧能力测试报告');
            }
            if(window.localStorage.getItem('reportType')=='3'){
                $('.report-header').text('Rockport测试报告');
            }
            if(window.localStorage.getItem('reportType')=='4'){
                $('.report-header').text('跑步机四分钟走测试报告');
            }
        }else{
            for(var i=0;i<dataList.length;i++){
                var tableItem = '<tr>'
                    +'<td>'+ window.nullFormat(dataList[i].create_time)+'</td>'
                    +'<td>'+ window.nullFormat(dataList[i].sport_sum_time)+'</td>'
                    +'<td>'+ dataList[i].met_value+'MET</td>'
                    +'<td>'+ dataList[i].vo2_max+'ml/kg·min</td>'
                    +'<td>'+ dataList[i].avg_heart+'bpm</td>'
                    +'<td>'+ dataList[i].max_heart+'bpm</td>'
                    +'<td>'+ dataList[i].avg_smo2+'%</td>'
                    +'<td>'+ dataList[i].min_smo2+'%</td>';

                if(window.localStorage.getItem('reportType')=='2') {
                    $('.report-header').text('515有氧能力测试报告');
                    if (dataList[i].questionnaireRecordId != null) {
                        tableItem += '<td><a class="report-detail" href="../report/aerobic_detail.html" data-recordId="' + dataList[i].questionnaireRecordId + '" data-reportid="' + dataList[i].id + '">报告</a>'
                            '<a class="recordid-detail" href="../customer/Survey_report_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'"></a></td></tr>';
                    }else{
                        tableItem += '<td><a class="report-detail" href="../report/aerobic_detail.html" data-recordId="' + dataList[i].questionnaireRecordId + '" data-reportid="' + dataList[i].id + '">报告</a></td></tr>';
                    }
                }
                if(window.localStorage.getItem('reportType')=='3'){
                    $('.report-header').text('Rockport测试报告');
                    if (dataList[i].questionnaireRecordId != null) {
                    tableItem += '<td><a class="report-detail" href="../report/rockport_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].id+'">报告</a>' +
                        '<a class="recordid-detail" href="../customer/Survey_report_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'"></a></td></tr>';
                }else{
                        tableItem += '<td><a class="report-detail" href="../report/rockport_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].id+'">报告</a></td></tr>';
                    }
                }

                if(window.localStorage.getItem('reportType')=='4') {
                    $('.report-header').text('跑步机四分钟走测试报告');
                    if (dataList[i].questionnaireRecordId != null) {
                        tableItem += '<td><a class="report-detail" href="../report/4min_walk_detail.html" data-recordId="' + dataList[i].questionnaireRecordId + '" data-reportid="' + dataList[i].id + '">报告</a>' +
                            '<a class="recordid-detail" href="../customer/Survey_report_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'"></a></td></tr>';
                    }else{
                        tableItem += '<td><a class="report-detail" href="../report/4min_walk_detail.html" data-recordId="' + dataList[i].questionnaireRecordId + '" data-reportid="' + dataList[i].id + '">报告</a></td></tr>';
                    }
                }
                $(tableItem).appendTo($tbody);
            }
            $('.pagination-block').show();
            var pagenow = data.datas.aerobicDataList.pageNum;
            window.localStorage.setItem('pageNow',pagenow);
        }

    }
    this.theadSortEvent();

};


InfoHistory.prototype.initPagination = function(num){
    var paPrev = '<li class="pagination-prev"><a href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
    var paNext = '<li class="pagination-next"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
    $(paPrev).appendTo($('.pagination'));

    this.pageLength = num;
    var pageNow = parseInt(window.localStorage.getItem('pageNow'));

    if(num>5&&num!=6){
        if(pageNow>=5 && pageNow<=num-4){
            var paStartItem = '<li><a href="#">1</a></li><li class="paitem-dot"><a href="#">...</a></li>';
            $(paStartItem).appendTo($('.pagination'));
            for(var i=pageNow;i<pageNow+3;i++){
                var paItem = '<li><a href="#">'+i+'</a></li>';
                $(paItem).appendTo($('.pagination'));
            }
            var paEndItem = '<li class="paitem-dot"><a href="#">...</a></li><li><a href="#">'+num+'</a></li>';
            $(paEndItem).appendTo($('.pagination'));
        }
        if(pageNow<5){
            for(var i=1;i<=5;i++){
                var paItem = '<li><a href="#">'+i+'</a></li>';
                $(paItem).appendTo($('.pagination'));
            }
            var paEndItem = '<li class="paitem-dot"><a href="#">...</a></li><li><a href="#">'+num+'</a></li>';
            $(paEndItem).appendTo($('.pagination'));
        }

        if(pageNow>=5 && pageNow>num-4){
            var paStartItem = '<li><a href="#">1</a></li><li class="paitem-dot"><a href="#">...</a></li>';
            $(paStartItem).appendTo($('.pagination'));
            for(var i=num-4;i<=num;i++){
                var paItem = '<li><a href="#">'+i+'</a></li>';
                $(paItem).appendTo($('.pagination'));
            }
        }
    }else if(num == 6){
        for(var i=1;i<=num;i++){
            var paItem = '<li><a href="#">'+i+'</a></li>';
            $(paItem).appendTo($('.pagination'));
        }
    }else{
        for(var i=1;i<=num;i++){
            var paItem = '<li><a href="#">'+i+'</a></li>';
            $(paItem).appendTo($('.pagination'));
        }
    }

    $(paNext).appendTo($('.pagination'));
    this.paBind();
};

InfoHistory.prototype.paBind = function(){
    var _this = this;
    $('.pagination li').on('click',function(e){
        e.preventDefault();
        _this.requestTable($(this).find('a').text(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
    });

    $('.pagination li:first').off('click');

    $('.pagination li:last').off('click');

    $('.paitem-dot').off('click');

    $('.pagination-prev').on('click',function(e){
        e.preventDefault();
        var pageNow = window.localStorage.getItem('pageNow');
        if(pageNow != 1){
            _this.requestTable(parseInt(pageNow)-1,window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
        }else{
            swal({
                title:'提示',
                text: '已经是第一页了！',
                type: 'info',
                showConfirmButton: true,
                confirmButtonText: '确定',
                timer: 2000,
                confirmButtonColor: '#009CAA'
            })
        }
    });

    $('.pagination-next').on('click',function(e){
        e.preventDefault();
        var pageNow = window.localStorage.getItem('pageNow');
        if(pageNow !=_this.pageLength){
            _this.requestTable(parseInt(pageNow)+1,window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
        }else{
            swal({
                title:'提示',
                text: '已经是最后一页了！',
                type: 'info',
                showConfirmButton: true,
                confirmButtonText: '确定',
                timer: 2000,
                confirmButtonColor: '#009CAA'
            })
        }
    });

    $('.paitem-dot').on('click',function(e){
        e.preventDefault();
    });

    $('.pagination li').each(function(){
        if($(this).text()==window.localStorage.getItem('pageNow')){
            $(this).addClass('active');
        }
    });

    $('.page-index').on('keyup',function(e){
        if(e.keyCode == 13){
            _this.requestTable($('.page-index-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
        }
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.page-index span').on('click',function(e){

        _this.requestTable($('.page-index-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);

        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.pagesize-selector').on('change',function(e){
        _this.pageSize = $(this).val();
        _this.requestTable($('.page-index-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
    });

    $('.report-detail').on('click',function(){
        var reportId = $(this).attr('data-reportid');
        window.localStorage.setItem('reportId',reportId);

        var recordId = $(this).attr('data-recordId');
        window.localStorage.setItem('data_recordId',recordId);
    });

    $('.recordid-detail').on('click',function(){
        var recordId = $(this).attr('data-recordId');
        window.localStorage.setItem('data_recordId',recordId);
    })

};

InfoHistory.prototype.ifHasRisk = function(str){
    if(str == null){
        return '--';
    }else if(str == undefined){
        return '--';
    }else if(str == ''){
        return '--';
    }else{
        if(str=='0'){
            return '无';
        }else{
            return '有';
        }
    }
};

InfoHistory.prototype.resetSortType = function(){
    window.localStorage.removeItem('sortType');
};

InfoHistory.prototype.theadSortEvent = function(){
    var _this = this;
    if(window.localStorage.getItem('reportType')=='1'){
        var sortTypeDescArr = ["CREATE_TIME_DESC", "MOTION_SUM_TIME_DESC", "MET_VALUE_DESC", "MAX_VO2_DESC", "AVG_HR_DESC",  "MAX_HR_DESC", "EXERCISE_RISK_DESC"];
        var sortTypeAscArr = ["CREATE_TIME_ASC", "MOTION_SUM_TIME_ASC", "MET_VALUE_ASC", "MAX_VO2_ASC", "AVG_HR_ASC",  "MAX_HR_ASC", "EXERCISE_RISK_ASC"];

        for(var i=0;i<sortTypeDescArr.length;i++){
            (function(i){
                $('.table-manager thead tr.common-tr th').eq(i).off('click').on('click',function(){
                    if(window.localStorage.getItem('sortType') == null){
                        window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort-desc');
                    }
                    else if(window.localStorage.getItem('sortType') == sortTypeAscArr[i]){
                        _this.resetSortType();
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort');
                    }
                    else if(window.localStorage.getItem('sortType') == sortTypeDescArr[i]){
                        window.localStorage.setItem('sortType',sortTypeAscArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort-asc');
                        $(this).addClass('down');
                    }else{
                        window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $('.table-manager thead tr th').find('i').removeClass().addClass('fa fa-sort');
                        $(this).find('i').addClass('fa fa-sort-desc');
                    }
                })
            })(i);

        }
    }else{
        var sortTypeDescArr = ["CREATE_TIME_DESC", "SPORT_SUM_TIME_DESC", "MET_VALUE_DESC", "VO2_MAX_DESC", "AVG_HEART_DESC", "MAX_HEART_DESC", "AVG_SMO2_DESC", "MIN_SMO2_DESC"];
        var sortTypeAscArr = ["CREATE_TIME_ASC", "SPORT_SUM_TIME_ASC", "MET_VALUE_ASC", "VO2_MAX_ASC", "AVG_HEART_ASC", "MAX_HEART_ASC", "AVG_SMO2_ASC", "MIN_SMO2_ASC"];
        for(var i=0;i<sortTypeDescArr.length;i++){
            (function(i){
                $('.table-manager thead tr.aerobic-tr th').eq(i).off('click').on('click',function(){
                    if(window.localStorage.getItem('sortType') == null){
                        window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort-desc');
                    }
                    else if(window.localStorage.getItem('sortType') == sortTypeAscArr[i]){
                        _this.resetSortType();
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort');
                    }
                    else if(window.localStorage.getItem('sortType') == sortTypeDescArr[i]){
                        window.localStorage.setItem('sortType',sortTypeAscArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $(this).find('i').removeClass();
                        $(this).find('i').addClass('fa fa-sort-asc');
                        $(this).addClass('down');
                    }else{
                        window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                        _this.requestTable('',window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                        $('.table-manager thead tr th').find('i').removeClass().addClass('fa fa-sort');
                        $(this).find('i').addClass('fa fa-sort-desc');
                    }
                })
            })(i);

        }
    }
};

new InfoHistory();












