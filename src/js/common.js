import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function CommonReport(){
    this.ajaxLoading = false;
    this.init();
}

CommonReport.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestPage();
        this.bind();
    }
};

CommonReport.prototype.bind = function(){
    var _this = this;

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
        _this.requestPage('',$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),'');
    });

    $('.search-input').on('keyup',function(e){
        if(e.keyCode == 13){
            _this.requestPage('',$('.search-input').val(),'');
        }
    });

    window.onbeforeunload = function(){
        window.localStorage.removeItem('startTime');
        window.localStorage.removeItem('endTime');
        _this.resetSortType();
    };

    this.theadSortEvent();
};

CommonReport.prototype.requestPage = function(page,condition,beginTime,endTime,pageSize){
    var _this = this;
    var reqUrl = 'motiondata/getAllUserSportInfo';
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');

    if(!this.ajaxLoading){
        this.ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            data:{
                managerId:uuid,
                page:page,
                pageSize:pageSize,
                condition:condition,
                beginTime:beginTime,
                endTime:endTime,
                sortType:window.localStorage.getItem('sortType')
            }
        }).done(function(res){
            if(res.status==200){
                $('.table-manager').find('tbody').html('');
                $('.pagination').html('');
                $('.table-mask-box').show();
                _this.renderTable(res);
                _this.initPagination(res.datas.list.pages);
            }
            _this.ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            _this.ajaxLoading = false;
        })
    }
};

CommonReport.prototype.renderTable = function(data){
    $('.table-mask-box').hide();
    var $tbody = $('.table-manager').find('tbody');
    var dataList = data.datas.list.list;
    if(dataList.length==0){
        var tableItem = '<tr>'
            +'<td>无相关记录</td>'
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
                +'<td>'+window.nullFormat(dataList[i].create_time)+'</td>'
                +'<td>'+dataList[i].nick_name+'</td>'
                +'<td>'+window.formatSex(dataList[i].sex)+'</td>'
                +'<td>'+dataList[i].age+'</td>'
                +'<td>'+dataList[i].motion_sum_time+'分钟</td>';
            if(dataList[i].questionnaireRecordId!=null){
                tableItem +='<td><a class="report-detail" href="common_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].sportId+'" data-customeruuid="'+dataList[i].uuid+'">报告</a>' +
                    '<a class="recordid-detail" href="../customer/Survey_report_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'"></a></td>'
            }else{
                tableItem += '<td><a class="report-detail" href="common_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].sportId+'" data-customeruuid="'+dataList[i].uuid+'">报告</a></td>'
            }
            tableItem += '</tr>';
            $(tableItem).appendTo($tbody);
        }
        $('.pagination-block').show();
        var pagenow = data.datas.list.pageNum;
        window.localStorage.setItem('pageNow',pagenow);

    }

};

CommonReport.prototype.initPagination = function(num){
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

CommonReport.prototype.paBind = function(){
    var _this = this;
    $('.pagination li').on('click',function(e){
        _this.requestPage($(this).find('a').text(),$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
        e.preventDefault();
    });

    $('.pagination li:first').off('click');

    $('.pagination li:last').off('click');

    $('.paitem-dot').off('click');

    $('.pagination-prev').on('click',function(e){
        e.preventDefault();
        var pageNow = window.localStorage.getItem('pageNow');
        if(pageNow != 1){
            _this.requestPage(parseInt(pageNow)-1,$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
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
            _this.requestPage(parseInt(pageNow)+1,$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
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
            _this.requestPage($('.page-index-input').val(),$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
        }
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.page-index span').on('click',function(e){
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);

    });

    $('.pagesize-selector').on('change',function(e){
        _this.pageSize = $(this).val();
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);

    });

    $('.report-detail').on('click',function(){
        var reportId = $(this).attr('data-reportid');
        var customerId = $(this).attr('data-customeruuid');
        window.localStorage.setItem('reportId',reportId);
        window.localStorage.setItem('customerUUID',customerId);

        var data_recordId = $(this).attr('data-recordId');
        window.localStorage.setItem('data_recordId',data_recordId);
    });

    $('.recordid-detail').on('click',function(){
        var data_recordId = $(this).attr('data-recordId');
        window.localStorage.setItem('data_recordId',data_recordId);

    })
};


CommonReport.prototype.resetSortType = function(){
    window.localStorage.removeItem('sortType');
};

CommonReport.prototype.theadSortEvent = function(){
    var _this = this;

    var sortTypeDescArr = ['CREATE_TIME_DESC','NICK_NAME_DESC','SEX_DESC','AGE_DESC','SPORT_SUM_TIME_DESC'];
    var sortTypeAscArr = ['CREATE_TIME_ASC','NICK_NAME_ASC','SEX_ASC','AGE_ASC','SPORT_SUM_TIME_ASC'];

    for(var i=0;i<sortTypeDescArr.length;i++){
        (function(i){
            $('.table-manager thead tr th').eq(i).off('click').on('click',function(){
                if(window.localStorage.getItem('sortType') == null){
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeAscArr[i]){
                    _this.resetSortType();
                    _this.requestPage('',$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeDescArr[i]){
                    window.localStorage.setItem('sortType',sortTypeAscArr[i]);
                    _this.requestPage('',$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-asc');
                    $(this).addClass('down');
                }else{
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),window.localStorage.getItem('startTime'),window.localStorage.getItem('endTime'),_this.pageSize);
                    $('.table-manager thead tr th').find('i').removeClass().addClass('fa fa-sort');
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
            })
        })(i);
    }
};


new CommonReport();










