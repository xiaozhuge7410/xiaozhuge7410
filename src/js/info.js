import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function CustomerInfo(){
    this.ajaxLoading = false;
    this.init();
}

CustomerInfo.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestPage();
        this.theadSortEvent();
    }
};


CustomerInfo.prototype.requestPage = function(page,condition,pageSize){
    var _this = this;
    var reqUrl = 'customer/list';
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');

    if(!this.ajaxLoading){
        this.ajaxLoading = true;
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            data:{
                page:page,
                condition:condition,
                pageSize:pageSize,
                sortType:window.localStorage.getItem('sortType')
            }
        }).done(function(res){
            if(res.status==200){
                $('.table-manager').find('tbody').html('');
                $('.pagination').html('');
                $('.table-mask-box').show();

                _this.renderTable(res.datas.customerList);
                _this.initPagination(res.datas.customerList.pages);
            }
            window.dataErrorHandler(res);
            _this.ajaxLoading = false;
        }).fail(function(err){
            _this.ajaxLoading = false;
        })
    }
};

CustomerInfo.prototype.resetSortType = function(){
    window.localStorage.removeItem('sortType');
};

CustomerInfo.prototype.theadSortEvent = function(){
    var _this = this;

    window.onbeforeunload = function(){
        _this.resetSortType();
    };

    var sortTypeDescArr = ['NICK_NAME_DESC','SEX_DESC','AGE_DESC','PHONE_DESC','HEIGHT_DESC','WEIGHT_DESC','LAST_COMMIT_TIME_ASC','MOTION_NUMBER_DESC'];
    var sortTypeAscArr = ['NICK_NAME_ASC','SEX_ASC','AGE_ASC','PHONE_ASC','HEIGHT_ASC','WEIGHT_ASC','LAST_COMMIT_TIME_DESC','MOTION_NUMBER_ASC'];

    for(var i=0;i<sortTypeDescArr.length;i++){
        (function(i){
            $('.table-manager thead tr th').eq(i).off('click').on('click',function(){
                if(window.localStorage.getItem('sortType') == null){
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize,_this.coachId);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeAscArr[i]){
                    _this.resetSortType();
                    _this.requestPage('',$('.search-input').val(),_this.pageSize,_this.coachId);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeDescArr[i]){
                    window.localStorage.setItem('sortType',sortTypeAscArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize,_this.coachId);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-asc');
                    $(this).addClass('down');
                }else{
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize,_this.coachId);
                    $('.table-manager thead tr th').find('i').removeClass().addClass('fa fa-sort');
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
            })
        })(i);
    }
};

CustomerInfo.prototype.renderTable = function(data){
    $('.table-mask-box').hide();
    var $tbody = $('.table-manager').find('tbody');
    var dataList = data.list;
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
    }else{
        for(var i=0;i<dataList.length;i++){
            var tableItem = '<tr>'
                +'<td>'+dataList[i].nick_name+'</td>'
                +'<td>'+window.formatSex(dataList[i].sex)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].age)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].phone)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].height)+'cm</td>'
                +'<td>'+window.nullFormat(dataList[i].weight)+'kg</td>'
                +'<td>'+window.nullFormat(dataList[i].last_commit_time)+'</td>'
                +'<td>'+window.zeroFormat(dataList[i].motion_number)+'次</td>'
                +'<td><a class="info-history" href="info_history.html" data-uuid="'+dataList[i].uuid+'" data-customerid="'+dataList[i].id+'">查看</a>'
                '</td>'
                +'</tr>';
            $(tableItem).appendTo($tbody);
        }
        $('.pagination-block').show();
        var pagenow = data.pageNum;
        window.localStorage.setItem('pageNow',pagenow);
    }
    this.bindEvent();
};


CustomerInfo.prototype.bindEvent = function(){
    var _this = this;

    $('.info-history').on('click',function(){
        var customerUUID = $(this).attr('data-uuid');
        var customerId = $(this).attr('data-customerid');
        window.localStorage.setItem('customerUUID',customerUUID);
        window.localStorage.setItem('customerId',customerId);
    });

    $('.info-editor').on('click',function(){
        var customerUUID = $(this).attr('data-uuid');
        var customerId = $(this).attr('data-customerid');
        window.localStorage.setItem('customerUUID',customerUUID);
        window.localStorage.setItem('customerId',customerId);
    });

    $('.search-input').on('keyup',function(e){
        if(e.keyCode == 13){
            _this.requestPage('',$('.search-input').val(),'');
        }
    });

};

CustomerInfo.prototype.initPagination = function(num){
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

CustomerInfo.prototype.paBind = function(){
    var _this = this;
    $('.pagination li').on('click',function(e){
        _this.requestPage($(this).find('a').text(),$('.search-input').val(),_this.pageSize,_this.coachId);
        e.preventDefault();
    });

    $('.pagination li:first').off('click');

    $('.pagination li:last').off('click');

    $('.paitem-dot').off('click');

    $('.pagination-prev').on('click',function(e){
        e.preventDefault();
        var pageNow = window.localStorage.getItem('pageNow');
        if(pageNow != 1){
            _this.requestPage(parseInt(pageNow)-1,$('.search-input').val(),_this.pageSize,_this.coachId);
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
            _this.requestPage(parseInt(pageNow)+1,$('.search-input').val(),_this.pageSize,_this.coachId);
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
            _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize,_this.coachId);
        }
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.page-index span').on('click',function(e){
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize,_this.coachId);
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.pagesize-selector').on('change',function(e){
        _this.pageSize = $(this).val();
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize,_this.coachId);
    });

};


new CustomerInfo();











