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
    var url = window.location.search;
    var a = url.indexOf("?");
    var list = url.substr(a+1).split("=");
    var type = list[0];
    var value = list[1];
    var key  = '';
    if(type=='metChange'){
        key = 1;
        if(value==1){
            $(".filter-title").text('客户信息(有氧能力降低)');
        }else if(value==2){
            $(".filter-title").text('客户信息(有氧能力提高)');
        }else if(value==3){
            $(".filter-title").text('客户信息(有氧能力变化不明显)');
        }

    }else if(type=='weightChange'){
        key = 2;
        if(value==1){
            $(".filter-title").text('客户信息(体重减少)');
        }else if(value==2){
            $(".filter-title").text('客户信息(体重增加)');
        }else if(value==3){
            $(".filter-title").text('客户信息(体重变化不明显)');
        }

    }else{
        key = 3;
        if(value==1){
            $(".filter-title").text('客户信息(血糖降低)');
        }else if(value==2){
            $(".filter-title").text('客户信息(血糖升高)');
        }else if(value==3){
            $(".filter-title").text('客户信息(血糖变化不明显)');
        }

    }
    var reqUrl = 'statistical/getMembers';
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');

    if(!this.ajaxLoading){
        this.ajaxLoading = true;
        var jsonObj = {
            pageNo:page,
            pageSize:pageSize,
            userId:uuid,
            username:condition,
            key:key,
            value:value,
            sort:window.localStorage.getItem('sortType')
        }
        $.ajax({
            url:window.urlHandler(reqUrl,uuid,token),
            method : 'POST',
            dataType:'json',
            contentType:'application/json',
            data:JSON.stringify(jsonObj)
        }).done(function(res){
            if(res.status==200){
                $('.table-manager').find('tbody').html('');
                $('.pagination').html('');
                $('.table-mask-box').show();
                _this.renderTable(res.data);
                _this.initPagination(res.data.pages);
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
    var sortTypeDescArr = ['','','1@1','','2@1','3@1','4@1','5@1'];
    var sortTypeAscArr = ['','','1@2','','2@2','3@2','4@2','5@2'];
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
                +'<td>'+dataList[i].username+'</td>'
                +'<td>'+window.formatSex(dataList[i].sex)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].age)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].phone)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].height)+'cm</td>'
                +'<td>'+window.nullFormat(dataList[i].weight)+'kg</td>'
                +'<td>'+window.nullFormat(dataList[i].commitDate)+'</td>'
                +'<td>'+window.nullFormat(dataList[i].commitTimes)+'次</td>'
                +'<td><a class="info-history" href="../customer/info_history.html" data-uuid="'+dataList[i].memberId+'" data-customerid="'+dataList[i].id+'">查看</a>'
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
    $('.search-input').on('blur',function(){
        if($('.search-input').val()==""){
            _this.requestPage();
        }
    })
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
