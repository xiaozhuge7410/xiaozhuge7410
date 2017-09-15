import './components/barDom';
import './components/httpRequest';
import './components/dataFormat';

function FourMinWalkDetail(){
    this.ajaxLoading = false;
    this.init();
}

FourMinWalkDetail.prototype.init = function(){
    if(window.localStorage.getItem('utClinic')==null){
        $('html,body').html('');
        window.location.href='../login.html';
    }else{
        this.requestPage();
        this.bind();
    }
};

FourMinWalkDetail.prototype.bind = function(){
    var _this = this;
    $('.start-date-form i.fa-close').on('click',function(){
        $(this).parent().find('input').val('');
        $(this).hide();
    });

    $('.search-commit-btn').on('click',function(){
        if($('.search-input').val()==''){
            _this.requestPage();
        }else{
            _this.requestPage('',$('.search-input').val(),'');
        }
    });

    $('.search-input').on('keyup',function(e){
        if(e.keyCode == 13){
            if($('.search-input').val()==''){
                _this.requestPage();
            }else{
                _this.requestPage('',$('.search-input').val(),'');
            }
        }
    });
};

FourMinWalkDetail.prototype.requestPage = function(page,condition,pageSize){
    var _this = this;
    var url = window.location.search;
    var a = url.indexOf("=");
    var type = url.substr(a+1);
    var reqUrl = '';
    if(type==1){
         reqUrl = 'statistical/getFourMinList';
        $(".filter-title").text('跑步机四分钟走测试报告(全部)');
    }else if(type==2){
         reqUrl = 'statistical/getFourMinCompleteList';
        $(".filter-title").text('跑步机四分钟走测试报告(信息完整)');
    }else{
         reqUrl = 'statistical/getFourMinMissingList';
        $(".filter-title").text('跑步机四分钟走测试报告(信息缺失)');
    }
    var token = window.localStorage.getItem('utClinic');
    var uuid = window.localStorage.getItem('uidClinic');
    if(!this.ajaxLoading){
        this.ajaxLoading = true;
        var jsonObj = {
            userId:uuid,
            pageNo:page,
            pageSize:pageSize,
            username:condition,
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
                _this.renderTable(res);
                _this.initPagination(res.data.pages);
            }
            _this.ajaxLoading = false;
            window.dataErrorHandler(res);
        }).fail(function(err){
            _this.ajaxLoading = false;
        })
    }
};


FourMinWalkDetail.prototype.renderTable = function(data){

    $('.table-mask-box').hide();
    var $tbody = $('.table-manager').find('tbody');
    var dataList = data.data.list;
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
                +'<td>'+window.nullFormat(dataList[i].commitDate)+'</td>'
                +'<td>'+dataList[i].username+'</td>'
                +'<td>'+window.formatSex(dataList[i].sex)+'</td>'
                +'<td>'+dataList[i].age+'</td>'
                +'<td>'+dataList[i].met+'MET</td>'
                +'<td><a class="report-detail" href="../report/4min_walk_detail.html" data-recordId="'+dataList[i].questionnaireRecordId+'" data-reportid="'+dataList[i].reportId+'" data-customeruuid="'+dataList[i].memberId+'">报告</a></td>'
                + '</tr>';
            $(tableItem).appendTo($tbody);
        }
        $('.pagination-block').show();
        var pagenow = data.data.pageNum;
        window.localStorage.setItem('pageNow',pagenow);
    }
    this.theadSortEvent();
};

FourMinWalkDetail.prototype.initPagination = function(num){
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

FourMinWalkDetail.prototype.paBind = function(){
    var _this = this;
    $('.pagination li').on('click',function(e){
        _this.requestPage($(this).find('a').text(),$('.search-input').val(),_this.pageSize);
        e.preventDefault();
    });

    $('.pagination li:first').off('click');

    $('.pagination li:last').off('click');

    $('.paitem-dot').off('click');

    $('.pagination-prev').on('click',function(e){
        e.preventDefault();
        var pageNow = window.localStorage.getItem('pageNow');
        if(pageNow != 1){
            _this.requestPage(parseInt(pageNow)-1,$('.search-input').val(),_this.pageSize);
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
            _this.requestPage(parseInt(pageNow)+1,$('.search-input').val(),_this.pageSize);
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
            _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize);
        }
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.page-index span').on('click',function(e){
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize);
        if($('.page-index-input').val()>_this.pageLength){
            $('.page-index-input').val(_this.pageLength);
        }
    });

    $('.pagesize-selector').on('change',function(e){
        _this.pageSize = $(this).val();
        _this.requestPage($('.page-index-input').val(),$('.search-input').val(),_this.pageSize);

    });

    $('.report-detail').on('click',function(){
        var reportId = $(this).attr('data-reportid');
        var customerId = $(this).attr('data-customeruuid');
        window.localStorage.setItem('reportId',reportId);
        window.localStorage.setItem('customerUUID',customerId);

        var recordId = $(this).attr('data-recordId');
        window.localStorage.setItem('data_recordId',recordId);
    });
};

FourMinWalkDetail.prototype.resetSortType = function(){
    window.localStorage.removeItem('sortType');
};

FourMinWalkDetail.prototype.theadSortEvent = function(){
    var _this = this;

    var sortTypeDescArr = ['6@1','','','7@1','8@1'];
    var sortTypeAscArr = ['6@2','','','7@2','8@2'];

    for(var i=0;i<sortTypeDescArr.length;i++){
        (function(i){
            $('.table-manager thead tr th').eq(i).off('click').on('click',function(){
                if(window.localStorage.getItem('sortType') == null){
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeAscArr[i]){
                    _this.resetSortType();
                    _this.requestPage('',$('.search-input').val(),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort');
                }
                else if(window.localStorage.getItem('sortType') == sortTypeDescArr[i]){
                    window.localStorage.setItem('sortType',sortTypeAscArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize);
                    $(this).find('i').removeClass();
                    $(this).find('i').addClass('fa fa-sort-asc');
                    $(this).addClass('down');
                }else{
                    window.localStorage.setItem('sortType',sortTypeDescArr[i]);
                    _this.requestPage('',$('.search-input').val(),_this.pageSize);
                    $('.table-manager thead tr th').find('i').removeClass().addClass('fa fa-sort');
                    $(this).find('i').addClass('fa fa-sort-desc');
                }
            })
        })(i);
    }
};
new FourMinWalkDetail();
